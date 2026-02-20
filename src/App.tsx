import React, { useState, useMemo } from 'react';
import ControlPanel from './components/ControlPanel';
import DynamicCalendar from './components/DynamicCalendar';
import { getTodayString } from './utils/dateUtils';
import ScrollToTop from './components/ScrollToTop';
import InfoTooltip from './components/InfoTooltip';
import LogoCityNy from './assets/Logo_CityNy.gif';

import { useTravelCycles } from './hooks/useTravelCycles';
import { useLocalStorage } from './hooks/useLocalStorage';
import { DayType } from './types/types';

const App: React.FC = () => {
    const [startDateString, setStartDateString] = useLocalStorage<string>('cronograma-startDate', getTodayString());
    const [departureDay, setDepartureDay] = useLocalStorage<number>('cronograma-departureDay', 5); // Default to Friday
    const [returnDay, setReturnDay] = useLocalStorage<number | null>('cronograma-returnDay', null); // Default to Auto (null)
    const [workDays, setWorkDays] = useLocalStorage<number>('cronograma-workDays', 21);      // Default to 21 days
    const [minRestDays, setMinRestDays] = useLocalStorage<number>('cronograma-restDays', 9); // Default to 9 days total

    const handleDateChange = (date: string) => {
        setStartDateString(date);
    };

    const handleCalendarDateSelect = (date: Date) => {
        setStartDateString(date.toISOString().split('T')[0]);
    };

    const handleDepartureDayChange = (day: number) => {
        setDepartureDay(day);
    };

    const handleReturnDayChange = (day: number | null) => {
        setReturnDay(day);
    };

    const handleWorkDaysChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setWorkDays(Number(e.target.value));
    };

    const handleMinRestDaysChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setMinRestDays(Number(e.target.value));
    };

    const handleResetToDefaults = () => {
        setStartDateString(getTodayString());
        setDepartureDay(5); // Friday
        setReturnDay(null); // Auto
        setWorkDays(21);
        setMinRestDays(9);
    };

    // Memoize the Date object to prevent unnecessary re-renders of the calendar
    const startDate = useMemo(() => {
        if (!startDateString) return null;
        // The input value 'YYYY-MM-DD' is treated as UTC to avoid timezone issues.
        const [year, month, day] = startDateString.split('-').map(Number);
        return new Date(Date.UTC(year, month - 1, day));
    }, [startDateString]);

    // Generate data for PDF
    const { getDayType, monthsToRender } = useTravelCycles({
        startDate: startDate || new Date(),
        departureDay,
        workDays,
        returnDay,
        minRestDays
    });

    const monthsData = useMemo(() => {
        if (!startDate) return [];
        return monthsToRender.map(({ year, month }) => {
            const daysInMonth = new Date(Date.UTC(year, month, 0)).getUTCDate();
            const startDay = new Date(Date.UTC(year, month - 1, 1)).getUTCDay();
            const monthName = new Date(Date.UTC(year, month - 1, 1)).toLocaleString('es-ES', { month: 'long' });

            const days = [];
            for (let d = 1; d <= daysInMonth; d++) {
                const current = new Date(Date.UTC(year, month - 1, d));
                const type = getDayType(current);
                days.push({ day: d, type });
            }

            return {
                name: monthName.charAt(0).toUpperCase() + monthName.slice(1),
                year,
                startDay,
                days
            };
        });
    }, [startDate, monthsToRender, getDayType]);

    return (
        <div className="min-h-screen flex flex-col bg-gray-50 font-sans text-gray-800">
            <header className="bg-white shadow-md">
                <div className="container mx-auto px-4 py-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                    <div>
                        <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 leading-tight">
                            Planificador inteligente de ciclos de trabajo
                            <InfoTooltip
                                side="bottom"
                                text="Es una aplicación web interactiva diseñada para calcular y visualizar itinerarios de viaje basados en ciclos de trabajo rotativos. Permite a los usuarios definir su fecha de inicio, días de salida/regreso y duración del periodo laboral para generar automáticamente un calendario anual."
                            />
                        </h1>
                    </div>
                    <div className="flex flex-col items-start md:items-end">
                        <div className="text-[10px] md:text-xs text-gray-800 font-medium mb-1">
                            Desarrollado por: <span className="font-bold">Dionny Nuñez</span>
                        </div>
                    </div>
                </div>
            </header>
            <main className="container mx-auto p-4 flex-grow">
                <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                    <div className="lg:col-span-1">
                        <ControlPanel
                            startDateString={startDateString}
                            onDateChange={handleDateChange}
                            departureDay={departureDay}
                            onDepartureDayChange={handleDepartureDayChange}
                            returnDay={returnDay}
                            onReturnDayChange={handleReturnDayChange}
                            workDays={workDays}
                            onWorkDaysChange={handleWorkDaysChange}
                            minRestDays={minRestDays}
                            onMinRestDaysChange={handleMinRestDaysChange}
                            monthsData={monthsData}
                            onResetToDefaults={handleResetToDefaults}
                        />
                    </div>
                    <div className="lg:col-span-3">
                        {startDate ? (
                            <DynamicCalendar
                                startDate={startDate}
                                departureDay={departureDay}
                                returnDay={returnDay}
                                workDays={workDays}
                                minRestDays={minRestDays}
                                onDateSelect={handleCalendarDateSelect}
                            />
                        ) : (
                            <div className="flex items-center justify-center h-full bg-white rounded-lg shadow p-6">
                                <p className="text-gray-500">Por favor, seleccione una fecha de inicio para generar el cronograma.</p>
                            </div>
                        )}
                    </div>
                </div>
            </main>
            <footer className="bg-white border-t py-8 mt-auto">
                <div className="container mx-auto px-4 flex flex-col items-center justify-center gap-4">
                    <a href="https://cityny.github.io/cityny/index.html" target="_blank" rel="noopener noreferrer" className="hover:opacity-80 transition-opacity">
                        <img src={LogoCityNy} alt="CityNy Logo" className="h-16 w-auto" />
                    </a>
                    <p className="text-gray-500 text-sm">
                        © {new Date().getFullYear()} Dionny Nuñez - CityNy Development. Todos los derechos reservados.
                    </p>
                </div>
            </footer>
            <ScrollToTop />
        </div>
    );
};

export default App;
