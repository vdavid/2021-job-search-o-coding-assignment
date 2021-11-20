import {Service} from '../types/data-types';

export default function ServiceList({services}: { services: Service[] }) {
    return <div>
        <p>Known services:</p>
        <ul>
            {services.map((service: { name: string }, i: number) => (
                <li key={i}>{service.name}</li>
            ))}
        </ul>
    </div>;
}