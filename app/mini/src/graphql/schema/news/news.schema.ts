import { makeExecutableSchema } from '@graphql-tools/schema';
import typeDefs from './news.graphql';
import { resolvers } from './news.resolver';

export const schema = makeExecutableSchema({ typeDefs, resolvers });
