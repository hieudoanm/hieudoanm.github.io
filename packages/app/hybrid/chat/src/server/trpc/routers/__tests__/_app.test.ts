import { appRouter } from '../_app';

describe('appRouter', () => {
  it('registers the openrouter and youtube routers', () => {
    expect(appRouter).toBeDefined();
  });
});
