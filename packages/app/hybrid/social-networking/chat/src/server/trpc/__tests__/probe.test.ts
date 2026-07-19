import { procedure, router } from '../trpc';

describe('trpc', () => {
  it('exposes a router builder', () => {
    expect(router).toBeDefined();
    expect(router({})).toBeDefined();
  });

  it('exposes a procedure builder', () => {
    expect(procedure).toBeDefined();
  });
});
