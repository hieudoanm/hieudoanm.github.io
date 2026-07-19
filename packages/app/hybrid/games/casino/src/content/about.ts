import { buildVersion } from './version';

export const about = {
  name: 'Casino',
  description: 'Ten casino classics — cards, dice, reels and lucky numbers',
  version: buildVersion,
  items: [
    { label: 'Framework', value: 'Next.js 16' },
    { label: 'Language', value: 'TypeScript 6' },
    { label: 'Styling', value: 'Tailwind CSS 4 + DaisyUI 5' },
    { label: 'Games', value: '10 casino games' },
    { label: 'Desktop', value: 'Tauri 2' },
  ],
};
