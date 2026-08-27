import Robots from '../robots';

describe('robots', () => {
  it('returns robots config', () => {
    const result = Robots();
    expect(result).toBeDefined();
    expect(result.rules).toBeDefined();
    expect(Array.isArray(result.rules)).toBe(true);
  });

  it('has allow rule', () => {
    const result = Robots();
    const rules = result.rules as Array<{ userAgent: string; allow: string }>;
    expect(rules[0]).toEqual({
      userAgent: '*',
      allow: '/',
    });
  });

  it('has sitemap', () => {
    const result = Robots();
    expect(result.sitemap).toBeTruthy();
  });
});
