import { buildVersion } from './version';

export const about = {
  name: 'Brainbow',
  description: 'Microscopy image viewer and annotator',
  version: buildVersion,
  items: [
    { label: 'Framework', value: 'Next.js 16' },
    { label: 'Language', value: 'TypeScript 6' },
    { label: 'Styling', value: 'Tailwind CSS 4 + DaisyUI 5' },
    { label: 'Canvas', value: 'HTML5 Canvas' },
    { label: 'Desktop', value: 'Tauri 2' },
  ],
};
