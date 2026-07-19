import { buildVersion } from './version';

export const about = {
  name: 'Tic-Tac-Toe',
  description: 'Six tic-tac-toe variants — classic, wild, reverse and more',
  version: buildVersion,
  items: [
    { label: 'Framework', value: 'Next.js 16' },
    { label: 'Language', value: 'TypeScript 6' },
    { label: 'Styling', value: 'Tailwind CSS 4 + DaisyUI 5' },
    { label: 'Variants', value: '6 tic-tac-toe games' },
    { label: 'Desktop', value: 'Tauri 2' },
  ],
};
