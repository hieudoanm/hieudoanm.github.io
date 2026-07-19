import { buildVersion } from './version';

export const about = {
  name: 'Keynotes',
  description: 'Offline-first, in-browser presentation tool.',
  version: buildVersion,
  items: [
    { label: 'Framework', value: 'Next.js 16' },
    { label: 'Language', value: 'TypeScript 6' },
    { label: 'Styling', value: 'Tailwind CSS 4 + DaisyUI 5' },
  ],
};
