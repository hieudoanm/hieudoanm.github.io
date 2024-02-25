import { mergeResolvers, mergeTypeDefs } from '@graphql-tools/merge';
import { makeExecutableSchema } from '@graphql-tools/schema';
import { GraphQLSchema } from 'graphql';
import chessTypeDefs from './chess/chess.graphql';
import { resolvers as chessResolvers } from './chess/chess.resolvers';
import countriesTypeDefs from './countries/countries.graphql';
import { resolvers as countriesResolvers } from './countries/countries.resolvers';
import openingsTypeDefs from './openings/openings.graphql';
import { resolvers as openingsResolvers } from './openings/openings.resolvers';
import playersTypeDefs from './players/players.graphql';
import { resolvers as playerResolvers } from './players/players.resolvers';
import titledTypeDefs from './titled/titled.graphql';
import { resolvers as titledResolvers } from './titled/titled.resolvers';

const typeDefs = mergeTypeDefs([
  chessTypeDefs,
  countriesTypeDefs,
  openingsTypeDefs,
  playersTypeDefs,
  titledTypeDefs,
]);

const resolvers = mergeResolvers([
  chessResolvers,
  countriesResolvers,
  openingsResolvers,
  playerResolvers,
  titledResolvers,
]);

export const schema: GraphQLSchema = makeExecutableSchema({
  typeDefs,
  resolvers,
});
