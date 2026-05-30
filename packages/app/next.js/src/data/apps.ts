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
    category: 'project',
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
    category: 'project',
    emoji: '🚀',
    id: 'start',
    name: 'Start',
    href: 'https://hieudoanm.github.io/start',
    github: 'https://github.com/hieudoanm/start',
    image:
      'https://raw.githubusercontent.com/hieudoanm/start/refs/heads/master/images/app.png',
    tags: ['cli', 'extension', 'android', 'macos', 'web'],
  },
];
