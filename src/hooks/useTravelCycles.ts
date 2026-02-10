
import { useMemo } from 'react';
import { DayType } from '../types/types';
import { toUTCDateString } from '../utils/dateUtils';

interface UseTravelCyclesProps {
    startDate: Date;
    departureDay: number;
    workDays: number;
    returnDay?: number | null; // Optional/Nullable for Auto mode
    minRestDays?: number;
}

export const useTravelCycles = ({ startDate, departureDay, workDays, returnDay = null, minRestDays = 9 }: UseTravelCyclesProps) => {
    const { dateTypeMap, monthsToRender, cycleAdjustments } = useMemo(() => {
        const map = new Map<string, DayType>();
        const adjustmentMap = new Map<string, Array<{ date: string, daysAdded: number, targetDayName: string }>>(); // Key: YYYY-MM
        if (!startDate) return { dateTypeMap: map, monthsToRender: [] };

        let cycleStartDate = new Date(startDate);

        const calendarEndDate = new Date(startDate);
        calendarEndDate.setUTCFullYear(calendarEndDate.getUTCFullYear() + 1);

        while (cycleStartDate < calendarEndDate) {
            // Calculate nominal end of work period (dynamic workDays)
            const nominalWorkEnd = new Date(cycleStartDate);
            nominalWorkEnd.setUTCDate(nominalWorkEnd.getUTCDate() + workDays - 1);

            // Find the next departure day based on user selection
            const dayOfWeek = nominalWorkEnd.getUTCDay();
            const daysUntilDeparture = (departureDay - dayOfWeek + 7) % 7;
            const departureDate = new Date(nominalWorkEnd);
            departureDate.setUTCDate(departureDate.getUTCDate() + daysUntilDeparture);

            // Hybrid Return Logic
            // 1. Calculate the 'Automatic' return date (Fixed Duration)
            // Formula: BaseReturn = DepartureDate + (restDays - 1)
            // This is the earliest allowed return date considering the NON-NEGOTIABLE minimum rest duration.
            const daysToAddAuto = Math.max(0, (minRestDays || 1) - 1);
            let returnDate = new Date(departureDate);
            returnDate.setUTCDate(returnDate.getUTCDate() + daysToAddAuto);

            const autoReturnDateString = toUTCDateString(returnDate);
            let adjustmentDays = 0;

            // 2. If Manual Return Day is selected, force the next occurrence of that day
            if (returnDay !== null && returnDay !== undefined) {
                // Return date must be >= auto return date
                const currentDayOfWeek = returnDate.getUTCDay();
                const daysUntilTarget = (returnDay - currentDayOfWeek + 7) % 7;

                if (daysUntilTarget > 0) {
                    returnDate.setUTCDate(returnDate.getUTCDate() + daysUntilTarget);
                    adjustmentDays = daysUntilTarget;
                }
            }

            // Store adjustment info if significant
            if (adjustmentDays > 0) {
                // We key by the month index (YYYY-MM) to show it in the calendar footer
                // or key by specific return date string to show on the day
                // For this requirement: "parte de abajo de cada mes", so we track by month.
                const returnMonthKey = `${returnDate.getUTCFullYear()}-${returnDate.getUTCMonth()}`;

                // We accumulate or overwrite. Since one month might have multiple returns, 
                // we might want a list, but for simplicity let's store the last significant one or a specialized message.
                // Let's store a cumulative text for the month.
                const currentAdj = adjustmentMap.get(returnMonthKey) || [];

                // Deduplicate: Check if an adjustment for this specific date already exists
                const dateString = toUTCDateString(returnDate);
                const isDuplicate = currentAdj.some(adj => adj.date === dateString);

                if (!isDuplicate) {
                    currentAdj.push({
                        date: dateString,
                        daysAdded: adjustmentDays,
                        targetDayName: ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'][returnDay!]
                    });
                    adjustmentMap.set(returnMonthKey, currentAdj);
                }
            }

            // Fill map for Work days
            let currentDate = new Date(cycleStartDate);
            while (currentDate < departureDate) {
                const dateStr = toUTCDateString(currentDate);
                // Prevent overwriting a previous cycle's Return day if overlap occurs
                if (!map.has(dateStr)) {
                    map.set(dateStr, DayType.Work);
                }
                currentDate.setUTCDate(currentDate.getUTCDate() + 1);
            }

            // Fill map for Departure, Rest, and Return days
            map.set(toUTCDateString(departureDate), DayType.Departure);

            currentDate = new Date(departureDate);
            currentDate.setUTCDate(currentDate.getUTCDate() + 1);
            while (currentDate < returnDate) {
                map.set(toUTCDateString(currentDate), DayType.Rest);
                currentDate.setUTCDate(currentDate.getUTCDate() + 1);
            }

            map.set(toUTCDateString(returnDate), DayType.Return);

            // Set start for the next cycle
            cycleStartDate = new Date(returnDate);
            cycleStartDate.setUTCDate(cycleStartDate.getUTCDate() + 1);
        }

        const year = startDate.getUTCFullYear();
        // Always display January to December of the start date's year
        const months = Array.from({ length: 12 }).map((_, i) => ({
            year: year,
            month: i, // i is 0-indexed month (0=Jan, 11=Dec)
        }));

        return { dateTypeMap: map, monthsToRender: months, cycleAdjustments: adjustmentMap };
    }, [startDate, departureDay, workDays, minRestDays, returnDay]);

    const getDayType = (date: Date): DayType => {
        const dateString = toUTCDateString(date);
        return dateTypeMap.get(dateString) ?? DayType.None;
    };

    return { getDayType, monthsToRender, cycleAdjustments };
};
