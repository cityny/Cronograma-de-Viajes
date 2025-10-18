// En el archivo App.tsx
import React, { useState, useMemo } from 'react';
// CAMBIAR: de './components/ControlPanel' a './components/ControlPanel.tsx'
import ControlPanel from './components/ControlPanel.tsx'; 
// CAMBIAR: de './components/DynamicCalendar' a './components/DynamicCalendar.tsx'
import DynamicCalendar from './components/DynamicCalendar.tsx';

// ... el resto del código

const App: React.FC = () => {
    // Function to get today's date in YYYY-MM-DD format, ignoring timezone offsets
    const getTodayString = () => {
        const today = new Date();
        const year = today.getFullYear();
        const month = String(today.getMonth() + 1).padStart(2, '0');
        const day = String(today.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    };

    const [startDateString, setStartDateString] = useState<string>(getTodayString());
    const [departureDay, setDepartureDay] = useState<number>(5); // Default to Friday
    const [returnDay, setReturnDay] = useState<number>(5);     // Default to Friday

    const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setStartDateString(e.target.value);
    };

    const handleCalendarDateSelect = (date: Date) => {
        setStartDateString(date.toISOString().split('T')[0]);
    };

    const handleDepartureDayChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setDepartureDay(Number(e.target.value));
    };

    const handleReturnDayChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setReturnDay(Number(e.target.value));
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
                    <h1 className="text-3xl font-bold text-gray-900">Cronograma de Viajes</h1>
                    <p className="mt-1 text-gray-600">Planificador de ciclo de trabajo y descanso de 12 meses.</p>
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
                        />
                    </div>
                    <div className="lg:col-span-3">
                        {startDate ? (
                            <DynamicCalendar 
                                startDate={startDate} 
                                departureDay={departureDay}
                                returnDay={returnDay}
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
        </div>
    );
};

export default App;
