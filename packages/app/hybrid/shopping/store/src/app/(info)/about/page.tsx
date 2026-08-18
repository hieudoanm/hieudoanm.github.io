'use client';

import { AboutTemplate } from '@/components/templates/AboutTemplate';
import type { NextPage } from 'next';

const AboutPage: NextPage = () => (
  <AboutTemplate
    name="Store"
    description="Browse and download apps across all platforms"
    version="v0.0.1"
    items={[
      { label: 'Framework', value: 'Next.js 16' },
      { label: 'Language', value: 'TypeScript 6' },
      { label: 'Styling', value: 'Tailwind CSS 4 + DaisyUI 5' },
      { label: 'Theme', value: 'Nothing' },
      { label: 'Apps', value: '44 total (37 hybrid + 6 native + 1 extension)' },
      { label: 'Desktop', value: 'Tauri 2' },
    ]}
  />
);

export default AboutPage;
