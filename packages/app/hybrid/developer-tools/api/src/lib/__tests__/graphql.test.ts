import {
  graphqlVariablesObject,
  INTROSPECTION_QUERY,
  introspectSchema,
  parseIntrospection,
} from '@/lib/graphql';
import { executeRequest } from '@/lib/http';

jest.mock('@/lib/http', () => ({
  emptyRequest: jest.fn(),
  executeRequest: jest.fn(),
}));

const executeRequestMock = executeRequest as jest.Mock;

describe('parseIntrospection', () => {
  it('parses schema types', () => {
    const result = parseIntrospection(
      JSON.stringify({
        data: {
          __schema: {
            queryType: { name: 'Query' },
            mutationType: { name: 'Mutation' },
            types: [
              { name: 'Query', kind: 'OBJECT' },
              { name: '__Schema', kind: 'OBJECT' },
              { name: 'User', kind: 'OBJECT' },
            ],
          },
        },
      })
    );
    expect(result.queryType).toBe('Query');
    expect(result.mutationType).toBe('Mutation');
    expect(result.types).toEqual(['Query', 'User']);
  });

  it('throws on invalid responses', () => {
    expect(() => parseIntrospection('not-json')).toThrow(
      'Invalid GraphQL introspection response'
    );
    expect(() => parseIntrospection('{"data":{}}')).toThrow(
      'Invalid GraphQL introspection response'
    );
  });
});

describe('introspectSchema', () => {
  it('returns mock types for an empty url', async () => {
    const result = await introspectSchema('');
    expect(result.types).toContain('User');
    expect(result.error).toBeUndefined();
  });

  it('returns parsed schema when request succeeds', async () => {
    executeRequestMock.mockResolvedValue({
      body: JSON.stringify({
        data: { __schema: { types: [{ name: 'Query', kind: 'OBJECT' }] } },
      }),
    });
    const result = await introspectSchema('https://example.com/graphql');
    expect(result.types).toEqual(['Query']);
    expect(executeRequestMock).toHaveBeenCalled();
  });

  it('returns mock types with error when request fails', async () => {
    executeRequestMock.mockRejectedValue(new Error('network down'));
    const result = await introspectSchema('https://example.com/graphql');
    expect(result.types).toContain('Query');
    expect(result.error).toBe('network down');
  });
});

describe('graphqlVariablesObject', () => {
  it('parses valid JSON objects', () => {
    expect(graphqlVariablesObject('{"id": 42}')).toEqual({ id: 42 });
  });

  it('returns undefined for empty input', () => {
    expect(graphqlVariablesObject('')).toBeUndefined();
  });

  it('returns undefined for invalid or non-object input', () => {
    expect(graphqlVariablesObject('not-json')).toBeUndefined();
    expect(graphqlVariablesObject('"str"')).toBeUndefined();
    expect(graphqlVariablesObject('42')).toBeUndefined();
  });
});

describe('INTROSPECTION_QUERY', () => {
  it('contains __schema', () => {
    expect(INTROSPECTION_QUERY).toContain('__schema');
  });
});
