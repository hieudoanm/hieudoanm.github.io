import { buildVersion } from './version';

export const about = {
  name: 'Colors',
  description: 'Interactive tools for picking and shipping color',
  version: buildVersion,
  items: [
    { label: 'Framework', value: 'Next.js 16' },
    { label: 'Language', value: 'TypeScript' },
    { label: 'Styling', value: 'Tailwind CSS 4 + DaisyUI 5' },
    { label: 'Tools', value: '16 color utilities' },
    { label: 'Desktop', value: 'Tauri 2' },
  ],
};
