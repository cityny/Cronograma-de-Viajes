
import React, { useMemo } from 'react';
import MonthView from './MonthView';
import { WORK_DAYS } from '../constants';
import { DayType } from '../types';

interface DynamicCalendarProps {
    startDate: Date;
    departureDay: number; // 0 for Sunday, ..., 6 for Saturday
    returnDay: number;
    onDateSelect: (date: Date) => void;
}

const toUTCDateString = (date: Date): string => {
    return date.toISOString().split('T')[0];
};

const DynamicCalendar: React.FC<DynamicCalendarProps> = ({ startDate, departureDay, returnDay, onDateSelect }) => {
    const dateTypeMap = useMemo(() => {
        const map = new Map<string, DayType>();
        if (!startDate) return map;

        let cycleStartDate = new Date(startDate);
        
        const calendarEndDate = new Date(startDate);
        calendarEndDate.setUTCFullYear(calendarEndDate.getUTCFullYear() + 1);

        while (cycleStartDate < calendarEndDate) {
            // Calculate nominal end of work period (21 days)
            const nominalWorkEnd = new Date(cycleStartDate);
            nominalWorkEnd.setUTCDate(nominalWorkEnd.getUTCDate() + WORK_DAYS - 1);

            // Find the next departure day based on user selection
            const dayOfWeek = nominalWorkEnd.getUTCDay();
            const daysUntilDeparture = (departureDay - dayOfWeek + 7) % 7;
            const departureDate = new Date(nominalWorkEnd);
            departureDate.setUTCDate(departureDate.getUTCDate() + daysUntilDeparture);

            // Find the next return day based on user selection
            const returnDate = new Date(departureDate);
            const daysUntilReturn = (returnDay - returnDate.getUTCDay() + 7) % 7;
            // If departure and return are the same day, make it a 7-day break.
            const daysToAddForReturn = daysUntilReturn === 0 ? 7 : daysUntilReturn;
            returnDate.setUTCDate(returnDate.getUTCDate() + daysToAddForReturn);

            // Fill map for Work days
            let currentDate = new Date(cycleStartDate);
            while (currentDate < departureDate) {
                map.set(toUTCDateString(currentDate), DayType.Work);
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

        return map;
    }, [startDate, departureDay, returnDay]);

    const getDayType = (date: Date): DayType => {
        const dateString = toUTCDateString(date);
        return dateTypeMap.get(dateString) ?? DayType.None;
    };

    const monthsToRender = useMemo(() => {
        if (!startDate) return [];
        const year = startDate.getUTCFullYear();
        // Always display January to December of the start date's year
        return Array.from({ length: 12 }).map((_, i) => ({
            year: year,
            month: i, // i is 0-indexed month (0=Jan, 11=Dec)
        }));
    }, [startDate]);


    return (
        <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
                {monthsToRender.map(({ year, month }) => (
                    <MonthView
                        key={`${year}-${month}`}
                        year={year}
                        month={month}
                        getDayType={getDayType}
                        onDateSelect={onDateSelect}
                    />
                ))}
            </div>
        </div>
    );
};

export default DynamicCalendar;