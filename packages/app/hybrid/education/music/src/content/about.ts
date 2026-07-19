import { buildVersion } from './version';

export const about = {
  name: 'Music',
  description: 'Ear-training games and music tools',
  version: buildVersion,
  items: [
    { label: 'Framework', value: 'Next.js 16' },
    { label: 'Language', value: 'TypeScript' },
    { label: 'Styling', value: 'Tailwind CSS 4 + DaisyUI 5' },
    { label: 'Tools', value: 'Pitch' },
    { label: 'Desktop', value: 'Tauri 2' },
  ],
};
