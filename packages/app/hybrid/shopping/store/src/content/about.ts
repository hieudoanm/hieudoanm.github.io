import { buildVersion } from './version';

export const about = {
  name: 'Store',
  description: 'Browse and download apps across all platforms',
  version: buildVersion,
  items: [
    { label: 'Framework', value: 'Next.js 16' },
    { label: 'Language', value: 'TypeScript 6' },
    { label: 'Styling', value: 'Tailwind CSS 4 + DaisyUI 5' },
    { label: 'Apps', value: '44 total' },
    { label: 'Desktop', value: 'Tauri 2' },
  ],
};
