import { buildVersion } from './version';

export const about = {
  name: 'Football Manager',
  description: 'Pick a formation, assign your squad, and manage your team',
  version: buildVersion,
  items: [
    { label: 'Language', value: 'TypeScript' },
    { label: 'Framework', value: 'Next.js 16' },
    { label: 'Router', value: 'App Router' },
    { label: 'Styling', value: 'Tailwind CSS 4' },
    { label: 'Components', value: 'DaisyUI 5' },
    { label: 'Icons', value: 'React Icons' },
    { label: 'Desktop', value: 'Tauri 2' },
  ],
};
