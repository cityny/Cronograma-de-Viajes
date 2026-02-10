
export enum DayType {
    None,
    Work,
    Rest,
    Departure,
    Return,
}

export interface DayInfo {
    date: Date;
    dayOfMonth: number;
    type: DayType;
}
