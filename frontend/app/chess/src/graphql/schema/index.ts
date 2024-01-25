import { mergeSchemas } from '@graphql-tools/schema';
import { GraphQLSchema } from 'graphql';
import { schema as healthSchema } from './health/health.schema';

const schemas: GraphQLSchema[] = [healthSchema];

export const schema: GraphQLSchema = mergeSchemas({ schemas });
