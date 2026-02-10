import React, { useState } from 'react';
import { LEGEND_ITEMS, DAY_NAMES } from '../constants/constants';
import { DepartureIcon, ReturnIcon, CalendarIcon, BriefcaseIcon, HomeIcon } from './Icons';
import CustomDatePicker from './CustomDatePicker';
import DaySelector from './DaySelector';

// Declare jspdf and html2canvas to be available in the global scope from CDN
declare const jspdf: any;
declare const html2canvas: any;

interface ControlPanelProps {
    startDateString: string;
    onDateChange: (date: string) => void;
    departureDay: number;
    onDepartureDayChange: (day: number) => void;
    returnDay: number | null;
    onReturnDayChange: (day: number | null) => void;
    returnDay: number | null;
    onReturnDayChange: (day: number | null) => void;
    workDays: number;
    onWorkDaysChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    minRestDays?: number;
    onMinRestDaysChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
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
    onMinRestDaysChange = () => { }
}) => {
    const [isCapturing, setIsCapturing] = useState(false);

    const handleExportScreenshot = () => {
        const exportButton = document.getElementById('export-screenshot-button');
        if (exportButton) {
            exportButton.textContent = 'Generando PDF...';
            (exportButton as HTMLButtonElement).disabled = true;
        }

        setIsCapturing(true);

        // Use a short timeout to allow React to re-render the component
        // with the static text before html2canvas starts capturing.
        setTimeout(() => {
            const appElement = document.getElementById('root');
            if (!appElement) {
                if (exportButton) {
                    exportButton.textContent = 'Error: No se encontró la app';
                }
                setIsCapturing(false);
                setTimeout(() => {
                    if (exportButton) {
                        exportButton.textContent = 'Crear PDF (Captura de Pantalla)';
                        (exportButton as HTMLButtonElement).disabled = false;
                    }
                }, 2000);
                return;
            }

            const options = {
                scale: 2, // Higher scale for better quality
                useCORS: true,
                width: appElement.scrollWidth,
                height: appElement.scrollHeight,
                windowWidth: appElement.scrollWidth,
                windowHeight: appElement.scrollHeight,
            };

            html2canvas(appElement, options).then((canvas: HTMLCanvasElement) => {
                const imgData = canvas.toDataURL('image/png');
                const { jsPDF } = jspdf;

                const imgWidth = canvas.width;
                const imgHeight = canvas.height;
                const orientation = imgWidth > imgHeight ? 'l' : 'p';

                const pdf = new jsPDF({
                    orientation: orientation,
                    unit: 'px',
                    format: [imgWidth, imgHeight],
                });

                pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);
                pdf.save('cronograma-captura.pdf');
            }).catch(error => {
                console.error('Error al generar el PDF:', error);
                if (exportButton) {
                    exportButton.textContent = 'Error al generar PDF';
                }
            }).finally(() => {
                setIsCapturing(false);
                if (exportButton) {
                    setTimeout(() => {
                        exportButton.textContent = 'Crear PDF (Captura de Pantalla)';
                        (exportButton as HTMLButtonElement).disabled = false;
                    }, 1000);
                }
            });
        }, 100);
    };

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
                </label>
                <CustomDatePicker
                    value={startDateString}
                    onChange={onDateChange}
                />
            </div>

            <div className="mb-6">
                <div className="flex justify-between items-center mb-3">
                    <label className="flex items-center text-sm font-semibold text-gray-800 uppercase tracking-wider">
                        <BriefcaseIcon className="w-4 h-4 mr-2" />
                        Días de Trabajo (Periodo)
                    </label>
                    <span className="bg-indigo-600 text-white text-xs font-bold px-2 py-1 rounded-full">
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
                    <div className="flex justify-between text-[10px] text-gray-400 mt-2 font-medium">
                        <span>1 DÍA</span>
                        <span>60 DÍAS</span>
                    </div>
                </div>
            </div>

            <div className="mb-6">
                <div className="flex justify-between items-center mb-3">
                    <label className="flex items-center text-sm font-semibold text-gray-800 uppercase tracking-wider">
                        <HomeIcon className="w-4 h-4 mr-2" />
                        Días de Descanso (Total)
                    </label>
                    <span className="bg-emerald-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                        {minRestDays} días
                    </span>
                </div>
                <div className="px-1">
                    <input
                        type="range"
                        id="rest-days"
                        min="1"
                        max="30"
                        value={minRestDays}
                        onChange={onMinRestDaysChange}
                        className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-emerald-500"
                    />
                    <div className="flex justify-between text-[10px] text-gray-400 mt-2 font-medium">
                        <span>1 DÍA</span>
                        <span>30 DÍAS</span>
                    </div>
                </div>
            </div>

            <div className="mb-6">
                <label className="flex items-center text-sm font-semibold text-gray-800 mb-3 uppercase tracking-wider">
                    <DepartureIcon className="w-4 h-4 mr-2" />
                    Día de Salida
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

            <button
                id="export-screenshot-button"
                onClick={handleExportScreenshot}
                className="w-full bg-gradient-to-r from-indigo-600 to-blue-600 text-white font-bold py-3 px-4 rounded-xl shadow-lg hover:shadow-indigo-200 hover:scale-[1.02] transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
                Exportar Calendario (PDF)
            </button>
        </div>
    );
};

export default ControlPanel;