import { getHandler, getRoutes } from '@/server/rest';
import type { NextApiRequest, NextApiResponse } from 'next';

type MockRes = NextApiResponse & {
  body?: unknown;
  statusCode: number;
  headers: Record<string, string>;
};

const createRes = (): MockRes => {
  const res: Record<string, unknown> = {
    statusCode: 200,
    headers: {} as Record<string, string>,
  };
  res.status = jest.fn(function (this: Record<string, unknown>, code: number) {
    this.statusCode = code;
    return this;
  });
  res.setHeader = jest.fn(function (
    this: Record<string, unknown>,
    key: string,
    value: string
  ) {
    (this.headers as Record<string, string>)[key] = value;
    return this;
  });
  res.json = jest.fn(function (this: Record<string, unknown>, body: unknown) {
    this.body = body;
    return this;
  });
  res.send = jest.fn(function (this: Record<string, unknown>, body: unknown) {
    this.body = body;
    return this;
  });
  res.end = jest.fn(function (this: Record<string, unknown>) {
    return this;
  });
  return res as unknown as MockRes;
};

const call = async (endpoint: string, query: Record<string, unknown> = {}) => {
  const handler = getHandler(endpoint);
  const req = { query, method: 'GET' } as unknown as NextApiRequest;
  const res = createRes();
  if (handler) await handler(req, res);
  return res;
};

const callWith = async (
  endpoint: string,
  req: Partial<NextApiRequest> = {}
) => {
  const handler = getHandler(endpoint);
  const fullReq = {
    query: {},
    method: 'GET',
    ...req,
  } as unknown as NextApiRequest;
  const res = createRes();
  if (handler) await handler(fullReq, res);
  return res;
};

