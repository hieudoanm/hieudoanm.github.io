import { mergeSchemas } from '@graphql-tools/schema';
import { GraphQLSchema } from 'graphql';
import { schema as chessSchema } from './chess/chess.schema';
import { schema as healthSchema } from './health/health.schema';

const schemas: GraphQLSchema[] = [chessSchema, healthSchema];

export const schema: GraphQLSchema = mergeSchemas({ schemas });
