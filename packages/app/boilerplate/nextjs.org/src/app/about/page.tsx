'use client';

import { AboutTemplate } from '@/components/templates/AboutTemplate';
import { NextPage } from 'next';

const AboutPage: NextPage = () => (
  <AboutTemplate
    name="Boilerplate"
    description="Next.js boilerplate with App Router, TypeScript, Tailwind CSS, and DaisyUI"
    version="v0.0.1"
    items={[
      { label: 'Framework', value: 'Next.js 16' },
      { label: 'Language', value: 'TypeScript 6' },
      { label: 'Styling', value: 'Tailwind CSS 4 + DaisyUI 5' },
      { label: 'Desktop', value: 'Tauri 2' },
      { label: 'Router', value: 'App Router' },
    ]}
  />
);

export default AboutPage;
