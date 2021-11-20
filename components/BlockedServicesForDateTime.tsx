import {Schedule, Service} from '../types/data-types';
import useSWR from 'swr';
import runGraphQlQuery from '../services/run-graphql-query';

export default function BlockedServicesForDateTime({dateTime}: {dateTime: Date}) {
    const {data, error: requestError} = useSWR(`{
    activeSchedules(dateISOString: "${dateTime.toDateString()}", timeISOString: "${dateTime.toTimeString().substring(0, 8)}") {
        schedules {
            name
        }
        blockedServices {
            name
        }
    }    
}`, runGraphQlQuery);

    const activeSchedules: Schedule[] = (data && data.data) ? data.data.activeSchedules.schedules : undefined;
    const blockedServices: Service[] = (data && data.data) ? data.data.activeSchedules.blockedServices : undefined;
    const errors = data ? data.errors : undefined;

    return (!requestError && !errors)
        ? (activeSchedules !== undefined
            ?
            <section>
                <h3>Blocked services at {dateTime.toDateString()} {dateTime.toTimeString().substring(0, 8)}</h3>{blockedServices.length
                ? <>
                    <ul>
                        {blockedServices.map((service: { name: string }, i: number) => (
                            <li key={i}>{service.name}</li>
                        ))}
                    </ul>
                    <p>(Blocked by {'"' + activeSchedules.map(schedule => schedule.name).join('", "') + '"'})</p>
                </>
                :
                <p>No blocked services now.</p>}
            </section>
            :
            <div>Loading schedules...</div>)
        :
        <div>Failed to load schedules: {requestError || errors[0].message}</div>
}