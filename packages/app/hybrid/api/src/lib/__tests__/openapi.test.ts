import {
  openApiToCollection,
  operationToRequest,
  parseOpenApi,
} from '@/lib/openapi';

const spec = JSON.stringify({
  openapi: '3.0.0',
  info: { title: 'Users API', version: '1.0.0' },
  paths: {
    '/users': {
      get: {
        operationId: 'listUsers',
        summary: 'List all users',
        parameters: [
          { name: 'page', in: 'query', schema: { type: 'integer' } },
        ],
      },
      post: {
        operationId: 'createUser',
        summary: 'Create a user',
      },
    },
    '/users/{id}': {
      get: {
        operationId: 'getUser',
        parameters: [{ name: 'id', in: 'path', required: true }],
      },
    },
  },
});

describe('parseOpenApi', () => {
  it('parses operations from an OpenAPI spec', () => {
    const operations = parseOpenApi(spec);
    expect(operations).toHaveLength(3);
    expect(operations[0]).toEqual({
      id: 'listUsers',
      method: 'get',
      path: '/users',
      summary: 'List all users',
    });
  });

  it('falls back to a generated id when operationId is missing', () => {
    const noIds = JSON.stringify({
      paths: { '/x': { get: {} } },
    });
    const operations = parseOpenApi(noIds);
    expect(operations[0].id).toBe('GET /x');
  });

  it('ignores non-operation path keys', () => {
    const specWithParams = JSON.stringify({
      paths: {
        '/x': {
          parameters: [],
          get: { operationId: 'getX' },
        },
      },
    });
    const operations = parseOpenApi(specWithParams);
    expect(operations).toHaveLength(1);
  });

  it('returns empty array for invalid JSON', () => {
    expect(parseOpenApi('not-json')).toEqual([]);
  });

  it('returns empty array for a spec without paths', () => {
    expect(parseOpenApi(JSON.stringify({ openapi: '3.0.0' }))).toEqual([]);
  });

  it('skips path items that are not objects', () => {
    const operations = parseOpenApi(
      JSON.stringify({ paths: { '/x': 'not-an-object' } })
    );
    expect(operations).toEqual([]);
  });
});

describe('operationToRequest', () => {
  it('builds a request with method, url and query params', () => {
    const operation = parseOpenApi(spec)[0];
    const request = operationToRequest(spec, operation);
    expect(request.method).toBe('get');
    expect(request.url).toBe('/users');
    expect(request.params).toHaveLength(1);
    expect(request.params[0].key).toBe('page');
  });

  it('keeps default empty params when the operation has no query params', () => {
    const operation = parseOpenApi(spec)[1];
    const request = operationToRequest(spec, operation);
    expect(request.params).toHaveLength(1);
    expect(request.params[0].key).toBe('');
  });

  it('keeps default params when the operation is missing from the spec', () => {
    const operation = parseOpenApi(spec)[0];
    const request = operationToRequest('not-json', operation);
    expect(request.params).toHaveLength(1);
    expect(request.params[0].key).toBe('');
  });

  it('keeps default params when the path item is not an object', () => {
    const operation = parseOpenApi(spec)[0];
    const request = operationToRequest(
      JSON.stringify({ paths: { '/users': 'not-an-object' } }),
      operation
    );
    expect(request.params).toHaveLength(1);
    expect(request.params[0].key).toBe('');
  });
});

describe('openApiToCollection', () => {
  it('builds a collection from an OpenAPI spec', () => {
    const collection = openApiToCollection(spec);
    expect(collection?.name).toBe('Imported API');
    expect(collection?.groups[0].name).toBe('Operations');
    expect(collection?.groups[0].entries).toHaveLength(3);
    expect(collection?.groups[0].entries[0].name).toBe('List all users');
  });

  it('returns null for an invalid or empty spec', () => {
    expect(openApiToCollection('not-json')).toBeNull();
    expect(openApiToCollection(JSON.stringify({ paths: {} }))).toBeNull();
  });

  it('falls back to the operation id when summary is missing', () => {
    const noSummary = JSON.stringify({
      paths: { '/x': { get: {} } },
    });
    const collection = openApiToCollection(noSummary);
    expect(collection?.groups[0].entries[0].name).toBe('GET /x');
  });
});
