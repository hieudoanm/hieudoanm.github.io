import { buildVersion } from './version';

export const about = {
  name: 'Diagram',
  description: 'Minimal text-driven diagram editor',
  version: buildVersion,
  items: [
    { label: 'Framework', value: 'Next.js 16' },
    { label: 'Language', value: 'TypeScript 6' },
    { label: 'Styling', value: 'Tailwind CSS 4 + DaisyUI 5' },
    { label: 'Syntax', value: 'Custom DSL' },
    { label: 'Desktop', value: 'Tauri 2' },
  ],
};
