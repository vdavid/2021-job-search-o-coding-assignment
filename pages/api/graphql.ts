import {ApolloServer, gql} from 'apollo-server-micro';
import {MicroRequest} from 'apollo-server-micro/dist/types';
import {ServerResponse} from 'http';
import services from '../../data/services';
import {Schedule, Service} from '../../types/data-types';
import * as fs from 'fs';

const typeDefs = gql`
    type Query {
        services: [Service!]!,
        getSchedules(dateISOString: String, timeISOString: String): GetSchedulesResponse!,
        addSchedule(name: String!, serviceName: String!, dateISOString: String!, timeISOString: String!, durationInMinutes: Int!, repeatType: String!): Int!
    }
    type GetSchedulesResponse {
        activeSchedules: [Schedule!]!,
        blockedServices: [Service!]!
    }
    type Service {
        name: String!
    }
    type Schedule {
        id: Int!,
        name: String!,
        servicesToBlock: [Service!]!,
        startDateISOString: String!,
        startTimeISOString: String!,
        durationInMinutes: Int!,
        repeatType: String!,
    }
`;

const resolvers = {
    Query: {
        services() {
            console.log('Services called');
            return services;
        },
        async getSchedules(parent: object, {dateISOString, timeISOString}: {dateISOString: string, timeISOString: string}): Promise<{activeSchedules: Schedule[], blockedServices: Service[]}> {
            console.log('GetSchedules called');
            /* Parse given date and time */
            const now = assembleDate(dateISOString, timeISOString);

            /* Load schedules */
            const rawSchedules = await fs.promises.readFile('./data/schedules.json');
            const schedules: Schedule[] = JSON.parse(rawSchedules.toString());

            /* Filter schedules */
            const activeSchedules = schedules.filter(schedule => {
                /* Parse schedule date and time */
                const startDateTime = assembleDate(schedule.startDateISOString, schedule.startTimeISOString);
                const endDateTime = new Date(startDateTime.getTime() + schedule.durationInMinutes * 60 * 1000);

                return now >= startDateTime && now <= endDateTime;
            });

            const blockedServices: Service[] = activeSchedules.reduce<Service[]>((result, schedule) => {
                return result.concat(schedule.servicesToBlock);
            }, []);

            return {activeSchedules, blockedServices};
        }
    },
};

function assembleDate(dateISOString: string, timeISOString: string): Date {
    const date = new Date(dateISOString);
    const time = new Date(`1970-01-01 ${timeISOString}`);
    return new Date(date.getFullYear(), date.getMonth(), date.getDate(), time.getHours(), time.getMinutes(), time.getSeconds());
}

const apolloServer = new ApolloServer({typeDefs, resolvers});

const startServer = apolloServer.start();

export default async function handler(request: MicroRequest, response: ServerResponse) {
    response.setHeader('Access-Control-Allow-Credentials', 'true');
    response.setHeader('Access-Control-Allow-Origin', 'https://studio.apollographql.com');
    response.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    if (request.method !== 'OPTIONS') {
        await startServer;
        await apolloServer.createHandler({path: '/api/graphql'})(request, response);
    } else {
        response.end();
        return false;
    }
}

export const config = {
    api: {
        bodyParser: false,
    },
};