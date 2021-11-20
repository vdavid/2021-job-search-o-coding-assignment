
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
    startDateISOString: string,
    startTimeISOString: string,
    durationInMinutes: number,
    repeatType: RepeatType,
};
