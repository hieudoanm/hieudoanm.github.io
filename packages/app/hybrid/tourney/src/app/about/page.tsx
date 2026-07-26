'use client';

import type { NextPage } from 'next';
import { AboutTemplate } from '@/components/templates/AboutTemplate';

const AboutPage: NextPage = () => (
  <AboutTemplate
    name="Tourney"
    description="Tournament management app for creating and tracking competitions"
    version="v0.0.1"
    items={[
      { label: 'Framework', value: 'Next.js 16' },
      { label: 'Language', value: 'TypeScript 6' },
      { label: 'Styling', value: 'Tailwind CSS 4 + DaisyUI 5' },
      { label: 'Formats', value: '6 tournament formats' },
    ]}
  />
);

export default AboutPage;
