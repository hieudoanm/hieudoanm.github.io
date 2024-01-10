import { mergeResolvers, mergeTypeDefs } from '@graphql-tools/merge';
import { makeExecutableSchema } from '@graphql-tools/schema';
import { GraphQLSchema } from 'graphql';
import chessTypeDefs from './chess.graphql';
import { resolvers as chessResolvers } from './chess.resolvers';
import countriesTypeDefs from './countries/countries.graphql';
import { resolvers as countriesResolvers } from './countries/countries.resolvers';
import openingsTypeDefs from './openings/openings.graphql';
import { resolvers as openingsResolvers } from './openings/openings.resolvers';
import playerTypeDefs from './player/player.graphql';
import { resolvers as playerResolvers } from './player/player.resolvers';
import streamersTypeDefs from './streamers/streamers.graphql';
import { resolvers as streamersResolvers } from './streamers/streamers.resolvers';
import titledTypeDefs from './titled/titled.graphql';
import { resolvers as titledResolvers } from './titled/titled.resolvers';

const typeDefs = mergeTypeDefs([
  chessTypeDefs,
  countriesTypeDefs,
  openingsTypeDefs,
  playerTypeDefs,
  streamersTypeDefs,
  titledTypeDefs,
]);

const resolvers = mergeResolvers([
  chessResolvers,
  countriesResolvers,
  openingsResolvers,
  playerResolvers,
  streamersResolvers,
  titledResolvers,
]);

export const schema: GraphQLSchema = makeExecutableSchema({
  typeDefs,
  resolvers,
});
