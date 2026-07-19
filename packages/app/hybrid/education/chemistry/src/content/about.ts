import { buildVersion } from './version';

export const about = {
  name: 'Chemistry',
  description: 'Interactive periodic table and chemistry tools',
  version: buildVersion,
  items: [
    { label: 'Framework', value: 'Next.js 16' },
    { label: 'Language', value: 'TypeScript' },
    { label: 'Styling', value: 'Tailwind CSS 4 + DaisyUI 5' },
    { label: 'Tools', value: 'Periodic Table' },
    { label: 'Desktop', value: 'Tauri 2' },
  ],
};
