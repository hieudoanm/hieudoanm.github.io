import { mergeSchemas } from '@graphql-tools/schema';
import { GraphQLSchema } from 'graphql';
import { schema as countriesSchema } from './countries/countries.schema';
import { schema as healthSchema } from './health/health.schema';
import { schema as newsSchema } from './news/news.schema';
import { schema as statusSchema } from './status/status.schema';

const schemas: GraphQLSchema[] = [
  countriesSchema,
  healthSchema,
  newsSchema,
  statusSchema,
];

export const schema: GraphQLSchema = mergeSchemas({ schemas });
