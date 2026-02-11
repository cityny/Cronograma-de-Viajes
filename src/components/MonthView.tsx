import React from 'react';
import { DAY_NAMES_SHORT, MONTH_NAMES, DAY_TYPE_STYLES } from '../constants/constants';
import { DayType } from '../types/types';
import { DepartureIcon, ReturnIcon } from './Icons';

interface MonthViewProps {
    year: number;
    month: number; // 0-indexed
    getDayType: (date: Date) => DayType;
    onDateSelect: (date: Date) => void;
    showTitle?: boolean;
    adjustments?: Array<{ date: string, daysAdded: number, targetDayName: string }>;
}

const MonthView: React.FC<MonthViewProps> = ({ year, month, getDayType, onDateSelect, showTitle = true, adjustments = [] }) => {
    const daysInMonth = new Date(year, month + 1, 0).getDate(); // Corrected to get days in current month
    const firstDayOfMonth = new Date(year, month, 1).getDay(); // 0 is Sunday, 0-indexed month

    return (
        <div className="border border-gray-200 rounded-xl p-4 bg-gray-50/50 hover:bg-white transition-colors duration-300">
            {showTitle && <h3 className="text-lg font-bold text-gray-800 mb-4 capitalize text-center">{new Date(year, month).toLocaleString('es-ES', { month: 'long', year: 'numeric' })}</h3>}

            <div className="grid grid-cols-7 gap-1 text-center text-xs text-gray-900 font-medium mb-2 bg-purple-200 rounded-md py-2">
                {['D', 'L', 'M', 'M', 'J', 'V', 'S'].map((day) => (
                    <div key={day}>
                        {day}
                    </div>
                ))}
            </div>

            <div className="grid grid-cols-7 gap-1">
                {/* Empty slots for days before the 1st */}
                {Array.from({ length: firstDayOfMonth }).map((_, index) => (
                    <div key={`empty-${index}`} className="w-full h-12" />
                ))}

                {/* Days of the month */}
                {Array.from({ length: daysInMonth }).map((_, index) => {
                    const day = index + 1;
                    // Construct UTC date for consistent key lookup
                    const currentDate = new Date(Date.UTC(year, month, day));
                    const dayType = getDayType(currentDate);

                    let style = '';
                    switch (dayType) {
                        case DayType.Work:
                            style = 'bg-blue-300/50 text-blue-700 font-medium';
                            break;
                        case DayType.Rest:
                            style = 'bg-green-300/50 text-green-700 font-medium';
                            break;
                        case DayType.Departure:
                            style = 'bg-indigo-600 text-white font-bold shadow-md transform scale-105';
                            break;
                        case DayType.Return:
                            style = 'bg-purple-600 text-white font-bold shadow-md transform scale-105';
                            break;
                        default:
                            style = 'text-gray-900 hover:bg-gray-100 font-medium';
                    }

                    // Special styling for today
                    const today = new Date();
                    const isToday = currentDate.getUTCFullYear() === today.getFullYear() &&
                        currentDate.getUTCMonth() === today.getMonth() &&
                        currentDate.getUTCDate() === today.getDate();
                    if (isToday) {
                        style += ' ring-2 ring-offset-2 ring-indigo-400';
                    }

                    return (
                        <div
                            key={day}
                            onClick={() => onDateSelect(currentDate)}
                            className={`w-full h-12 flex flex-col items-center justify-center space-y-1 rounded-lg transition-all duration-200 hover:scale-105 hover:shadow-sm cursor-pointer ${style} ${dayType === DayType.None ? 'hover:bg-gray-300' : 'hover:brightness-95'}`}
                        >
                            <span className="text-sm">{day}</span>
                            {dayType === DayType.Departure && <DepartureIcon className="w-3 h-3" />}
                            {dayType === DayType.Return && <ReturnIcon className="w-3 h-3" />}
                        </div>
                    );
                })}
            </div>

            {/* Adjustments Feedback */}
            {adjustments.length > 0 && (
                <div className="mt-4 pt-3 border-t border-gray-200 space-y-1">
                    {adjustments.map((adj, idx) => (
                        <div key={idx} className="text-[10px] text-amber-600 font-bold flex items-center bg-amber-50 p-1.5 rounded-md border border-amber-100">
                            <span className="mr-1">⚠️</span>
                            Nota: +{adj.daysAdded} {adj.daysAdded === 1 ? 'día' : 'días'} adicional para regresar en {adj.targetDayName}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default MonthView;