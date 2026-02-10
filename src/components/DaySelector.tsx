
import React from 'react';
import { DAY_NAMES_SHORT } from '../constants/constants';

interface DaySelectorProps {
    value: number;
    onChange: (day: number) => void;
    activeColor: string; // Tailwind color class like 'indigo' or 'blue'
}

const DaySelector: React.FC<DaySelectorProps> = ({ value, onChange, activeColor }) => {
    return (
        <div className="flex overflow-x-auto py-2 scrollbar-hide -mx-1 px-1 gap-2 overflow-y-visible">
            {DAY_NAMES_SHORT.map((day, index) => {
                const isActive = value === index;
                return (
                    <button
                        key={day}
                        onClick={() => onChange(index)}
                        className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center text-xs font-bold transition-all duration-300 ${isActive
                            ? `bg-${activeColor}-600 text-white shadow-lg scale-110 ring-2 ring-${activeColor}-200`
                            : 'bg-gray-100 text-gray-500 hover:bg-gray-200'
                            }`}
                    >
                        {day}
                    </button>
                );
            })}
        </div>
    );
};

export default DaySelector;
