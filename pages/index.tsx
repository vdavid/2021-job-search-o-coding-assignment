import useSWR from 'swr';
import Head from 'next/head';
import styles from '../styles/Home.module.css';
import runGraphQlQuery from '../services/run-graphql-query';
import ServiceList from '../components/ServiceList';
import BlockedServicesForDateTime from '../components/BlockedServicesForDateTime';

export default function Home() {
    const {data: serviceResponse, error: serviceResponseError} = useSWR(`{ services { name } }`, runGraphQlQuery);

    const services = serviceResponse ? serviceResponse.data.services : undefined;

    return (
        <div className={styles.container}>
            <Head>
                <title>Schedules and services – Full Stack Engineer Code Test – by David Veszelovszki</title>
                <meta name="description" content="Generated by create next app"/>
                <link rel="icon" href="/favicon.ico"/>
            </Head>

            <main className={styles.main}>
                <h1>Full Stack Engineer Code Test</h1>
                <h2>by David Veszelovszki</h2>
                <ServiceList services={services} error={serviceResponseError}/>

                <h2>Some examples</h2>
                <p>All of these are loaded dynamically.</p>
                <h3>Now</h3>
                <BlockedServicesForDateTime dateTime={new Date()}/>
                <h3>Some random dates:</h3>
                <BlockedServicesForDateTime dateTime={new Date('2021-11-20 14:00:00')}/>
                <BlockedServicesForDateTime dateTime={new Date('2021-11-23 16:30:00')}/>
                <BlockedServicesForDateTime dateTime={new Date('2021-11-23 17:30:00')}/>
            </main>
        </div>
    );
}
