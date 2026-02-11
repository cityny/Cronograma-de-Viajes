
/**
 * Formats a Date object to a YYYY-MM-DD string in UTC.
 * @param date The date to format
 * @returns Date string in YYYY-MM-DD format
 */
export const toUTCDateString = (date: Date): string => {
    const year = date.getUTCFullYear();
    const month = String(date.getUTCMonth() + 1).padStart(2, '0');
    const day = String(date.getUTCDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
};

/**
 * Returns the current date as a YYYY-MM-DD string.
 * @returns Current date string
 */
export const getTodayString = (): string => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
};
