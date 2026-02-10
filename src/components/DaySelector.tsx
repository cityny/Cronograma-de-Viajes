
import React from 'react';
import { DAY_NAMES_SHORT } from '../constants/constants';

interface DaySelectorProps {
    value: number;
    onChange: (day: number) => void;
    activeColor: string; // Tailwind color class like 'indigo' or 'blue'
}

const DaySelector: React.FC<DaySelectorProps> = ({ value, onChange, activeColor }) => {
    return (
        <div className="grid grid-cols-7 gap-1 sm:gap-2 py-2 overflow-y-visible">
            {DAY_NAMES_SHORT.map((day, index) => {
                const isActive = value === index;
                return (
                    <button
                        key={day}
                        onClick={() => onChange(index)}
                        className={`w-full aspect-square rounded-full flex items-center justify-center text-[10px] sm:text-xs font-bold transition-all duration-300 ${isActive
                            ? `bg-${activeColor}-600 text-white shadow-lg scale-110 ring-2 ring-${activeColor}-200`
                            : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
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
