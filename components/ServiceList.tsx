import {Service} from '../types/data-types';

export default function ServiceList({services, error}: { services: Service[], error?: any }) {
    return !error
        ? (services !== undefined
            ? <div>
        <p>Known services:</p>
        <ul>
            {services.map((service: { name: string }, i: number) => (
                <li key={i}>{service.name}</li>
            ))}
        </ul>
    </div>
        : <div>Loading...</div>)
        : <div>Failed to load: {error}</div>;
}