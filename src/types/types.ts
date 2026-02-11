
export enum DayType {
    None,
    Work,
    Rest,
    Departure,
    Return,
}

export interface CalendarDay {
    date: Date;
    dayOfMonth: number;
    type: DayType;
}
