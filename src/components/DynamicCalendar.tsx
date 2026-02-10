
import React from 'react';
import MonthView from './MonthView';
import { useTravelCycles } from '../hooks/useTravelCycles';

interface DynamicCalendarProps {
    startDate: Date;
    departureDay: number; // 0 for Sunday, ..., 6 for Saturday
    workDays: number;
    returnDay?: number | null;
    minRestDays?: number; // Prop is now optional but effectively required by parent
    onDateSelect: (date: Date) => void;
}

const DynamicCalendar: React.FC<DynamicCalendarProps> = ({ startDate, departureDay, workDays, returnDay, minRestDays, onDateSelect }) => {
    const { getDayType, monthsToRender, cycleAdjustments } = useTravelCycles({ startDate, departureDay, workDays, returnDay, minRestDays });

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
                        adjustments={cycleAdjustments?.get(`${year}-${month}`) || []}
                    />
                ))}
            </div>
        </div>
    );
};

export default DynamicCalendar;