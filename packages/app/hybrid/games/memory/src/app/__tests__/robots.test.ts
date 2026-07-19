import robots from '../robots';

describe('robots', () => {
  it('returns correct robots config', () => {
    const result = robots();
    expect(result).toEqual({
      rules: [{ userAgent: '*', allow: '/' }],
      sitemap: 'https://hieudoanm.github.io/free/memory/sitemap.xml',
    });
  });

  it('has force-static export', () => {
    const mod = require('../robots');
    expect(mod.dynamic).toBe('force-static');
  });
});
