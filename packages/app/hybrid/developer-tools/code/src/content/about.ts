import { buildVersion } from './version';

export const about = {
  name: 'Code',
  description: 'Web-based code editor',
  version: buildVersion,
  items: [
    { label: 'Framework', value: 'Next.js 16' },
    { label: 'Language', value: 'TypeScript 6' },
    { label: 'Styling', value: 'Tailwind CSS 4 + DaisyUI 5' },
    { label: 'Editor', value: 'CodeMirror 6' },
  ],
};
