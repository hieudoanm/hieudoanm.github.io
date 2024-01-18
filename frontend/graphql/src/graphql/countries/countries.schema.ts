import { makeExecutableSchema } from '@graphql-tools/schema';
import typeDefs from './countries.graphql';
import { resolvers } from './countries.resolver';

export const schema = makeExecutableSchema({ typeDefs, resolvers });
