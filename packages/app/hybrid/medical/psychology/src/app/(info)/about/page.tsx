import { AboutTemplate } from '@/components/templates/AboutTemplate';
import { NextPage } from 'next';

const AboutPage: NextPage = () => (
  <AboutTemplate
    appName="Psychology"
    name="Psychology"
    description="Validated psychological self-report scales"
    version="v0.0.1"
    items={[
      { label: 'Framework', value: 'Next.js 16' },
      { label: 'Language', value: 'TypeScript 6' },
      { label: 'Styling', value: 'Tailwind CSS 4 + DaisyUI 5' },
      {
        label: 'Scales',
        value: 'BDI · BFI · DAS · ECR · GAD-7 · PHQ-9 · RCI · SWLS',
      },
      { label: 'Desktop', value: 'Tauri 2' },
    ]}
  />
);

export default AboutPage;
