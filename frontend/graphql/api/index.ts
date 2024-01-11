import { ApolloServer, ApolloServerPlugin } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer';
import {
  ApolloServerPluginLandingPageLocalDefault,
  ApolloServerPluginLandingPageProductionDefault,
} from '@apollo/server/plugin/landingPage/default';
import cors from 'cors';
import { json } from 'express';
import http from 'node:http';
import { app } from '../src/app.module';
import { ApolloContext } from '../src/common/apollo/apollo.types';
import { ChessDataSource } from '../src/common/data/chess/chess.data-source';
import { NODE_ENV } from '../src/common/environments/environments';
import { schema } from '../src/graphql/graphql.schema';

const startServer = async (apolloServer: ApolloServer<ApolloContext>) => {
  await apolloServer.start();
  app.use(
    '/api/graphql',
    cors<cors.CorsRequest>(),
    json(),
    expressMiddleware(apolloServer, {
      context: async () => ({ chessDataSource: new ChessDataSource() }),
    })
  );
};

const httpServer: http.Server = http.createServer(app);
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
startServer(apolloServer);

export default httpServer;
