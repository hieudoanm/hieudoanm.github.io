import { makeExecutableSchema } from '@graphql-tools/schema';
import typeDefs from './status.graphql';
import { resolvers } from './status.resolver';

export const schema = makeExecutableSchema({ typeDefs, resolvers });
