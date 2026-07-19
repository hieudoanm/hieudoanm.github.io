import robots from '../robots';

describe('robots', () => {
  it('returns allow-all rules for every user agent', () => {
    const result = robots();
    expect(result.rules).toEqual([{ userAgent: '*', allow: '/' }]);
  });

  it('points sitemap at the github.io colors sitemap', () => {
    const result = robots();
    expect(result.sitemap).toBe(
      'https://hieudoanm.github.io/free/colors/sitemap.xml'
    );
  });
});
