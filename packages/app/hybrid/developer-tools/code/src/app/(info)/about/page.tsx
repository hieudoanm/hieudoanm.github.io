'use client';

import { AboutTemplate } from '../../../components/templates/AboutTemplate';
import { NextPage } from 'next';

const AboutPage: NextPage = () => (
  <AboutTemplate
    name="Code"
    description="Web-based code editor"
    version="v0.0.1"
    items={[
      { label: 'Framework', value: 'Next.js 16' },
      { label: 'Language', value: 'TypeScript 6' },
      { label: 'Styling', value: 'Tailwind CSS 4 + DaisyUI 5' },
      { label: 'Editor', value: 'CodeMirror 6' },
    ]}
  />
);

export default AboutPage;
