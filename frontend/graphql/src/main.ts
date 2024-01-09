import { ApolloServer, ApolloServerPlugin } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import {
  ApolloServerPluginLandingPageLocalDefault,
  ApolloServerPluginLandingPageProductionDefault,
} from '@apollo/server/plugin/landingPage/default';
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer';
import cors from 'cors';
import http from 'http';
import { NODE_ENV, PORT } from './common/environments/environments';
import { logger } from './common/libs/logger/logger';
import { schema } from './graphql/graphql.schema';
import express from 'express';

const main = async () => {
  const app = express();
  const httpServer = http.createServer(app);
  // Apollo Server
  const landingPage: ApolloServerPlugin =
    NODE_ENV === 'production'
      ? ApolloServerPluginLandingPageProductionDefault({ footer: false })
      : ApolloServerPluginLandingPageLocalDefault({ footer: false });
  const server = new ApolloServer({
    schema,
    introspection: true,
    plugins: [landingPage, ApolloServerPluginDrainHttpServer({ httpServer })],
  });
  await server.start();
  // GraphQL
  app.use(
    '/graphql',
    cors<cors.CorsRequest>(),
    express.json(),
    expressMiddleware(server)
  );

  const port: number = Number.parseInt(PORT, 10);
  await new Promise<void>((resolve) => httpServer.listen({ port }, resolve));
  logger.info(`🚀 GraphQL is listening on port ${port}`);
};

main().catch(console.error);

process.on('uncaughtException', (error) =>
  logger.error(`uncaughtException ${error}`)
);

process.on('warning', (error) => logger.warn(`warning ${error}`));
