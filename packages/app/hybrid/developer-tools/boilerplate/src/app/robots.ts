import type { MetadataRoute } from 'next';

export const dynamic = 'force-static';

const robots = (): MetadataRoute.Robots => ({
  rules: [
    {
      userAgent: '*',
      allow: '/',
    },
  ],
  sitemap: 'https://hieudoanm.github.io/free/boilerplate/sitemap.xml',
});

export default robots;
