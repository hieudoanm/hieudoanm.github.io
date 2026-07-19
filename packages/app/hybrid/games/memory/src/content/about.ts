import { buildVersion } from './version';

export const about = {
  name: 'Memory Games',
  description: 'Train your brain with memory and cognitive challenges.',
  version: buildVersion,
  items: [
    { label: 'Framework', value: 'Next.js 16' },
    { label: 'Language', value: 'TypeScript 6' },
    { label: 'Styling', value: 'Tailwind CSS 4 + DaisyUI 5' },
    { label: 'Games', value: '4' },
  ],
};
