import { buildVersion } from './version';

export const about = {
  name: 'Video Tools',
  description: 'Browser-based video and audio processing tools',
  version: buildVersion,
  items: [
    { label: 'Framework', value: 'Next.js 16' },
    { label: 'Language', value: 'TypeScript 6' },
    { label: 'Styling', value: 'Tailwind CSS 4 + DaisyUI 5' },
    { label: 'Format', value: 'Web, MP4, MP3' },
    { label: 'Desktop', value: 'Tauri 2' },
  ],
};
