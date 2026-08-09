'use client';

import { NextPage } from 'next';
import { AboutTemplate } from '../../components/templates/AboutTemplate';

const AboutPage: NextPage = () => (
  <AboutTemplate
    name="Free Resume Builder"
    description="Build a professional resume with 32 free templates and export it as PDF."
    version="v0.0.1"
    items={[
      { label: 'Framework', value: 'Next.js 16' },
      { label: 'Language', value: 'TypeScript 6' },
      { label: 'Styling', value: 'Tailwind CSS 4 + DaisyUI 5' },
      { label: 'Templates', value: '32 Free Templates' },
      { label: 'Paper sizes', value: 'A3 · A4 · A5 · A6 · B5' },
    ]}
  />
);

export default AboutPage;
