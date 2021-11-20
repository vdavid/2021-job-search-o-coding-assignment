import useSWR from 'swr';
import Head from 'next/head';
import styles from '../styles/Home.module.css';
import runGraphQlQuery from '../services/run-graphql-query';
import ServiceList from '../components/ServiceList';
import {Schedule, Service} from '../types/data-types';

export default function Home() {
    const {data: serviceResponse, error: serviceResponseError} = useSWR(`{ services { name } }`, runGraphQlQuery);
    const {data: schedulesResponse, error: schedulesResponseError} = useSWR(`{
    getSchedules(dateISOString: "${new Date().toDateString()}", timeISOString: "${new Date().toTimeString().substring(0, 8)}") {
        activeSchedules {
            name
        }
        blockedServices {
            name
        }
    }    
}`, runGraphQlQuery);

    const services = serviceResponse ? serviceResponse.services : undefined;
    const activeSchedules: Schedule[] = schedulesResponse ? schedulesResponse.getSchedules.activeSchedules : undefined;
    const blockedServices: Service[] = schedulesResponse ? schedulesResponse.getSchedules.blockedServices : undefined;

    return (
        <div className={styles.container}>
            <Head>
                <title>Create Next App</title>
                <meta name="description" content="Generated by create next app"/>
                <link rel="icon" href="/favicon.ico"/>
            </Head>

            <main className={styles.main}>
                Hello world

                <ServiceList services={services} error={serviceResponseError}/> {!schedulesResponseError
                ? (activeSchedules !== undefined
                    ?
                    <section>
                        <h1>Blocked services now at {new Date().toDateString()} {new Date().toTimeString().substring(0, 8)}</h1>{blockedServices.length
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
                    <div>Loading...</div>)
                :
                <div>Failed to load: {schedulesResponseError}</div>}
            </main>
        </div>
    );
}
