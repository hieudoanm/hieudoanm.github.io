import { buildVersion } from './version';

export const about = {
  name: 'MRI',
  description: 'An MRI research workspace and orchestration layer',
  version: buildVersion,
  items: [
    { label: 'Framework', value: 'Next.js 16' },
    { label: 'Language', value: 'TypeScript 6' },
    { label: 'Styling', value: 'Tailwind CSS 4 + DaisyUI 5' },
    { label: 'Desktop', value: 'Tauri 2' },
    { label: 'Imaging engine', value: 'Rust (DICOM / NIfTI)' },
  ],
};
