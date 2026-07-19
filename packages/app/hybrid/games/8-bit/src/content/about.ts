import { buildVersion } from './version';

export const about = {
  name: '8-Bit Games',
  description:
    'Four classic 8-bit arcade games: Maze, Snake, DinoRun, and Rock Paper Scissors',
  version: buildVersion,
  items: [
    { label: 'Framework', value: 'Next.js 16' },
    { label: 'Language', value: 'TypeScript 6' },
    { label: 'Styling', value: 'Tailwind CSS 4 + DaisyUI 5' },
    { label: 'Games', value: '4 arcade games' },
    { label: 'Desktop', value: 'Tauri 2' },
  ],
};
