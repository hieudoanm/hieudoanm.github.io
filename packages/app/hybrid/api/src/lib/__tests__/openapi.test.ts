import {
  collectionToOpenApi,
  openApiToCollection,
  operationToRequest,
  parseOpenApi,
} from '@/lib/openapi';
import { newCollection, newCollectionEntry, newGroup } from '@/lib/collections';
import { emptyRequest } from '@/lib/http';

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

  it('prefixes the base path for swagger 2.0 specs', () => {
    const swagger = JSON.stringify({
      swagger: '2.0',
      basePath: '/api',
      paths: { '/users': { get: { operationId: 'listUsers' } } },
    });
    const operation = parseOpenApi(swagger)[0];
    expect(operationToRequest(swagger, operation).url).toBe('/api/users');
  });

  it('avoids double-prefixing when the path already starts with basePath', () => {
    const swagger = JSON.stringify({
      basePath: '/api/',
      paths: { '/api/users': { get: {} } },
    });
    const operation = parseOpenApi(swagger)[0];
    expect(operationToRequest(swagger, operation).url).toBe('/api/users');
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

describe('collectionToOpenApi', () => {
  const entry = (
    name: string,
    url: string,
    method: 'get' | 'post' = 'get',
    body = '',
    example?: string
  ) => {
    const item = newCollectionEntry(name, {
      ...emptyRequest(),
      method: method.toUpperCase() as never,
      url,
      body,
    });
    if (example) item.examples = [{ id: 'e1', name: 'Example', body: example }];
    return item;
  };

  it('exports a collection to an OpenAPI 3.0.3 spec', () => {
    const collection = {
      ...newCollection('Users API'),
      groups: [
        {
          ...newGroup('Users'),
          entries: [
            entry('List users', 'https://api.example.com/users'),
            entry('Create user', 'https://api.example.com/users', 'post', '{}'),
          ],
        },
      ],
    };
    const spec = JSON.parse(collectionToOpenApi(collection)) as {
      openapi: string;
      info: { title: string };
      paths: Record<
        string,
        Record<string, { summary: string; parameters: unknown[] }>
      >;
    };
    expect(spec.openapi).toBe('3.0.3');
    expect(spec.info.title).toBe('Users API');
    expect(Object.keys(spec.paths)).toEqual(['/users']);
    expect(spec.paths['/users'].get.summary).toBe('List users');
    expect(spec.paths['/users'].post.parameters).toEqual([]);
  });

  it('serializes query params and skips empty ones', () => {
    const item = entry('Search', 'https://api.example.com/search');
    item.request.params = [
      { id: 'p1', key: 'q', value: '', enabled: true },
      { id: 'p2', key: '', value: 'x', enabled: true },
      { id: 'p3', key: 'page', value: '1', enabled: false },
    ];
    const collection = {
      ...newCollection('API'),
      groups: [{ ...newGroup('G'), entries: [item] }],
    };
    const spec = JSON.parse(collectionToOpenApi(collection)) as {
      paths: Record<
        string,
        { get: { parameters: { name: string; in: string }[] } }
      >;
    };
    expect(spec.paths['/search'].get.parameters).toEqual([
      { name: 'q', in: 'query', schema: { type: 'string' } },
    ]);
  });

  it('embeds the first example as a response example', () => {
    const collection = {
      ...newCollection('API'),
      groups: [
        {
          ...newGroup('G'),
          entries: [
            entry(
              'Get',
              'https://api.example.com/users',
              'get',
              '',
              '{"ok":true}'
            ),
          ],
        },
      ],
    };
    const spec = JSON.parse(collectionToOpenApi(collection)) as {
      paths: Record<
        string,
        {
          get: {
            responses: {
              '200': { content: { 'application/json': { example: unknown } } };
            };
          };
        }
      >;
    };
    expect(
      spec.paths['/users'].get.responses['200'].content['application/json']
        .example
    ).toEqual({
      ok: true,
    });
  });

  it('keeps non-JSON examples as plain text', () => {
    const collection = {
      ...newCollection('API'),
      groups: [
        {
          ...newGroup('G'),
          entries: [entry('Get', 'relative/users', 'get', '', 'hello world')],
        },
      ],
    };
    const spec = JSON.parse(collectionToOpenApi(collection)) as {
      paths: Record<
        string,
        {
          get: {
            responses: {
              '200': { content: { 'text/plain': { example: string } } };
            };
          };
        }
      >;
    };
    expect(
      spec.paths['relative/users'].get.responses['200'].content['text/plain']
        .example
    ).toBe('hello world');
  });

  it('handles an empty collection', () => {
    const spec = JSON.parse(collectionToOpenApi(newCollection('Empty'))) as {
      paths: Record<string, unknown>;
    };
    expect(spec.paths).toEqual({});
  });
});
