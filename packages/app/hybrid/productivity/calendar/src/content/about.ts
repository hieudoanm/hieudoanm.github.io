import { buildVersion } from './version'

export const about = {
  name: 'Calendar',
  description:
    'A calendar productivity app with multiple views including daily, weekly, monthly, quarterly, half, and yearly.',
  version: buildVersion,
  items: [
    { label: 'Framework', value: 'Next.js 16' },
    { label: 'Language', value: 'TypeScript 6' },
    { label: 'Styling', value: 'Tailwind CSS 4 + DaisyUI 5' },
  ],
}
