import { ApolloServer, ApolloServerPlugin } from '@apollo/server';
import {
  ApolloServerPluginLandingPageLocalDefault,
  ApolloServerPluginLandingPageProductionDefault,
} from '@apollo/server/plugin/landingPage/default';
import { NODE_ENV } from '@sunil/common/environments/environments';
import { schema } from '../schema/schema';

const landingPage: ApolloServerPlugin =
  NODE_ENV === 'production'
    ? ApolloServerPluginLandingPageProductionDefault({ footer: false })
    : ApolloServerPluginLandingPageLocalDefault({ footer: false });

export const apolloServer = new ApolloServer({
  schema,
  plugins: [landingPage],
});
