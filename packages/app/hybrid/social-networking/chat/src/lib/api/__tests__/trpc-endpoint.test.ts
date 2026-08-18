import handler from '@/pages/api/trpc/[trpc]';

jest.mock('@trpc/server/adapters/next', () => ({
  createNextApiHandler: jest.fn(() => jest.fn()),
}));

jest.mock('@/server/trpc/routers/_app', () => ({
  appRouter: { _mock: true },
}));

const { createNextApiHandler } = jest.requireMock('@trpc/server/adapters/next');
const { appRouter } = jest.requireMock('@/server/trpc/routers/_app');

describe('[trpc].ts', () => {
  it('creates a Next API handler with the app router', () => {
    const returned = createNextApiHandler.mock.results[0].value;
    expect(handler).toBe(returned);
    expect(createNextApiHandler).toHaveBeenCalledWith({
      router: appRouter,
      createContext: expect.any(Function),
    });
    createNextApiHandler.mock.calls[0][0].createContext();
  });
});
