import { proxy } from '../proxy';

const makeRes = () => {
  const res: any = {
    statusCode: 0,
    status: jest.fn(),
    json: jest.fn(),
    send: jest.fn(),
    end: jest.fn(),
    setHeader: jest.fn(),
  };
  res.status.mockImplementation((code: number) => {
    res.statusCode = code;
    return res;
  });
  return res;
};

const makeReq = (overrides: any = {}) => ({
  method: 'GET',
  query: {},
  body: undefined,
  ...overrides,
});

const jsonResponse = (body: unknown, ok = true, status = 200) => ({
  ok,
  status,
  headers: { get: jest.fn(() => 'application/json') },
  json: jest.fn().mockResolvedValue(body),
  text: jest.fn(),
});

describe('proxy handler', () => {
  const originalFetch = global.fetch;

  afterEach(() => {
    global.fetch = originalFetch;
  });

  it('answers OPTIONS with CORS headers', () => {
    const req = makeReq({ method: 'OPTIONS' });
    const res = makeRes();
    proxy.handler(req, res);
    expect(res.statusCode).toBe(200);
    expect(res.setHeader).toHaveBeenCalledWith(
      'Access-Control-Allow-Origin',
      '*'
    );
    expect(res.end).toHaveBeenCalled();
  });

  it('returns 400 when url is missing', () => {
    const req = makeReq({ query: {} });
    const res = makeRes();
    proxy.handler(req, res);
    expect(res.statusCode).toBe(400);
    expect(res.json.mock.calls[0][0]).toEqual(
      expect.objectContaining({ error: 'MissingUrl' })
    );
  });

  it('proxies a JSON response', async () => {
    global.fetch = jest.fn().mockResolvedValue(jsonResponse({ ok: true }));
    const req = makeReq({ query: { url: 'https://example.com/api' } });
    const res = makeRes();
    await proxy.handler(req, res);
    expect(global.fetch).toHaveBeenCalledWith('https://example.com/api', {
      method: 'GET',
      body: undefined,
    });
    expect(res.statusCode).toBe(200);
    expect(res.json.mock.calls[0][0]).toEqual({ ok: true });
  });

  it('proxies a text response', async () => {
    global.fetch = jest.fn().mockResolvedValue({
      ok: true,
      status: 200,
      headers: { get: jest.fn(() => 'text/plain') },
      json: jest.fn(),
      text: jest.fn().mockResolvedValue('plain text'),
    });
    const req = makeReq({ query: { url: 'https://example.com/raw' } });
    const res = makeRes();
    await proxy.handler(req, res);
    expect(res.statusCode).toBe(200);
    expect(res.send).toHaveBeenCalledWith('plain text');
    expect(res.setHeader).toHaveBeenCalledWith('Content-Type', 'text/plain');
  });

  it('passes a string body for non-GET methods', async () => {
    global.fetch = jest.fn().mockResolvedValue(jsonResponse({}));
    const req = makeReq({
      method: 'POST',
      query: { url: 'https://example.com', method: 'POST' },
      body: '{"a":1}',
    });
    const res = makeRes();
    await proxy.handler(req, res);
    expect(global.fetch).toHaveBeenCalledWith('https://example.com', {
      method: 'POST',
      body: '{"a":1}',
    });
  });

  it('serializes a non-string body for non-GET methods', async () => {
    global.fetch = jest.fn().mockResolvedValue(jsonResponse({}));
    const req = makeReq({
      method: 'POST',
      query: { url: 'https://example.com' },
      body: { a: 1 },
    });
    const res = makeRes();
    await proxy.handler(req, res);
    expect(global.fetch).toHaveBeenCalledWith('https://example.com', {
      method: 'POST',
      body: '{"a":1}',
    });
  });

  it('returns 500 when the fetch fails', async () => {
    global.fetch = jest.fn().mockRejectedValue(new Error('network down'));
    const req = makeReq({ query: { url: 'https://example.com' } });
    const res = makeRes();
    await proxy.handler(req, res);
    expect(res.statusCode).toBe(500);
    expect(res.json.mock.calls[0][0]).toEqual(
      expect.objectContaining({ error: 'ProxyRequestFailed' })
    );
  });

  it('returns the target status when the response is not ok', async () => {
    global.fetch = jest.fn().mockResolvedValue(jsonResponse({}, false, 502));
    const req = makeReq({ query: { url: 'https://example.com' } });
    const res = makeRes();
    await proxy.handler(req, res);
    expect(res.statusCode).toBe(502);
    expect(res.json.mock.calls[0][0]).toEqual(
      expect.objectContaining({ error: 'ProxyResponseNotOk' })
    );
  });

  it('returns 500 when JSON parsing fails', async () => {
    global.fetch = jest.fn().mockResolvedValue({
      ok: true,
      status: 200,
      headers: { get: jest.fn(() => 'application/json') },
      json: jest.fn().mockRejectedValue(new Error('bad json')),
      text: jest.fn(),
    });
    const req = makeReq({ query: { url: 'https://example.com' } });
    const res = makeRes();
    await proxy.handler(req, res);
    expect(res.statusCode).toBe(500);
    expect(res.json.mock.calls[0][0]).toEqual(
      expect.objectContaining({ error: 'JsonParseFailed' })
    );
  });

  it('returns 500 when reading text fails', async () => {
    global.fetch = jest.fn().mockResolvedValue({
      ok: true,
      status: 200,
      headers: { get: jest.fn(() => 'text/plain') },
      json: jest.fn(),
      text: jest.fn().mockRejectedValue(new Error('read failed')),
    });
    const req = makeReq({ query: { url: 'https://example.com' } });
    const res = makeRes();
    await proxy.handler(req, res);
    expect(res.statusCode).toBe(500);
    expect(res.json.mock.calls[0][0]).toEqual(
      expect.objectContaining({ error: 'TextReadFailed' })
    );
  });
});
