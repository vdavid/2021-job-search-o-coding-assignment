# Introduction

# Running

- To see an example of the app, check it out on [Vercel](https://2021-job-search-o-coding-assignment.vercel.app/)
- To run the development server, use `npm run dev`, then open [http://localhost:3000](http://localhost:3000).
- Run tests with `npm run tests`
- [Apollo Explorer](https://studio.apollographql.com/sandbox/explorer) is useful for testing queries.

# Tech stack

- A Node.js + TypeScript + Next.js + React base
- GraphQL communication
- [Jest](https://jestjs.io/) for the tests
- [ts-jest](https://www.npmjs.com/package/ts-jest) to make Jest work with TypeScript
- [Apollo Server Micro](https://github.com/apollographql/apollo-server/tree/main/packages/apollo-server-micro) for the back end.
- [SWR](https://swr.vercel.app/) for a stale-while-revalidate strategy on the front end.

# Project setup details

Created this project with

 - `npx create-next-app next-with-apollo --ts`
 - `npm install @apollo/client graphql` (see [the docs](https://www.apollographql.com/blog/apollo-client/next-js/next-js-getting-started/))
 - `npm i -D jest typescript ts-jest @types/jest` (see [the docs](https://www.npmjs.com/package/ts-jest))
 - `npx ts-jest config:init`
