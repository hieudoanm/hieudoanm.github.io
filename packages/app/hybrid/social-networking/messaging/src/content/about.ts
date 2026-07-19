import { buildVersion } from './version';

export const about = {
  name: 'Messaging',
  description:
    'Real-time messaging application with chat, threads, and media sharing.',
  version: buildVersion,
  items: [
    { label: 'Framework', value: 'Next.js 16' },
    { label: 'Language', value: 'TypeScript 6' },
    { label: 'Styling', value: 'Tailwind CSS 4 + DaisyUI 5' },
  ],
};
