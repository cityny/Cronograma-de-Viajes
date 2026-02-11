import React, { useState } from 'react';
import { LEGEND_ITEMS, DAY_NAMES } from '../constants/constants';
import { DepartureIcon, ReturnIcon, CalendarIcon, BriefcaseIcon, HomeIcon } from './Icons';
import CustomDatePicker from './CustomDatePicker';
import DaySelector from './DaySelector';
import InfoTooltip from './InfoTooltip';

import { PDFDownloadLink } from '@react-pdf/renderer';
import PDFDocument from './PDFDocument';

// REMOVE: declare const jspdf: any;
// REMOVE: declare const html2canvas: any;

interface ControlPanelProps {
    startDateString: string;
    onDateChange: (date: string) => void;
    departureDay: number;
    onDepartureDayChange: (day: number) => void;
    returnDay: number | null;
    workDays: number;
    onWorkDaysChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    minRestDays?: number;
    onMinRestDaysChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    monthsData?: any[]; // Data for PDF generation
}

const ControlPanel: React.FC<ControlPanelProps> = ({
    startDateString,
    onDateChange,
    departureDay,
    onDepartureDayChange,
    returnDay,
    onReturnDayChange,
    workDays,
    onWorkDaysChange,
    minRestDays = 7,
    onMinRestDaysChange = () => { },
    monthsData = []
}) => {
    const [isCapturing, setIsCapturing] = useState(false);

    // Old html2canvas logic removed

    return (
        <div className="bg-white p-6 rounded-2xl shadow-xl border border-gray-100 sticky top-4">
            <h2 className="text-2xl font-bold mb-6 text-gray-800 flex items-center">
                <span className="bg-indigo-100 p-2 rounded-lg mr-3">
                    <BriefcaseIcon className="w-6 h-6 text-indigo-600" />
                </span>
                Panel de Control
            </h2>

            <div className="mb-6">
                <label className="flex items-center text-sm font-semibold text-gray-800 mb-3 uppercase tracking-wider">
                    <CalendarIcon className="w-4 h-4 mr-2" />
                    Seleccione Fecha de Inicio
                    <InfoTooltip
                        text="Define cuándo comienza tu ciclo laboral."
                        example="Si llegaste el Lunes 1 de Enero, selecciona esa fecha."
                    />
                </label>
                <CustomDatePicker
                    value={startDateString}
                    onChange={onDateChange}
                />
            </div>

            <div className="mb-6">
                <div className="flex justify-between items-center mb-3 flex-wrap gap-2">
                    <label className="flex items-center text-sm font-semibold text-gray-800 uppercase tracking-wider">
                        <BriefcaseIcon className="w-4 h-4 mr-2" />
                        Días de Trabajo
                        <InfoTooltip
                            text="Cantidad de días consecutivos que trabajas antes de tu descanso."
                            example="21 días (3 semanas)."
                        />
                    </label>
                    <span className="bg-indigo-600 text-white text-xs font-bold px-2 py-1 rounded-full whitespace-nowrap">
                        {workDays} días
                    </span>
                </div>
                <div className="px-1">
                    <input
                        type="range"
                        id="work-days"
                        min="1"
                        max="60"
                        value={workDays}
                        onChange={onWorkDaysChange}
                        className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-indigo-600"
                    />
                    <div className="flex justify-between text-[10px] text-gray-800 mt-2 font-medium">
                        <span>1 DÍA</span>
                        <span>60 DÍAS</span>
                    </div>
                </div>
            </div>

            <div className="mb-6">
                <div className="flex justify-between items-center mb-3 flex-wrap gap-2">
                    <label className="flex items-center text-sm font-semibold text-gray-800 uppercase tracking-wider">
                        <HomeIcon className="w-4 h-4 mr-2" />
                        Días de Descanso
                        <InfoTooltip
                            text="Días totales de descanso (incluyendo viajes) antes de volver a trabajar."
                            example="9 días."
                        />
                    </label>
                    <span className="bg-emerald-500 text-white text-xs font-bold px-2 py-1 rounded-full whitespace-nowrap">
                        {minRestDays} días
                    </span>
                </div>
                <div className="px-1">
                    <input
                        type="range"
                        id="rest-days"
                        min="1"
                        max="60"
                        value={minRestDays}
                        onChange={onMinRestDaysChange}
                        className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-emerald-500"
                    />
                    <div className="flex justify-between text-[10px] text-gray-800 mt-2 font-medium">
                        <span>1 DÍA</span>
                        <span>60 DÍAS</span>
                    </div>
                </div>
            </div>

            <div className="mb-6">
                <label className="flex items-center text-sm font-semibold text-gray-800 mb-3 uppercase tracking-wider">
                    <DepartureIcon className="w-4 h-4 mr-2" />
                    Día de Salida
                    <InfoTooltip
                        text="Día de la semana en que usualmente viajas de regreso a casa."
                        example="Viernes."
                    />
                </label>
                {isCapturing ? (
                    <div className="w-full px-3 py-2 border border-gray-200 rounded-xl bg-gray-50 text-gray-800 font-bold">
                        {DAY_NAMES[departureDay]}
                    </div>
                ) : (
                    <DaySelector
                        value={departureDay}
                        onChange={onDepartureDayChange}
                        activeColor="blue"
                    />
                )}
            </div>

            <div className="mb-8">
                <div className="flex justify-between items-center mb-3">
                    <label className="flex items-center text-sm font-semibold text-gray-800 uppercase tracking-wider">
                        <ReturnIcon className="w-4 h-4 mr-2" />
                        Día de Regreso
                        <InfoTooltip
                            text="Día en que debes estar de vuelta o reinicias labores."
                            example="'Auto' lo calcula por ti. Ejemplo: Domingo."
                        />
                    </label>
                    <div className="flex items-center space-x-2">
                        <span className={`text-xs font-bold ${returnDay === null ? 'text-indigo-600' : 'text-gray-400'}`}>Auto</span>
                        <button
                            onClick={() => onReturnDayChange(returnDay === null ? 0 : null)} // Default to Sunday (0) if switching to manual
                            className={`w-10 h-5 rounded-full flex items-center transition-colors duration-300 focus:outline-none ${returnDay !== null ? 'bg-indigo-600' : 'bg-gray-300'}`}
                        >
                            <div
                                className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform duration-300 ${returnDay !== null ? 'translate-x-5' : 'translate-x-1'}`}
                            />
                        </button>
                        <span className={`text-xs font-bold ${returnDay !== null ? 'text-indigo-600' : 'text-gray-400'}`}>Manual</span>
                    </div>
                </div>

                {returnDay === null ? (
                    <div className="w-full px-3 py-2 border border-dashed border-gray-300 rounded-xl bg-gray-50 text-gray-500 text-sm italic text-center">
                        Calculado automáticamente por días de descanso
                    </div>
                ) : (
                    isCapturing ? (
                        <div className="w-full px-3 py-2 border border-gray-200 rounded-xl bg-gray-50 text-gray-800 font-bold">
                            {DAY_NAMES[returnDay]}
                        </div>
                    ) : (
                        <DaySelector
                            value={returnDay}
                            onChange={(day) => onReturnDayChange(day)}
                            activeColor="purple"
                        />
                    )
                )}
            </div>


            <div className="mb-8 p-4 bg-gray-50 rounded-xl border border-gray-100">
                <h3 className="text-xs font-bold mb-4 text-gray-800 uppercase tracking-widest">Leyenda</h3>
                <ul className="space-y-4">
                    {LEGEND_ITEMS.map(item => (
                        <li key={item.label} className="flex items-center">
                            <span className={`w-6 h-6 rounded-lg mr-3 ${item.color} flex items-center justify-center shadow-sm`}>
                                {item.label.includes('Salida') && <DepartureIcon className="w-3 h-3 text-white" />}
                                {item.label.includes('Regreso') && <ReturnIcon className="w-3 h-3 text-white" />}
                            </span>
                            <span className="text-sm font-medium text-gray-600">{item.label}</span>
                        </li>
                    ))}
                </ul>
            </div>

            {startDateString ? (
                <PDFDownloadLink
                    document={
                        <PDFDocument
                            startDate={startDateString}
                            workDays={workDays}
                            restDays={minRestDays}
                            departureDay={DAY_NAMES[departureDay]}
                            returnDay={returnDay !== null ? DAY_NAMES[returnDay] : 'Automático'}
                            monthsData={monthsData}
                            currentUrl={window.location.origin}
                        />
                    }
                    fileName="cronograma-de-viajes.pdf"
                    className="w-full block text-center bg-gradient-to-r from-indigo-600 to-blue-600 text-white font-bold py-3 px-4 rounded-xl shadow-lg hover:shadow-indigo-200 hover:scale-[1.02] transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                    {({ blob, url, loading, error }) =>
                        loading ? 'Generando PDF...' : 'Descargar Cronograma PDF'
                    }
                </PDFDownloadLink>
            ) : (
                <button
                    disabled
                    className="w-full bg-gray-300 text-gray-500 font-bold py-3 px-4 rounded-xl cursor-not-allowed"
                >
                    Seleccione fecha para descargar
                </button>
            )}
        </div>
    );
};

export default ControlPanel;