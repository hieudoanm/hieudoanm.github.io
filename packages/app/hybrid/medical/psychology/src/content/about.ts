import { buildVersion } from './version';

export const about = {
  name: 'Psychology',
  description: 'Validated psychological self-report scales',
  version: buildVersion,
  items: [
    { label: 'Framework', value: 'Next.js 16' },
    { label: 'Language', value: 'TypeScript 6' },
    { label: 'Styling', value: 'Tailwind CSS 4 + DaisyUI 5' },
    {
      label: 'Scales',
      value: 'BDI · BFI · DAS · ECR · GAD-7 · PHQ-9 · RCI · SWLS',
    },
    { label: 'Desktop', value: 'Tauri 2' },
  ],
};