describe('server/rest', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    global.fetch = jest.fn();
  });

  it('registers all documented routes', () => {
    const routes = getRoutes();
    expect(routes.map((r) => r.path)).toEqual([
      '/api/rest/docs',
      '/api/rest/health',
      '/api/rest/info',
      '/api/rest/status',
      '/api/rest/version',
      '/api/rest/proxy',
    ]);
    for (const endpoint of [
      'docs',
      'health',
      'info',
      'status',
      'version',
      'proxy',
    ]) {
      expect(getHandler(endpoint)).toBeDefined();
    }
  });

  it('returns 200 with status ok for health', async () => {
    const res = await call('health');
    expect(res.statusCode).toBe(200);
    expect(res.body).toMatchObject({ status: 'ok' });
  });

  it('returns name and endpoints for info', async () => {
    const res = await call('info');
    expect(res.body).toMatchObject({
      name: 'hieudoanm',
      endpoints: { docs: '/api/rest/docs' },
    });
  });

  it('returns runtime details for status', async () => {
    const res = await call('status');
    expect(res.body).toMatchObject({
      status: 'ok',
      environment: expect.any(String),
    });
  });

  it('returns version info', async () => {
    const res = await call('version');
    expect(res.body).toMatchObject({
      name: 'hieudoanm',
      version: '0.0.1',
      commit: null,
      buildTime: null,
    });
  });

  it('serves docs as raw json when format=json', async () => {
    const res = await call('docs', { format: 'json' });
    expect(res.statusCode).toBe(200);
    const spec = res.body as {
      openapi: string;
      paths: Record<string, unknown>;
    };
    expect(spec.openapi).toBe('3.0.3');
    expect(spec.paths['/api/rest/health']).toBeDefined();
  });

  it('serves docs as html by default', async () => {
    const res = await call('docs');
    expect(res.statusCode).toBe(200);
    expect(res.body as string).toContain('<!DOCTYPE html>');
  });

  it('rejects proxy calls without a url', async () => {
    const res = await call('proxy');
    expect(res.statusCode).toBe(400);
    expect(res.body).toMatchObject({ error: 'MissingUrl' });
  });

  it('proxies json responses', async () => {
    const mockFetch = global.fetch as jest.Mock;
    mockFetch.mockResolvedValue({
      ok: true,
      status: 200,
      headers: {
        get: (name: string) =>
          name === 'content-type' ? 'application/json' : null,
      },
      json: async () => ({ proxied: true }),
    });
    const res = await call('proxy', { url: 'https://example.com/api' });
    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual({ proxied: true });
  });

  it('returns 500 when the proxy target is unreachable', async () => {
    const mockFetch = global.fetch as jest.Mock;
    mockFetch.mockRejectedValue(new Error('ECONNREFUSED'));
    const res = await call('proxy', { url: 'https://example.com/api' });
    expect(res.statusCode).toBe(500);
    expect(res.body).toMatchObject({ error: 'ProxyRequestFailed' });
  });

  it('answers OPTIONS preflight on the proxy route', async () => {
    const res = await callWith('proxy', { method: 'OPTIONS' });
    expect(res.statusCode).toBe(200);
    expect(
      (res.headers as Record<string, string>)['Access-Control-Allow-Origin']
    ).toBe('*');
  });

  it('forwards the response status when the proxy target fails', async () => {
    const mockFetch = global.fetch as jest.Mock;
    mockFetch.mockResolvedValue({
      ok: false,
      status: 404,
      headers: { get: () => null },
    });
    const res = await call('proxy', { url: 'https://example.com/missing' });
    expect(res.statusCode).toBe(404);
    expect(res.body).toMatchObject({ error: 'ProxyResponseNotOk' });
  });

  it('proxies non-JSON responses as text', async () => {
    const mockFetch = global.fetch as jest.Mock;
    mockFetch.mockResolvedValue({
      ok: true,
      status: 200,
      headers: { get: () => 'text/plain' },
      text: async () => 'hello world',
    });
    const res = await call('proxy', { url: 'https://example.com/plain' });
    expect(res.statusCode).toBe(200);
    expect(res.body).toBe('hello world');
  });

  it('returns 500 when the proxy JSON body cannot be parsed', async () => {
    const mockFetch = global.fetch as jest.Mock;
    mockFetch.mockResolvedValue({
      ok: true,
      status: 200,
      headers: {
        get: (name: string) =>
          name === 'content-type' ? 'application/json' : null,
      },
      json: async () => {
        throw new Error('invalid json');
      },
    });
    const res = await call('proxy', { url: 'https://example.com/bad-json' });
    expect(res.statusCode).toBe(500);
    expect(res.body).toMatchObject({ error: 'JsonParseFailed' });
  });

  it('returns 500 when the proxy text body cannot be read', async () => {
    const mockFetch = global.fetch as jest.Mock;
    mockFetch.mockResolvedValue({
      ok: true,
      status: 200,
      headers: { get: () => 'text/plain' },
      text: async () => {
        throw new Error('read failed');
      },
    });
    const res = await call('proxy', { url: 'https://example.com/bad-text' });
    expect(res.statusCode).toBe(500);
    expect(res.body).toMatchObject({ error: 'TextReadFailed' });
  });

  it('proxies a POST request with a raw string body', async () => {
    const mockFetch = global.fetch as jest.Mock;
    mockFetch.mockResolvedValue({
      ok: true,
      status: 200,
      headers: { get: () => 'application/json' },
      json: async () => ({ proxied: 'post' }),
    });
    const res = await callWith('proxy', {
      method: 'POST',
      query: { url: 'https://example.com/post', method: 'POST' },
      body: '{"hello":1}',
    });
    expect(res.statusCode).toBe(200);
    expect(mockFetch).toHaveBeenCalledWith(
      'https://example.com/post',
      expect.objectContaining({ method: 'POST', body: '{"hello":1}' })
    );
  });

  it('proxies a POST request with a serialized body', async () => {
    const mockFetch = global.fetch as jest.Mock;
    mockFetch.mockResolvedValue({
      ok: true,
      status: 200,
      headers: { get: () => 'application/json' },
      json: async () => ({ proxied: 'post' }),
    });
    const res = await callWith('proxy', {
      method: 'POST',
      query: { url: 'https://example.com/post', method: 'POST' },
      body: { hello: 1 },
    });
    expect(res.statusCode).toBe(200);
    expect(mockFetch).toHaveBeenCalledWith(
      'https://example.com/post',
      expect.objectContaining({ body: '{"hello":1}' })
    );
  });

  it('ignores a body that cannot be serialized', async () => {
    const mockFetch = global.fetch as jest.Mock;
    mockFetch.mockResolvedValue({
      ok: true,
      status: 200,
      headers: { get: () => 'application/json' },
      json: async () => ({ proxied: 'post' }),
    });
    const circular: Record<string, unknown> = {};
    circular.self = circular;
    const res = await callWith('proxy', {
      method: 'POST',
      query: { url: 'https://example.com/post', method: 'POST' },
      body: circular,
    });
    expect(res.statusCode).toBe(200);
    expect(mockFetch).toHaveBeenCalledWith(
      'https://example.com/post',
      expect.objectContaining({ body: undefined })
    );
  });

  it('defaults the method to GET when none is provided', async () => {
    const mockFetch = global.fetch as jest.Mock;
    mockFetch.mockResolvedValue({
      ok: true,
      status: 200,
      headers: { get: () => null },
      text: async () => 'ok',
    });
    const res = await callWith('proxy', {
      query: { url: 'https://example.com/plain' },
      method: undefined,
    });
    expect(res.statusCode).toBe(200);
    expect(mockFetch).toHaveBeenCalledWith(
      'https://example.com/plain',
      expect.objectContaining({ method: 'GET' })
    );
  });

  it('falls back to plain text when the target omits content-type', async () => {
    const mockFetch = global.fetch as jest.Mock;
    mockFetch.mockResolvedValue({
      ok: true,
      status: 200,
      headers: { get: () => null },
      text: async () => 'ok',
    });
    const res = await call('proxy', { url: 'https://example.com/plain' });
    expect(res.statusCode).toBe(200);
    expect(res.body).toBe('ok');
    expect((res.headers as Record<string, string>)['Content-Type']).toBe(
      'text/plain'
    );
  });

  it('falls back to the development environment when unset', async () => {
    const saved = process.env.NODE_ENV;
    delete (process.env as Record<string, string | undefined>).NODE_ENV;
    try {
      const res = await call('status');
      expect(res.body).toMatchObject({ environment: 'development' });
    } finally {
      (process.env as { NODE_ENV?: string }).NODE_ENV = saved;
    }
  });
});

describe('pages/api/rest/[endpoint]', () => {
  it('forwards to the matching handler', async () => {
    const { default: endpointHandler } =
      await import('@/pages/api/rest/[endpoint]');
    const req = { query: { endpoint: 'health' } } as unknown as NextApiRequest;
    const res = createRes();
    await endpointHandler(req, res);
    expect(res.statusCode).toBe(200);
    expect(res.body).toMatchObject({ status: 'ok' });
  });

  it('returns 404 for unknown endpoints', async () => {
    const { default: endpointHandler } =
      await import('@/pages/api/rest/[endpoint]');
    const req = { query: { endpoint: 'nope' } } as unknown as NextApiRequest;
    const res = createRes();
    await endpointHandler(req, res);
    expect(res.statusCode).toBe(404);
    expect(res.body).toEqual({ error: "Unknown endpoint 'nope'" });
  });
});
