import { makeExecutableSchema } from '@graphql-tools/schema';
import { resolvers } from './chess.resolver';
import typeDefs from './chess.graphql';

export const schema = makeExecutableSchema({ typeDefs, resolvers });
