import { buildVersion } from './version';

export const about = {
  name: 'Clock',
  description:
    'A collection of time-related utilities: Pomodoro timer, watchface display, world clock, countdown timer, and stopwatch.',
  version: buildVersion,
  items: [
    { label: 'Framework', value: 'Next.js 16' },
    { label: 'Language', value: 'TypeScript 6' },
    { label: 'Styling', value: 'Tailwind CSS 4 + DaisyUI 5' },
  ],
};
