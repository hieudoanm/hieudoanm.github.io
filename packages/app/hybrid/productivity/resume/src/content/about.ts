import { buildVersion } from './version';

export const about = {
  name: 'Free Resume Builder',
  description:
    'Build a professional resume with 32 free templates and export it as PDF.',
  version: buildVersion,
  items: [
    { label: 'Framework', value: 'Next.js 16' },
    { label: 'Language', value: 'TypeScript 6' },
    { label: 'Styling', value: 'Tailwind CSS 4 + DaisyUI 5' },
    { label: 'Templates', value: '32 Free Templates' },
    { label: 'Paper sizes', value: 'A3 · A4 · A5 · A6 · B5' },
  ],
};
