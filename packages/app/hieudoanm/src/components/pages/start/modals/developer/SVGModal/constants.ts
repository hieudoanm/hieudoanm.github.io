export const DEFAULT_SVG = `<svg width="400" height="400" viewBox="0 0 400 400" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#8B5CF6" />
      <stop offset="100%" stop-color="#EC4899" />
    </linearGradient>
  </defs>
  <rect x="50" y="50" width="300" height="300" rx="40" fill="url(#gradient)" />
  <circle cx="200" cy="200" r="80" fill="white" fill-opacity="0.2" />
  <text x="200" y="215" font-family="sans-serif" font-size="24" fill="white" text-anchor="middle" font-weight="bold">SVG EDITOR</text>
</svg>`;

export const PRESETS = [
  { name: 'Modern', code: DEFAULT_SVG },
  {
    name: 'Galaxy',
    code: `<svg width="400" height="400" xmlns="http://www.w3.org/2000/svg"><rect width="100%" height="100%" fill="#020617"/><g transform="translate(200,200)"><circle r="140" fill="none" stroke="#3b82f6" stroke-width="0.5" stroke-dasharray="1 10"/><circle r="100" fill="none" stroke="#8b5cf6" stroke-width="1" stroke-dasharray="5 15" opacity="0.5"/><circle r="60" fill="none" stroke="#ec4899" stroke-width="2" stroke-dasharray="10 20"/><circle r="20" fill="#f43f5e" filter="blur(8px)"/><circle r="6" fill="white"/></g></svg>`,
  },
  {
    name: 'Aurora',
    code: `<svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg"><path fill="#8B5CF6" d="M44.7,-76.4C58.2,-69.2,70,-58.5,77.4,-45.5C84.7,-32.5,87.7,-17.2,85.1,-2.6C82.5,12,74.3,25.9,64.8,38.2C55.3,50.5,44.6,61.1,32.1,68.2C19.7,75.3,5.5,78.9,-9.4,77.5C-24.3,76.1,-39.8,69.7,-52.2,59.8C-64.6,49.9,-73.9,36.5,-78.9,21.8C-83.9,7.1,-84.6,-8.8,-79.9,-23.5C-75.2,-38.2,-65.1,-51.7,-52.1,-59.1C-39.1,-66.5,-23.2,-67.7,-8.4,-75.4C6.5,-83.1,21.3,-97.3,44.7,-76.4Z" transform="translate(100 100)" filter="blur(4px)" /></svg>`,
  },
  {
    name: 'Blueprint',
    code: `<svg width="100" height="100" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"><rect width="100" height="100" fill="#2563eb"/><path d="M0 50h100M50 0v100" stroke="#60a5fa" stroke-width="0.5"/><path d="M20 20h60v60h-60z" fill="none" stroke="white" stroke-width="1.5" stroke-dasharray="4 2"/><circle cx="50" cy="50" r="25" fill="none" stroke="white" stroke-width="1"/></svg>`,
  },
];

export const ICON_SIZES = [72, 96, 128, 144, 152, 192, 384, 512];
