import { ApolloServer, gql } from 'apollo-server-micro'
import {MicroRequest} from 'apollo-server-micro/dist/types';
import {ServerResponse} from 'http';

const typeDefs = gql`
  type Query {
    users: [User!]!
  }
  type User {
    name: String
  }
`

const resolvers = {
    Query: {
        users(parent: any, args: object, context: object) {
            return [{ name: 'Nextjs' }]
        },
    },
}

const apolloServer = new ApolloServer({ typeDefs, resolvers })

const startServer = apolloServer.start()

export default async function handler(request: MicroRequest, response: ServerResponse) {
    response.setHeader('Access-Control-Allow-Credentials', 'true')
    response.setHeader(
        'Access-Control-Allow-Origin',
        'https://studio.apollographql.com'
    )
    response.setHeader(
        'Access-Control-Allow-Headers',
        'Origin, X-Requested-With, Content-Type, Accept'
    )
    if (request.method === 'OPTIONS') {
        response.end()
        return false
    }

    await startServer
    await apolloServer.createHandler({
        path: '/api/graphql',
    })(request, response)
}

export const config = {
    api: {
        bodyParser: false,
    },
}