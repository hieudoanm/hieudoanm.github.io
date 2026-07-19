import { buildVersion } from './version';

export const about = {
  name: 'Foody',
  description: 'Interactive food randomizer and foody tools',
  version: buildVersion,
  items: [
    { label: 'Framework', value: 'Next.js 16' },
    { label: 'Language', value: 'TypeScript' },
    { label: 'Styling', value: 'Tailwind CSS 4 + DaisyUI 5' },
    { label: 'Tools', value: 'Randomizer' },
    { label: 'Desktop', value: 'Tauri 2' },
  ],
};
