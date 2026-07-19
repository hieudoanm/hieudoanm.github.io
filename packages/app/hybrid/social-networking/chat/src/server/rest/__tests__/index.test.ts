import { getHandler, getRoutes } from '../index';

describe('server/rest index', () => {
  it('exposes handlers for known endpoints', () => {
    expect(getHandler('docs')).toBeDefined();
    expect(getHandler('health')).toBeDefined();
    expect(getHandler('info')).toBeDefined();
    expect(getHandler('status')).toBeDefined();
    expect(getHandler('version')).toBeDefined();
    expect(getHandler('proxy')).toBeDefined();
  });

  it('returns undefined for unknown endpoints', () => {
    expect(getHandler('nope')).toBeUndefined();
  });

  it('lists the registered routes with paths', () => {
    const routes = getRoutes();
    expect(routes).toHaveLength(6);
    expect(routes.map((r) => r.path)).toEqual([
      '/api/rest/docs',
      '/api/rest/health',
      '/api/rest/info',
      '/api/rest/status',
      '/api/rest/version',
      '/api/rest/proxy',
    ]);
  });
});
