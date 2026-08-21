import { AboutTemplate } from '@/components/templates/AboutTemplate';
import { NextPage } from 'next';

const AboutPage: NextPage = () => (
  <AboutTemplate
    name="MRI"
    description="An MRI research workspace and orchestration layer"
    version="v0.0.1"
    items={[
      { label: 'Framework', value: 'Next.js 16' },
      { label: 'Language', value: 'TypeScript 6' },
      { label: 'Styling', value: 'Tailwind CSS 4 + DaisyUI 5' },
      { label: 'Desktop', value: 'Tauri 2' },
      { label: 'Imaging engine', value: 'Rust (DICOM / NIfTI)' },
    ]}
  />
);

export default AboutPage;
