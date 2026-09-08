import { buildVersion } from './version';

export const about = {
  name: 'Code',
  description: 'Web-based code editor',
  version: buildVersion,
  items: [
    { label: 'Language', value: 'TypeScript 6.+' },
    { label: 'Framework', value: 'Next.js 16.+' },
    { label: 'Styling', value: 'Tailwind CSS 4.+' },
    { label: 'Components', value: 'DaisyUI 5.+' },
    { label: 'Desktop', value: 'Tauri 2.+' },
  ],
};
