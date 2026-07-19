import { buildVersion } from './version';

export const about = {
  name: 'Tax',
  description: 'A Vietnamese tax management app for personal and business',
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
