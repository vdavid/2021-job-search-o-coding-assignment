
export enum RepeatType {
    single = 'single',
    daily = 'daily',
}

export type Service = {
    name: string,
};

export type Schedule = {
    id: number,
    name: string,
    servicesToBlock: Service[],
    startDateISOString: string | null,
    startTimeISOString: string,
    durationInMinutes: number, /* Must be less than 1440 (24 hours) */
    repeatType: RepeatType,
};
