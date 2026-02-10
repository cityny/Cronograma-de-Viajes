import React from 'react';
import { DAY_NAMES_SHORT, MONTH_NAMES, DAY_TYPE_STYLES } from '../constants/constants';
import { DayType } from '../types/types';
import { DepartureIcon, ReturnIcon } from './Icons';

interface MonthViewProps {
    year: number;
    month: number; // 0-indexed
    getDayType: (date: Date) => DayType;
    onDateSelect: (date: Date) => void;
}

const MonthView: React.FC<MonthViewProps> = ({ year, month, getDayType, onDateSelect }) => {
    const renderDays = () => {
        const daysInMonth = new Date(Date.UTC(year, month + 1, 0)).getUTCDate();
        const firstDayOfMonth = new Date(Date.UTC(year, month, 1)).getUTCDay();

        const blanks = Array(firstDayOfMonth).fill(null);
        const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);

        const allCells = [...blanks, ...days];

        return allCells.map((day, index) => {
            if (day === null) {
                return <div key={`blank-${index}`} className="w-full h-12"></div>;
            }

            const currentDate = new Date(Date.UTC(year, month, day));
            const dayType = getDayType(currentDate);
            const style = DAY_TYPE_STYLES[dayType];

            const today = new Date();
            const isToday = year === today.getFullYear() && month === today.getMonth() && day === today.getDate();

            return (
                <div
                    key={day}
                    onClick={() => onDateSelect(currentDate)}
                    className={`w-full h-12 flex flex-col items-center justify-center space-y-1 rounded-lg transition-all duration-200 hover:scale-105 hover:shadow-sm cursor-pointer ${style} ${dayType === DayType.None ? 'hover:bg-gray-300' : 'hover:brightness-95'}`}
                >
                    <span className={`text-sm ${isToday ? 'font-bold ring-2 ring-offset-1 ring-blue-500 rounded-full w-6 h-6 flex items-center justify-center' : ''}`}>
                        {day}
                    </span>
                    {(dayType === DayType.Departure || dayType === DayType.Return) && (
                        // Removed absolute positioning to allow flexbox to stack the icon below the number
                        <div>
                            {dayType === DayType.Departure && <DepartureIcon className="w-3 h-3 text-white opacity-90" />}
                            {dayType === DayType.Return && <ReturnIcon className="w-3 h-3 text-white opacity-90" />}
                        </div>
                    )}
                </div>
            );
        });
    };

    return (
        <div className="flex flex-col">
            <h3 className="text-lg font-semibold text-center mb-3 text-gray-800">
                {MONTH_NAMES[month]} {year}
            </h3>
            <div className="grid grid-cols-7 gap-1 text-center text-xs text-gray-900 font-medium mb-2 bg-purple-200 rounded-md py-2">
                {DAY_NAMES_SHORT.map(day => <div key={day}>{day}</div>)}
            </div>
            <div className="grid grid-cols-7 gap-1">
                {renderDays()}
            </div>
        </div>
    );
};

export default MonthView;