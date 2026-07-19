import { buildVersion } from './version';

export const about = {
  name: 'Countries',
  description:
    'Geography word games — Wordle and Connections with country answers',
  version: buildVersion,
  items: [
    { label: 'Framework', value: 'Next.js 16' },
    { label: 'Language', value: 'TypeScript 6' },
    { label: 'Styling', value: 'Tailwind CSS 4 + DaisyUI 5' },
    { label: 'Games', value: '2 word games' },
    { label: 'Desktop', value: 'Tauri 2' },
  ],
};
