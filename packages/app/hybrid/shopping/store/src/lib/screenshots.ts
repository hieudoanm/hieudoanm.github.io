import type { AppData } from './downloads';

const WIDTH = 640;
const HEIGHT = 400;

const PALETTES = [
  ['#134e4a', '#14b8a6'],
  ['#164e63', '#38bdf8'],
  ['#4a044e', '#c084fc'],
  ['#431407', '#fb923c'],
];

const escapeXml = (value: string): string =>
  value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');

const svgFor = (app: AppData, index: number): string => {
  const [from, to] = PALETTES[index % PALETTES.length];
  const title = escapeXml(app.label);
  const subtitle = escapeXml(
    `${app.primaryCategory} \u00b7 ${app.platforms.join(' \u00b7 ')}`
  );
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${WIDTH}" height="${HEIGHT}" viewBox="0 0 ${WIDTH} ${HEIGHT}">
  <defs>
    <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="${from}"/>
      <stop offset="100%" stop-color="${to}"/>
    </linearGradient>
  </defs>
  <rect width="${WIDTH}" height="${HEIGHT}" fill="url(#g)"/>
  <rect x="32" y="32" width="576" height="336" rx="16" fill="none" stroke="rgba(255,255,255,0.25)" stroke-width="2"/>
  <text x="320" y="186" font-family="ui-monospace, monospace" font-size="36" font-weight="600" fill="#fff" text-anchor="middle">${title}</text>
  <text x="320" y="222" font-family="ui-monospace, monospace" font-size="16" fill="rgba(255,255,255,0.85)" text-anchor="middle">${subtitle}</text>
  <text x="320" y="348" font-family="ui-monospace, monospace" font-size="14" fill="rgba(255,255,255,0.6)" text-anchor="middle">Screenshot ${index + 1} of 3</text>
</svg>`;
};

export const getAppScreenshots = (app: AppData): string[] => {
  const uris: string[] = [];
  for (let i = 0; i < 3; i += 1) {
    uris.push(`data:image/svg+xml;utf8,${encodeURIComponent(svgFor(app, i))}`);
  }
  return uris;
};
