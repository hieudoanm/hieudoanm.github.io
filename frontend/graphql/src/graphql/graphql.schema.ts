import { mergeSchemas } from '@graphql-tools/schema';
import { schema as healthSchema } from './health/health.schema';

export const schema = mergeSchemas({ schemas: [healthSchema] });
