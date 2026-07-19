import { buildVersion } from './version';

export const about = {
  name: 'Nikoli',
  description: 'Seven classic logic puzzle games from Nikoli publishers',
  version: buildVersion,
  items: [
    { label: 'Framework', value: 'Next.js 16' },
    { label: 'Language', value: 'TypeScript 6' },
    { label: 'Styling', value: 'Tailwind CSS 4 + DaisyUI 5' },
    { label: 'Games', value: '7 puzzle games' },
    { label: 'Desktop', value: 'Tauri 2' },
  ],
};
