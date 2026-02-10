import React, { useState, useMemo } from 'react';
import ControlPanel from './components/ControlPanel';
import DynamicCalendar from './components/DynamicCalendar';
import { getTodayString } from './utils/dateUtils';
import ScrollToTop from './components/ScrollToTop';
import InfoTooltip from './components/InfoTooltip';
import LogoCityNy from './assets/Logo_CityNy.gif';

const App: React.FC = () => {
    const [startDateString, setStartDateString] = useState<string>(getTodayString());
    const [departureDay, setDepartureDay] = useState<number>(5); // Default to Friday
    const [returnDay, setReturnDay] = useState<number | null>(null); // Default to Auto (null)
    const [workDays, setWorkDays] = useState<number>(21);      // Default to 21 days
    const [minRestDays, setMinRestDays] = useState<number>(9); // Default to 9 days total

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

    // Memoize the Date object to prevent unnecessary re-renders of the calendar
    const startDate = useMemo(() => {
        if (!startDateString) return null;
        // The input value 'YYYY-MM-DD' is treated as UTC to avoid timezone issues.
        const [year, month, day] = startDateString.split('-').map(Number);
        return new Date(Date.UTC(year, month - 1, day));
    }, [startDateString]);

    return (
        <div className="min-h-screen bg-gray-50 font-sans text-gray-800">
            <header className="bg-white shadow-md">
                <div className="container mx-auto px-4 py-6">
                    <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 leading-tight">
                        Planificador inteligente de ciclos de trabajo
                        <InfoTooltip
                            side="bottom"
                            text="Es una aplicación web interactiva diseñada para calcular y visualizar itinerarios de viaje basados en ciclos de trabajo rotativos. Permite a los usuarios definir su fecha de inicio, días de salida/regreso y duración del periodo laboral para generar automáticamente un calendario anual."
                        />
                    </h1>
                    <div className="mt-2 flex items-center text-xs text-gray-500 font-medium">
                        Desarrollado por:
                        <a href="https://cityny.github.io/cityny/index.html" target="_blank" rel="noopener noreferrer" className="ml-2 hover:opacity-80 transition-opacity">
                            <img src={LogoCityNy} alt="CityNy Logo" className="h-6 w-auto" />
                        </a>
                    </div>
                </div>
            </header>
            <main className="container mx-auto p-4">
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
            <ScrollToTop />
        </div>
    );
};

export default App;
