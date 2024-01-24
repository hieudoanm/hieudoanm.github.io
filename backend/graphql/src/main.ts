import http from 'http';
import { ApolloServer, ApolloServerPlugin } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer';
import {
  ApolloServerPluginLandingPageLocalDefault,
  ApolloServerPluginLandingPageProductionDefault,
} from '@apollo/server/plugin/landingPage/default';
import cors from 'cors';
import express from 'express';
import { app } from './app.module';
import { ApolloContext } from './common/apollo/apollo.types';
import { ChessDataSource } from './common/data/chess/chess.data-source';
import { StatusDataSource } from './common/data/status/status.data-source';
import { NODE_ENV, PORT } from './common/environments/environments';
import { logger } from './common/libs/logger/logger';
import { schema } from './graphql/graphql.schema';

const main = async () => {
  const httpServer = http.createServer(app);
  // Apollo Server
  const landingPage: ApolloServerPlugin =
    NODE_ENV === 'production'
      ? ApolloServerPluginLandingPageProductionDefault({ footer: false })
      : ApolloServerPluginLandingPageLocalDefault({ footer: false });
  const apolloServer = new ApolloServer<ApolloContext>({
    schema,
    introspection: true,
    plugins: [landingPage, ApolloServerPluginDrainHttpServer({ httpServer })],
  });
  await apolloServer.start();
  // GraphQL
  app.use(
    '/graphql',
    cors<cors.CorsRequest>(),
    express.json(),
    expressMiddleware(apolloServer, {
      context: async () => ({
        chessDataSource: new ChessDataSource(),
        statusDataSource: new StatusDataSource(),
      }),
    })
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
