import { buildVersion } from './version';

export const about = {
  name: 'Lingo',
  description: 'Learn languages — flashcards, dictionary and sign language',
  version: buildVersion,
  items: [
    { label: 'Framework', value: 'Next.js 16' },
    { label: 'Language', value: 'TypeScript' },
    { label: 'Styling', value: 'Tailwind CSS 4 + DaisyUI 5' },
    { label: 'Courses', value: 'Flashcards · Dictionary · Sign Language' },
    { label: 'Desktop', value: 'Tauri 2' },
  ],
};
