import React, { useState } from 'react';
import { LEGEND_ITEMS, DAY_NAMES } from '../constants';
import { DepartureIcon, ReturnIcon } from './Icons';

// Declare jspdf and html2canvas to be available in the global scope from CDN
declare const jspdf: any;
declare const html2canvas: any;

interface ControlPanelProps {
    startDateString: string;
    onDateChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    departureDay: number;
    onDepartureDayChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
    returnDay: number;
    onReturnDayChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}

const ControlPanel: React.FC<ControlPanelProps> = ({ 
    startDateString, 
    onDateChange,
    departureDay,
    onDepartureDayChange,
    returnDay,
    onReturnDayChange
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
        <div className="bg-white p-6 rounded-lg shadow-md sticky top-4">
            <h2 className="text-xl font-semibold mb-4 text-gray-700">Panel de Control</h2>
            
            <div className="mb-6">
                <label htmlFor="start-date" className="block text-sm font-medium text-gray-600 mb-2">
                    Seleccione Fecha de Inicio
                </label>
                <input
                    type="date"
                    id="start-date"
                    value={startDateString}
                    onChange={onDateChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
            </div>

            <div className="mb-6">
                <label htmlFor="departure-day" className="block text-sm font-medium text-gray-600 mb-2">
                    Día de Salida
                </label>
                {isCapturing ? (
                     <div className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-50 text-gray-800 shadow-sm">
                        {DAY_NAMES[departureDay]}
                    </div>
                ) : (
                    <select
                        id="departure-day"
                        value={departureDay}
                        onChange={onDepartureDayChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        aria-label="Seleccionar día de salida"
                    >
                        {DAY_NAMES.map((day, index) => (
                            <option key={index} value={index}>{day}</option>
                        ))}
                    </select>
                )}
            </div>

            <div className="mb-6">
                <label htmlFor="return-day" className="block text-sm font-medium text-gray-600 mb-2">
                    Día de Regreso
                </label>
                 {isCapturing ? (
                     <div className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-50 text-gray-800 shadow-sm">
                        {DAY_NAMES[returnDay]}
                    </div>
                ) : (
                    <select
                        id="return-day"
                        value={returnDay}
                        onChange={onReturnDayChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        aria-label="Seleccionar día de regreso"
                    >
                        {DAY_NAMES.map((day, index) => (
                            <option key={index} value={index}>{day}</option>
                        ))}
                    </select>
                )}
            </div>

            <div className="mb-8">
                <h3 className="text-lg font-semibold mb-3 text-gray-700">Leyenda de Colores</h3>
                <ul className="space-y-3">
                    {LEGEND_ITEMS.map(item => (
                        <li key={item.label} className="flex items-center">
                            <span className={`w-5 h-5 rounded-full mr-3 ${item.color} flex items-center justify-center`}>
                                {item.label.includes('Salida') && <DepartureIcon className="w-3 h-3 text-white" />}
                                {item.label.includes('Regreso') && <ReturnIcon className="w-3 h-3 text-white" />}
                            </span>
                            <span className="text-sm text-gray-600">{item.label}</span>
                        </li>
                    ))}
                </ul>
            </div>
            
            <div>
                <h3 className="text-lg font-semibold mb-3 text-gray-700">Exportar</h3>
                <button
                    id="export-screenshot-button"
                    onClick={handleExportScreenshot}
                    className="w-full bg-indigo-600 text-white font-bold py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors duration-200"
                >
                    Crear PDF
                </button>
            </div>
        </div>
    );
};

export default ControlPanel;