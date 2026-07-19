import { executeRequest, emptyRequest } from '@/lib/http';
import { EnvironmentVariable } from '@/types/api-client';

export const INTROSPECTION_QUERY = `
  query IntrospectionQuery {
    __schema {
      queryType { name }
      mutationType { name }
      types { name kind }
    }
  }
`;

export interface IntrospectionResult {
  queryType: string | null;
  mutationType: string | null;
  types: string[];
  error?: string;
}

const MOCK_TYPES = [
  'Query',
  'Mutation',
  'User',
  'Article',
  'Comment',
  'ID',
  'String',
  'Int',
  'Boolean',
];

export const parseIntrospection = (
  body: string
): {
  queryType: string | null;
  mutationType: string | null;
  types: string[];
} => {
  try {
    const data = JSON.parse(body);
    const schema = data?.data?.__schema;
    if (!schema) throw new Error('no schema');
    const types = Array.isArray(schema.types)
      ? schema.types
          .map((type: { name?: string | null }) => type.name)
          .filter(
            (name: string | undefined): name is string =>
              typeof name === 'string' && name !== '' && !name.startsWith('__')
          )
          .sort()
      : [];
    return {
      queryType: schema.queryType?.name ?? null,
      mutationType: schema.mutationType?.name ?? null,
      types,
    };
  } catch {
    throw new Error('Invalid GraphQL introspection response');
  }
};

export const introspectSchema = async (
  url: string,
  env?: EnvironmentVariable[]
): Promise<IntrospectionResult> => {
  if (url.trim() === '') {
    return { queryType: null, mutationType: null, types: MOCK_TYPES };
  }
  const config = emptyRequest();
  const body = JSON.stringify({ query: INTROSPECTION_QUERY });
  const request: typeof config = {
    ...config,
    method: 'POST',
    url,
    body,
    bodyType: 'raw',
  };
  try {
    const response = await executeRequest(request, env);
    const parsed = parseIntrospection(response.body);
    return {
      queryType: parsed.queryType,
      mutationType: parsed.mutationType,
      types: parsed.types,
    };
  } catch (err) {
    return {
      queryType: null,
      mutationType: null,
      types: MOCK_TYPES,
      error: err instanceof Error ? err.message : 'Introspection failed',
    };
  }
};

export const graphqlVariablesObject = (
  source: string
): Record<string, unknown> | undefined => {
  if (source.trim() === '') return undefined;
  try {
    const parsed: unknown = JSON.parse(source);
    if (typeof parsed === 'object' && parsed !== null) {
      return parsed as Record<string, unknown>;
    }
    return undefined;
  } catch {
    return undefined;
  }
};
