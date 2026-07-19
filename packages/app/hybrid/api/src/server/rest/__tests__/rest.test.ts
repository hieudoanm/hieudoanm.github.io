import { getHandler, getRoutes } from '@/server/rest';
import type { NextApiRequest, NextApiResponse } from 'next';

type MockRes = NextApiResponse & {
  body?: unknown;
  statusCode: number;
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
