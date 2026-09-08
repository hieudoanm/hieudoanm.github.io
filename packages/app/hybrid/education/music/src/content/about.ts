import { buildVersion } from './version';

const items = [
  { label: 'Language', value: 'TypeScript 6.+' },
  { label: 'Framework', value: 'Next.js 16.+' },
  { label: 'Styling', value: 'Tailwind CSS 4.+' },
  { label: 'Components', value: 'DaisyUI 5.+' },
  { label: 'Desktop', value: 'Tauri 2.+' },
];

export const about = {
  name: 'Music',
  description: 'Ear-training games and music tools',
  version: buildVersion,
  items,
};
