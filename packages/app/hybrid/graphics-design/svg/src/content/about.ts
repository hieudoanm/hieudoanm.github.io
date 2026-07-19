import { buildVersion } from './version';

export const about = {
  name: 'SVG',
  description: 'SVG editor and generator',
  version: buildVersion,
  items: [
    { label: 'Framework', value: 'Next.js 16' },
    { label: 'Language', value: 'TypeScript 6' },
    { label: 'Styling', value: 'Tailwind CSS 4 + DaisyUI 5' },
    { label: 'Format', value: 'SVG' },
  ],
};
