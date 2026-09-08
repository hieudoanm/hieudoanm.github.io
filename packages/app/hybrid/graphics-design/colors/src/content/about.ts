import { buildVersion } from './version';

export const about = {
  name: 'Colors',
  description: 'Interactive tools for picking and shipping color',
  version: buildVersion,
  items: [
    { label: 'Language', value: 'TypeScript 6.+' },
    { label: 'Framework', value: 'Next.js 16.+' },
    { label: 'Styling', value: 'Tailwind CSS 4.+' },
    { label: 'Components', value: 'DaisyUI 5.+' },
    { label: 'Desktop', value: 'Tauri 2.+' },
  ],
};
