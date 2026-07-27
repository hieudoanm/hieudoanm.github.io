import { AboutTemplate } from '@/components/templates/AboutTemplate';
import { NextPage } from 'next';

const AboutPage: NextPage = () => (
  <AboutTemplate
    name="Boilerplate"
    description="Next.js boilerplate with App Router, TypeScript, Tailwind CSS, and DaisyUI"
    version="v0.0.1"
    items={[
      { label: 'Language', value: 'TypeScript 6' },
      { label: 'Framework', value: 'Next.js 16' },
      { label: 'Router', value: 'App Router' },
      { label: 'Styling', value: 'Tailwind CSS 4' },
      { label: 'Components', value: 'DaisyUI 5' },
      { label: 'Icons', value: 'React Icons' },
      { label: 'Desktop', value: 'Tauri 2' },
    ]}
  />
);

export default AboutPage;
