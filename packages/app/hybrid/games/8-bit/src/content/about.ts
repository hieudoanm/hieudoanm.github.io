import { buildVersion } from './version';

export const about = {
  name: '8-Bit Games',
  description:
    'Four classic 8-bit arcade games: Maze, Snake, DinoRun, and Rock Paper Scissors',
  version: buildVersion,
  items: [
    { label: 'Language', value: 'TypeScript 6.+' },
    { label: 'Framework', value: 'Next.js 16.+' },
    { label: 'Styling', value: 'Tailwind CSS 4.+' },
    { label: 'Components', value: 'DaisyUI 5.+' },
    { label: 'Desktop', value: 'Tauri 2.+' },
  ],
};
