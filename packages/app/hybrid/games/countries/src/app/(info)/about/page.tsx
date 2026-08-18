'use client';

import { AboutTemplate } from '@/components/templates/AboutTemplate';
import { NextPage } from 'next';

const AboutPage: NextPage = () => (
  <AboutTemplate
    name="Countries"
    description="Geography word games — Wordle and Connections with country answers"
    version="v0.0.1"
    items={[
      { label: 'Framework', value: 'Next.js 16' },
      { label: 'Language', value: 'TypeScript 6' },
      { label: 'Styling', value: 'Tailwind CSS 4 + DaisyUI 5' },
      { label: 'Games', value: '2 word games' },
      { label: 'Desktop', value: 'Tauri 2' },
    ]}
  />
);

export default AboutPage;
