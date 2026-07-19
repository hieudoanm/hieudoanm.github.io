import { buildVersion } from './version';

export const about = {
  name: 'History',
  description: 'Timeline-based history games and tools',
  version: buildVersion,
  items: [
    { label: 'Framework', value: 'Next.js 16' },
    { label: 'Language', value: 'TypeScript' },
    { label: 'Styling', value: 'Tailwind CSS 4 + DaisyUI 5' },
    { label: 'Tools', value: 'Through the Years' },
    { label: 'Desktop', value: 'Tauri 2' },
  ],
};
