import { AboutTemplate } from '@/components/templates/AboutTemplate';
import { NextPage } from 'next';

const AboutPage: NextPage = () => (
  <AboutTemplate
    appName="History"
    name="History"
    description="Timeline-based history games and tools"
    version="v0.0.1"
    items={[
      { label: 'Framework', value: 'Next.js 16' },
      { label: 'Language', value: 'TypeScript' },
      { label: 'Styling', value: 'Tailwind CSS 4 + DaisyUI 5' },
      { label: 'Tools', value: 'Through the Years' },
      { label: 'Desktop', value: 'Tauri 2' },
    ]}
  />
);

export default AboutPage;
