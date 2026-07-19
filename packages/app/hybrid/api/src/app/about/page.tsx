import { AboutTemplate } from '@/components/templates/AboutTemplate';

const AboutPage = () => (
  <AboutTemplate
    name="API Client"
    description="Minimal API client"
    version="v0.0.1"
    items={[
      { label: 'Framework', value: 'Next.js 16' },
      { label: 'Language', value: 'TypeScript 6' },
      { label: 'Styling', value: 'Tailwind CSS 4 + DaisyUI 5' },
      { label: 'Requests', value: 'Client-side fetch' },
    ]}
  />
);

export default AboutPage;
