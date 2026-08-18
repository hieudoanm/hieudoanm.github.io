/**
 * @jest-environment node
 */

jest.mock('@trpc/client', () => ({
  createTRPCClient: jest.fn(() => 'client'),
  httpBatchLink: jest.fn((opts: unknown) => opts),
}));

jest.mock('@trpc/next', () => ({
  createTRPCNext: jest.fn(() => 'hook'),
}));

const loadUrl = (): string => {
  const { httpBatchLink } = jest.requireMock('@trpc/client');
  httpBatchLink.mockClear();
  jest.isolateModules(() => {
    require('@/utils/trpc');
  });
  return httpBatchLink.mock.calls[0][0].url;
};

describe('trpc (server)', () => {
  const vercelUrl = process.env.VERCEL_URL;
  const renderHost = process.env.RENDER_INTERNAL_HOSTNAME;
  const port = process.env.PORT;

  afterEach(() => {
    if (vercelUrl === undefined) delete process.env.VERCEL_URL;
    else process.env.VERCEL_URL = vercelUrl;
    if (renderHost === undefined) delete process.env.RENDER_INTERNAL_HOSTNAME;
    else process.env.RENDER_INTERNAL_HOSTNAME = renderHost;
    if (port === undefined) delete process.env.PORT;
    else process.env.PORT = port;
  });

  it('uses the VERCEL_URL on the server', () => {
    process.env.VERCEL_URL = 'app.example.com';
    expect(loadUrl()).toBe('https://app.example.com/api/trpc');
  });

  it('uses the render host and port on the server', () => {
    process.env.RENDER_INTERNAL_HOSTNAME = 'render';
    process.env.PORT = '8080';
    expect(loadUrl()).toBe('http://render:8080/api/trpc');
  });

  it('falls back to localhost with a custom port', () => {
    process.env.PORT = '4567';
    expect(loadUrl()).toBe('http://localhost:4567/api/trpc');
  });

  it('falls back to localhost port 3000', () => {
    expect(loadUrl()).toBe('http://localhost:3000/api/trpc');
  });
});
