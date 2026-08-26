'use client';

import type { NextPage } from 'next';
import { AboutTemplate } from '@/components/templates/AboutTemplate';

const AboutPage: NextPage = () => (
  <AboutTemplate
    name="Memory Games"
    description="Train your brain with memory and cognitive challenges."
    version="0.0.1"
    items={[
      { label: 'Games', value: '4' },
      { label: 'Framework', value: 'Next.js 16' },
      { label: 'Styling', value: 'Tailwind CSS 4 + DaisyUI 5' },
    ]}
  />
);

export default AboutPage;
