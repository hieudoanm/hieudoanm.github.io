'use client';

import { AboutTemplate } from '@/components/templates/AboutTemplate';
import { NextPage } from 'next';

const AboutPage: NextPage = () => (
  <AboutTemplate
    name="Projects"
    description="Project management board"
    version="v0.0.1"
    items={[
      { label: 'Framework', value: 'Next.js 16' },
      { label: 'Language', value: 'TypeScript 6' },
      { label: 'Styling', value: 'Tailwind CSS 4 + DaisyUI 5' },
      { label: 'Views', value: 'Kanban, List, Calendar, Timeline' },
    ]}
  />
);

export default AboutPage;
