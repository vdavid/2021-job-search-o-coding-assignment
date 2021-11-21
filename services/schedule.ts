import {RepeatType, Schedule} from '../types/data-types';
import schedules from '../data/schedules.json';

export async function loadSchedules(): Promise<Schedule[]> {
    //const rawSchedules = await fs.promises.readFile('./data/schedules.json');
    //return JSON.parse(rawSchedules.toString());

    // TODO: I'm loading the data via `import` now because when I deploy the app to Vercel, the paths are different.
    // This is just a temporary solution, it would be necessary to fix this once we want to write Schedule data.
    // @ts-ignore
    return schedules;
}

export function filterForActiveSchedules(schedules: Schedule[], dateISOString: string, timeISOString: string): Schedule[] {
    /* Parse given date and time */
    const now = assembleDate(dateISOString, timeISOString);

    /* Filter schedules */
    return schedules.filter(schedule => {
        /* Parse schedule date and time */
        const startDateTime = assembleDate(schedule.startDateISOString, schedule.startTimeISOString);
        const endDateTime = new Date(startDateTime.getTime() + schedule.durationInMinutes * 60 * 1000);

        if (schedule.repeatType === RepeatType.single) {
            return now >= startDateTime && now <= endDateTime;
        } else if (schedule.repeatType === RepeatType.daily) {
            return now >= startDateTime
                && (timeISOString >= schedule.startTimeISOString
                    && timeISOString <= endDateTime.toTimeString().substring(0, 8));
        }
    });

}

function assembleDate(dateISOString: string, timeISOString: string): Date {
    const date = new Date(dateISOString);
    const time = new Date(`1970-01-01 ${timeISOString}`);
    return new Date(date.getFullYear(), date.getMonth(), date.getDate(), time.getHours(), time.getMinutes(), time.getSeconds());
}
