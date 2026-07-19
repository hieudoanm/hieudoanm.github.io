import { buildVersion } from './version';

export const about = {
  name: 'Chess',
  description: 'A minimal chess toolbox',
  version: buildVersion,
  items: [
    { label: 'Framework', value: 'Next.js 16' },
    { label: 'Language', value: 'TypeScript 6' },
    { label: 'Styling', value: 'Tailwind CSS 4 + DaisyUI 5' },
    { label: 'Engine', value: 'Stockfish' },
    { label: 'Desktop', value: 'Tauri 2' },
  ],
};
