type TagBrowser = 'extension' | 'web';
type TagMobile = 'android' | 'ios';
type TagNative = 'cli' | 'linux' | 'macos' | 'windows';
type Tag = TagBrowser | TagMobile | TagNative;

export type App = {
  id: string;
  emoji: string;
  href: string;
  github: string;
  image: string;
  name: string;
  category: string;
  tags: Tag[];
};

export const apps: App[] = [
  {
    category: 'ai',
    emoji: '🧪',
    id: 'hieudoanm',
    name: 'Hieu Doan',
    href: 'https://hieudoanm.github.io/hieudoanm',
    github: 'https://github.com/hieudoanm/hieudoanm',
    image:
      'https://raw.githubusercontent.com/hieudoanm/hieudoanm/refs/heads/master/images/app.png',
    tags: ['cli', 'extension', 'android', 'macos', 'web'],
  },
  {
    category: 'template',
    emoji: '🚀',
    id: 'start',
    name: 'Start',
    href: 'https://hieudoanm.github.io/start',
    github: 'https://github.com/hieudoanm/start',
    image:
      'https://raw.githubusercontent.com/hieudoanm/start/refs/heads/master/images/app.png',
    tags: ['cli', 'extension', 'android', 'macos', 'web'],
  },
  {
    category: 'template',
    emoji: '✈️',
    id: 'telegram',
    name: 'Telegram',
    href: 'https://hieudoanm.github.io/telegram',
    github: 'https://github.com/hieudoanm/telegram',
    image:
      'https://raw.githubusercontent.com/hieudoanm/telegram/refs/heads/master/images/app.png',
    tags: ['cli', 'extension', 'android', 'macos', 'web'],
  },
  {
    category: 'utilities',
    emoji: '🌀',
    id: 'attractors',
    name: 'Attractors',
    href: 'https://hieudoanm.github.io/attractors',
    github: 'https://github.com/hieudoanm/attractors',
    image:
      'https://raw.githubusercontent.com/hieudoanm/attractors/refs/heads/master/images/app.png',
    tags: ['cli', 'extension', 'android', 'macos', 'web'],
  },
  {
    category: 'utilities',
    emoji: '♟',
    id: 'chess',
    name: 'Chess',
    href: 'https://hieudoanm.github.io/chess',
    github: 'https://github.com/hieudoanm/chess',
    image:
      'https://raw.githubusercontent.com/hieudoanm/chess/refs/heads/master/images/app.png',
    tags: ['cli', 'extension', 'android', 'macos', 'web'],
  },
  {
    category: 'utilities',
    emoji: '📚',
    id: 'docs',
    name: 'Docs',
    href: 'https://hieudoanm.github.io/docs',
    github: 'https://github.com/hieudoanm/docs',
    image:
      'https://raw.githubusercontent.com/hieudoanm/docs/refs/heads/master/images/app.png',
    tags: ['cli', 'extension', 'android', 'macos', 'web'],
  },
  {
    category: 'utilities',
    emoji: '🖥️',
    id: 'system',
    name: 'System',
    href: 'https://hieudoanm.github.io/system',
    github: 'https://github.com/hieudoanm/system',
    image:
      'https://raw.githubusercontent.com/hieudoanm/system/refs/heads/master/images/app.png',
    tags: ['cli', 'extension', 'android', 'macos', 'web'],
  },
];
