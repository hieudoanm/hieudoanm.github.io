jest.mock('@trpc/client', () => ({
  createTRPCClient: jest.fn(() => 'client'),
  httpBatchLink: jest.fn((opts: unknown) => opts),
}));

jest.mock('@trpc/next', () => ({
  createTRPCNext: jest.fn(() => 'hook'),
}));

const loadTrpc = () => {
  const { httpBatchLink, createTRPCClient } = jest.requireMock('@trpc/client');
  const { createTRPCNext } = jest.requireMock('@trpc/next');
  httpBatchLink.mockClear();
  createTRPCClient.mockClear();
  createTRPCNext.mockClear();
  jest.isolateModules(() => {
    require('@/utils/trpc');
  });
  return { httpBatchLink, createTRPCClient, createTRPCNext };
};

describe('trpc (browser)', () => {
  it('uses an empty base url when window is defined', () => {
    loadTrpc();
    const { httpBatchLink } = jest.requireMock('@trpc/client');
    expect(httpBatchLink).toHaveBeenCalledWith(
      expect.objectContaining({ url: '/api/trpc' })
    );
  });

  it('headers returns an empty object', async () => {
    loadTrpc();
    const { httpBatchLink } = jest.requireMock('@trpc/client');
    const { headers } = httpBatchLink.mock.calls[0][0];
    await expect(headers()).resolves.toEqual({});
  });

  it('builds the trpc client and hook with the link', () => {
    const { createTRPCClient, createTRPCNext } = loadTrpc();
    expect(createTRPCClient).toHaveBeenCalledWith({
      links: [expect.any(Object)],
    });
    expect(createTRPCNext).toHaveBeenCalledWith(
      expect.objectContaining({ ssr: false })
    );
    const { config } = createTRPCNext.mock.calls[0][0];
    expect(config()).toEqual({ links: [expect.any(Object)] });
  });
});
