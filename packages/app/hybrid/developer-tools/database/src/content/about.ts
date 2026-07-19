import { buildVersion } from './version';

export const about = {
  name: 'Database',
  description: 'SQLite database manager',
  version: buildVersion,
  items: [
    { label: 'Framework', value: 'Next.js 16' },
    { label: 'Language', value: 'TypeScript 6' },
    { label: 'Styling', value: 'Tailwind CSS 4 + DaisyUI 5' },
    { label: 'Database', value: 'SQLite' },
  ],
};
