
import React, { useState, useRef, useEffect } from 'react';
import { CalendarIcon } from './Icons';
import MonthView from './MonthView';
import { DayType } from '../types/types';

interface CustomDatePickerProps {
    value: string; // YYYY-MM-DD
    onChange: (date: string) => void;
}

const CustomDatePicker: React.FC<CustomDatePickerProps> = ({ value, onChange }) => {
    const [isOpen, setIsOpen] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);

    // Parse current date
    const [year, month, day] = value.split('-').map(Number);
    const currentDate = new Date(Date.UTC(year, month - 1, day));

    // For the picker view
    const [viewMonth, setViewMonth] = useState(month - 1);
    const [viewYear, setViewYear] = useState(year);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const handleDateSelect = (date: Date) => {
        const selectedDate = date.toISOString().split('T')[0];
        onChange(selectedDate);
        setIsOpen(false);
    };

    const nextMonth = () => {
        if (viewMonth === 11) {
            setViewMonth(0);
            setViewYear(viewYear + 1);
        } else {
            setViewMonth(viewMonth + 1);
        }
    };

    const prevMonth = () => {
        if (viewMonth === 0) {
            setViewMonth(11);
            setViewYear(viewYear - 1);
        } else {
            setViewMonth(viewMonth - 1);
        }
    };

    return (
        <div className="relative" ref={containerRef}>
            <button
                type="button"
                onClick={() => setIsOpen(!isOpen)}
                className="w-full flex items-center justify-between px-4 py-2 border border-gray-300 rounded-md shadow-sm bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200"
            >
                <div className="flex items-center">
                    <CalendarIcon className="w-5 h-5 text-indigo-500 mr-2" />
                    <span className="text-gray-700 font-medium">
                        {currentDate.toLocaleDateString('es-ES', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric',
                            timeZone: 'UTC'
                        })}
                    </span>
                </div>
                <svg className={`w-5 h-5 text-gray-400 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
            </button>

            {isOpen && (
                <div className="absolute z-[100] mt-2 left-0 right-0 md:left-auto md:w-80 bg-white rounded-xl shadow-2xl border border-gray-100 overflow-hidden animate-in fade-in zoom-in duration-200 origin-top">
                    <div className="p-4 bg-indigo-600 flex items-center justify-between text-white">
                        <button onClick={prevMonth} className="p-1 hover:bg-white/20 rounded-full transition-colors">
                            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor text-white">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                            </svg>
                        </button>
                        <h3 className="font-bold text-lg capitalize">
                            {new Date(viewYear, viewMonth).toLocaleDateString('es-ES', { month: 'long', year: 'numeric' })}
                        </h3>
                        <button onClick={nextMonth} className="p-1 hover:bg-white/20 rounded-full transition-colors">
                            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor text-white">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                        </button>
                    </div>
                    <div className="p-4 scale-95 origin-top">
                        <MonthView
                            year={viewYear}
                            month={viewMonth}
                            getDayType={() => DayType.None}
                            onDateSelect={handleDateSelect}
                        />
                    </div>
                    <div className="p-3 bg-gray-50 border-t border-gray-100 flex justify-end">
                        <button
                            onClick={() => setIsOpen(false)}
                            className="text-sm font-semibold text-indigo-600 hover:text-indigo-800"
                        >
                            Cerrar
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default CustomDatePicker;
