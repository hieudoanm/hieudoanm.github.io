import { makeExecutableSchema } from '@graphql-tools/schema';
import { resolvers } from './news.resolver';
import typeDefs from './news.graphql';

export const schema = makeExecutableSchema({ typeDefs, resolvers });
