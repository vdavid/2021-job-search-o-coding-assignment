import {ApolloServer, gql} from 'apollo-server-micro';
import {MicroRequest} from 'apollo-server-micro/dist/types';
import {ServerResponse} from 'http';
import services from '../../data/services';
import {Schedule, Service} from '../../types/data-types';

const typeDefs = gql`
    type Query {
        services: [Service!]!,
        getBanInfo(dateISOString: String, timeISOString: String): GetBanInfoResponse!,
        addBan(name: String!, serviceName: String!, dateISOString: String!, timeISOString: String!, durationInMinutes: Int!, repeatType: String!): Int!
    }
    type GetBanInfoResponse {
        activeSchedules: [Schedule!]!,
        bannedServices: [Service!]!
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
            return services;
        },
        getBanInfo(dateISOString: string, timeISOString: string): {activeSchedules: Schedule[], bannedServices: Service[]} {
            return {activeSchedules: [], bannedServices: [{name: "Facebook"}]};
        }
    },
};

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