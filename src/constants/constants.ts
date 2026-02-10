import { DayType } from '../types/types';

export const WORK_DAYS = 21;

export const DAY_NAMES = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];
export const DAY_NAMES_SHORT = ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'];
export const MONTH_NAMES = [
    'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
    'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
];

export const DAY_TYPE_STYLES: { [key in DayType]: string } = {
    [DayType.None]: 'text-gray-900',
    [DayType.Work]: 'bg-green-300 text-gray-900',
    [DayType.Rest]: 'bg-red-200 text-red-800',
    [DayType.Departure]: 'bg-blue-500 text-white font-bold',
    [DayType.Return]: 'bg-purple-500 text-white font-bold',
};

export const LEGEND_ITEMS = [
    { type: DayType.Work, label: 'Días de trabajo', color: 'bg-green-400' },
    { type: DayType.Rest, label: 'Días de descanso', color: 'bg-red-400' },
    { type: DayType.Departure, label: 'Salida de vuelo', color: 'bg-blue-500' },
    { type: DayType.Return, label: 'Regreso de vuelo', color: 'bg-purple-500' },
];