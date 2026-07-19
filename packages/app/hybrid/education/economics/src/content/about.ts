import { buildVersion } from './version';

export const about = {
  name: 'Economics',
  description: 'Game theory and economics simulations',
  version: buildVersion,
  items: [
    { label: 'Framework', value: 'Next.js 16' },
    { label: 'Language', value: 'TypeScript' },
    { label: 'Styling', value: 'Tailwind CSS 4 + DaisyUI 5' },
    { label: 'Tools', value: "Prisoner's Dilemma" },
    { label: 'Desktop', value: 'Tauri 2' },
  ],
};
