import { buildVersion } from './version';

export const about = {
  name: 'DOI',
  description: 'Interactive Crossref citation network',
  version: buildVersion,
  items: [
    { label: 'Language', value: 'TypeScript 6.+' },
    { label: 'Framework', value: 'Next.js 16.+' },
    { label: 'Styling', value: 'Tailwind CSS 4.+' },
    { label: 'Components', value: 'DaisyUI 5.+' },
    { label: 'Data engine', value: 'sql.js · d3-force' },
  ],
};
