import { makeExecutableSchema } from '@graphql-tools/schema';
import { GraphQLSchema } from 'graphql';
import { resolvers } from './chess.resolvers';
import typeDefs from './chess.type-defs.graphql';

export const schema: GraphQLSchema = makeExecutableSchema({
  typeDefs,
  resolvers,
});
