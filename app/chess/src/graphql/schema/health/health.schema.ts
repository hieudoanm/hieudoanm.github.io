import { makeExecutableSchema } from '@graphql-tools/schema';
import typeDefs from './health.graphql';
import { resolvers } from './health.resolver';

export const schema = makeExecutableSchema({ typeDefs, resolvers });
