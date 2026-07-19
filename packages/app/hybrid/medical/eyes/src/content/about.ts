import { buildVersion } from './version';

export const about = {
  name: 'Eyes',
  description: 'Visual acuity charts for vision screening',
  version: buildVersion,
  items: [
    { label: 'Framework', value: 'Next.js 16' },
    { label: 'Language', value: 'TypeScript 6' },
    { label: 'Styling', value: 'Tailwind CSS 4 + DaisyUI 5' },
    { label: 'Charts', value: 'Snellen · LogMAR · Tumbling E' },
    { label: 'Desktop', value: 'Tauri 2' },
  ],
};
