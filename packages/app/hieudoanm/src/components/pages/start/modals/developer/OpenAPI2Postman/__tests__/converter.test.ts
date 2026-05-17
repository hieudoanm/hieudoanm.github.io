import { convertToPostman } from '../utils/converter';

describe('convertToPostman', () => {
  it('converts a minimal spec', () => {
    const spec = {
      openapi: '3.0.0',
      info: { title: 'Test API', version: '1.0.0' },
      paths: {
        '/test': {
          get: {
            summary: 'Test endpoint',
            operationId: 'testEndpoint',
            tags: ['test'],
            responses: { '200': { description: 'OK' } },
          },
        },
      },
    };
    const result = convertToPostman(spec as any);
    expect(result.info.name).toBe('Test API');
    expect(result.info.schema).toContain('getpostman.com');
    expect(result.item).toHaveLength(1);
    expect(result.item[0].name).toBe('test');
    expect(result.item[0].item).toHaveLength(1);
    expect(result.item[0].item[0].request.method).toBe('GET');
  });

  it('handles missing info section', () => {
    const spec = { paths: {} };
    const result = convertToPostman(spec as any);
    expect(result.info.name).toBe('Imported Collection');
  });

  it('handles empty paths', () => {
    const result = convertToPostman({} as any);
    expect(result.item).toHaveLength(0);
  });

  it('uses default tag when no tags provided', () => {
    const spec = {
      paths: {
        '/test': {
          get: {
            summary: 'Test',
            responses: { '200': { description: 'OK' } },
          },
        },
      },
    };
    const result = convertToPostman(spec as any);
    expect(result.item).toHaveLength(1);
    expect(result.item[0].name).toBe('default');
  });

  it('groups items by tag', () => {
    const spec = {
      paths: {
        '/a': {
          get: {
            tags: ['group1'],
            responses: { '200': { description: 'OK' } },
          },
        },
        '/b': {
          post: {
            tags: ['group2'],
            responses: { '201': { description: 'Created' } },
          },
        },
      },
    };
    const result = convertToPostman(spec as any);
    expect(result.item).toHaveLength(2);
    const names = result.item.map((f) => f.name).sort();
    expect(names).toEqual(['group1', 'group2']);
  });

  it('converts query parameters', () => {
    const spec = {
      servers: [{ url: 'https://api.example.com' }],
      paths: {
        '/search': {
          get: {
            parameters: [
              {
                name: 'q',
                in: 'query',
                schema: { type: 'string' },
                required: true,
              },
              { name: 'page', in: 'query', schema: { type: 'integer' } },
            ],
            responses: { '200': { description: 'OK' } },
          },
        },
      },
    };
    const result = convertToPostman(spec as any);
    const req = result.item[0].item[0].request;
    expect(req.url.query).toHaveLength(2);
    expect(req.url.query[0].key).toBe('q');
    expect(req.url.query[0].disabled).toBe(false);
    expect(req.url.query[1].key).toBe('page');
    expect(req.url.query[1].disabled).toBe(true);
  });

  it('converts path parameters with example', () => {
    const spec = {
      servers: [{ url: 'https://api.example.com/v1' }],
      paths: {
        '/users/{userId}': {
          get: {
            parameters: [
              {
                name: 'userId',
                in: 'path',
                required: true,
                schema: { type: 'string' },
                example: '123',
              },
            ],
            responses: { '200': { description: 'OK' } },
          },
        },
      },
    };
    const result = convertToPostman(spec as any);
    const req = result.item[0].item[0].request;
    expect(req.url.variable).toHaveLength(1);
    expect(req.url.variable[0].key).toBe('userId');
    expect(req.url.variable[0].value).toBe('123');
    expect(req.url.path).toContain('users');
    expect(req.url.path).toContain('{userId}');
  });

  it('converts header parameters', () => {
    const spec = {
      paths: {
        '/test': {
          get: {
            parameters: [
              {
                name: 'X-API-Key',
                in: 'header',
                schema: { type: 'string' },
              },
            ],
            responses: { '200': { description: 'OK' } },
          },
        },
      },
    };
    const result = convertToPostman(spec as any);
    const req = result.item[0].item[0].request;
    expect(req.header).toHaveLength(1);
    expect(req.header[0].key).toBe('X-API-Key');
  });

  it('converts JSON request body', () => {
    const spec = {
      paths: {
        '/pets': {
          post: {
            requestBody: {
              content: {
                'application/json': {
                  schema: {
                    type: 'object',
                    properties: { name: { type: 'string' } },
                  },
                },
              },
            },
            responses: { '201': { description: 'Created' } },
          },
        },
      },
    };
    const result = convertToPostman(spec as any);
    const req = result.item[0].item[0].request;
    expect(req.body?.mode).toBe('raw');
    expect(req.body?.raw).toContain('name');
    expect(req.header?.some((h) => h.key === 'Content-Type')).toBe(true);
  });

  it('converts urlencoded request body', () => {
    const spec = {
      paths: {
        '/form': {
          post: {
            requestBody: {
              content: {
                'application/x-www-form-urlencoded': {
                  schema: {
                    type: 'object',
                    properties: {
                      username: { type: 'string', example: 'john' },
                    },
                  },
                },
              },
            },
            responses: { '201': { description: 'Created' } },
          },
        },
      },
    };
    const result = convertToPostman(spec as any);
    const req = result.item[0].item[0].request;
    expect(req.body?.mode).toBe('urlencoded');
    const body = req.body as { urlencoded: { key: string; value: string }[] };
    expect(body.urlencoded).toHaveLength(1);
    expect(body.urlencoded[0].key).toBe('username');
    expect(body.urlencoded[0].value).toBe('john');
  });

  it('converts form-data request body', () => {
    const spec = {
      paths: {
        '/upload': {
          post: {
            requestBody: {
              content: {
                'multipart/form-data': {
                  schema: {
                    type: 'object',
                    properties: {
                      file: { type: 'string', format: 'binary' },
                      name: { type: 'string' },
                    },
                  },
                },
              },
            },
            responses: { '201': { description: 'Created' } },
          },
        },
      },
    };
    const result = convertToPostman(spec as any);
    const req = result.item[0].item[0].request;
    expect(req.body?.mode).toBe('formdata');
    const body = req.body as { formdata: { type: string }[] };
    expect(body.formdata).toHaveLength(2);
    expect(body.formdata[0].type).toBe('file');
    expect(body.formdata[1].type).toBe('text');
  });

  it('sets baseUrl variable from servers', () => {
    const spec = {
      servers: [{ url: 'https://api.example.com/v1' }],
      paths: {
        '/test': {
          get: { responses: { '200': { description: 'OK' } } },
        },
      },
    };
    const result = convertToPostman(spec as any);
    expect(result.variable).toHaveLength(1);
    expect(result.variable[0].key).toBe('baseUrl');
    expect(result.variable[0].value).toBe('https://api.example.com/v1');
    expect(result.variable[0].type).toBe('string');
  });

  it('skips non-HTTP methods', () => {
    const spec = {
      paths: {
        '/test': {
          trace: { responses: { '200': { description: 'OK' } } },
        },
      },
    };
    const result = convertToPostman(spec as any);
    expect(result.item).toHaveLength(0);
  });

  it('uses operationId as fallback name', () => {
    const spec = {
      paths: {
        '/test': {
          get: {
            operationId: 'getTest',
            responses: { '200': { description: 'OK' } },
          },
        },
      },
    };
    const result = convertToPostman(spec as any);
    expect(result.item[0].item[0].name).toBe('getTest');
  });

  it('uses method + path as fallback name', () => {
    const spec = {
      paths: {
        '/test': {
          get: { responses: { '200': { description: 'OK' } } },
        },
      },
    };
    const result = convertToPostman(spec as any);
    expect(result.item[0].item[0].name).toBe('GET /test');
  });

  it('includes description on request', () => {
    const spec = {
      paths: {
        '/test': {
          get: {
            description: 'A test endpoint',
            responses: { '200': { description: 'OK' } },
          },
        },
      },
    };
    const result = convertToPostman(spec as any);
    expect(result.item[0].item[0].request.description).toBe('A test endpoint');
  });
});
