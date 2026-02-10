
/**
 * Formats a Date object to a YYYY-MM-DD string in UTC.
 * @param date The date to format
 * @returns Date string in YYYY-MM-DD format
 */
export const toUTCDateString = (date: Date): string => {
    return date.toISOString().split('T')[0];
};

/**
 * Returns the current date as a YYYY-MM-DD string.
 * @returns Current date string
 */
export const getTodayString = (): string => {
    return new Date().toISOString().split('T')[0];
};
