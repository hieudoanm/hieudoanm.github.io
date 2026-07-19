import { buildVersion } from './version';

export const about = {
  name: 'POS',
  description: 'Minimal point of sale client',
  version: buildVersion,
  items: [
    { label: 'Framework', value: 'Next.js 16' },
    { label: 'Language', value: 'TypeScript 6' },
    { label: 'Styling', value: 'Tailwind CSS 4 + DaisyUI 5' },
    { label: 'Desktop', value: 'Tauri 2' },
  ],
};
