import type { MetadataRoute } from 'next';

export const dynamic = 'force-static';

const robots = (): MetadataRoute.Robots => ({
  rules: [
    {
      userAgent: '*',
      allow: '/',
    },
  ],
  sitemap: 'https://hieudoanm.github.io/free/8-bit/sitemap.xml',
});

export default robots;
