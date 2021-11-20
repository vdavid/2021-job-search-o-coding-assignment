import {Service} from '../types/data-types';

export default function ServiceList({services, error}: { services: Service[], error?: any }) {
    return !error
        ? (services !== undefined
            ? <div>
        <p>The list of known services (loaded dynamically):</p>
        <ul>
            {services.map((service: { name: string }, i: number) => (
                <li key={i}>{service.name}</li>
            ))}
        </ul>
    </div>
        : <div>Loading known services...</div>)
        : <div>Failed to load services: {error}</div>;
}