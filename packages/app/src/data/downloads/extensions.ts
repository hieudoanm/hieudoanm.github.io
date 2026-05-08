type Extension = {
  id: string;
  name: string;
  href: string;
  emoji: string;
  color: string;
  description: string;
};

export const extensions: Extension[] = [
  {
    id: 'blocked',
    name: 'Blocked',
    href: 'https://github.com/hieudoanm/hieudoanm/tree/master/packages/extensions/blocked/download',
    emoji: '🚫',
    color: '#ef4444',
    description: 'Block distracting or unwanted websites',
  },
  {
    id: 'github-open-link',
    name: 'GitHub Open Link',
    href: 'https://github.com/hieudoanm/hieudoanm/tree/master/packages/extensions/github-open-link/download',
    emoji: '🔗',
    color: '#111827',
    description: 'Open GitHub links directly in the correct view',
  },
  {
    id: 'shopify-detect',
    name: 'Shopify Detect',
    href: 'https://github.com/hieudoanm/hieudoanm/tree/master/packages/extensions/shopify-detect/download',
    emoji: '🛍️',
    color: '#10b981',
    description: 'Detect if a website is powered by Shopify',
  },
  {
    id: 'youtube-transcript',
    name: 'YouTube Transcript',
    href: 'https://github.com/hieudoanm/hieudoanm/tree/master/packages/extensions/youtube-transcript/download',
    emoji: '📜',
    color: '#ef4444',
    description: 'Extract and view YouTube video transcripts',
  },
];
