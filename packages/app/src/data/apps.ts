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
    category: 'artificial-intelligence',
    emoji: '🧪',
    id: 'distilled',
    name: 'Distilled',
    href: 'https://hieudoanm.github.io/distilled',
    github: 'https://github.com/hieudoanm/distilled',
    image:
      'https://raw.githubusercontent.com/hieudoanm/distilled/refs/heads/master/images/app.png',
    tags: ['cli', 'extension', 'android', 'macos', 'web'],
  },
  {
    category: 'artificial-intelligence',
    emoji: '👨‍💻',
    id: 'hieudoanm',
    name: 'Hieu Doan',
    href: 'https://hieudoanm.github.io/hieudoanm',
    github: 'https://github.com/hieudoanm/hieudoanm',
    image:
      'https://raw.githubusercontent.com/hieudoanm/hieudoanm/refs/heads/master/images/app.png',
    tags: ['cli', 'extension', 'android', 'macos', 'web'],
  },
  {
    category: 'artificial-intelligence',
    emoji: '⚡',
    id: 'promptly',
    name: 'Promptly',
    href: 'https://hieudoanm.github.io/promptly',
    github: 'https://github.com/hieudoanm/promptly',
    image:
      'https://raw.githubusercontent.com/hieudoanm/promptly/refs/heads/master/images/app.png',
    tags: ['cli', 'extension', 'android', 'macos', 'web'],
  },
  {
    category: 'design',
    emoji: '🧩',
    id: 'composition',
    name: 'Composition',
    href: 'https://hieudoanm.github.io/composition',
    github: 'https://github.com/hieudoanm/composition',
    image:
      'https://raw.githubusercontent.com/hieudoanm/composition/refs/heads/master/images/app.png',
    tags: ['android', 'macos', 'web'],
  },
  {
    category: 'design',
    emoji: '📐',
    id: 'svg',
    name: 'SVG',
    href: 'https://hieudoanm.github.io/svg',
    github: 'https://github.com/hieudoanm/svg',
    image:
      'https://raw.githubusercontent.com/hieudoanm/svg/refs/heads/master/images/app.png',
    tags: ['android', 'macos', 'web'],
  },
  {
    category: 'dev-tools',
    emoji: '🌐',
    id: 'browser',
    name: 'Browser',
    href: 'https://hieudoanm.github.io/browser',
    github: 'https://github.com/hieudoanm/browser',
    image:
      'https://raw.githubusercontent.com/hieudoanm/browser/refs/heads/master/images/app.png',
    tags: ['android', 'macos', 'web'],
  },
  {
    category: 'dev-tools',
    emoji: '📘',
    id: 'cobra.md',
    name: 'Cobra MD',
    href: 'https://hieudoanm.github.io/cobra.md',
    github: 'https://github.com/hieudoanm/cobra.md',
    image:
      'https://raw.githubusercontent.com/hieudoanm/cobra.md/refs/heads/master/images/app.png',
    tags: ['cli', 'extension', 'android', 'macos', 'web'],
  },
  {
    category: 'dev-tools',
    emoji: '🛰️',
    id: 'proxy',
    name: 'Proxy',
    href: 'https://hieudoanm.github.io/proxy',
    github: 'https://github.com/hieudoanm/proxy',
    image:
      'https://raw.githubusercontent.com/hieudoanm/proxy/refs/heads/master/images/app.png',
    tags: ['cli', 'extension', 'android', 'macos', 'web'],
  },
  {
    category: 'dev-tools',
    emoji: '⬆️',
    id: 'simple-upload',
    name: 'Simple Upload',
    href: 'https://hieudoanm.github.io/simple-upload',
    github: 'https://github.com/hieudoanm/simple-upload',
    image:
      'https://raw.githubusercontent.com/hieudoanm/simple-upload/refs/heads/master/images/app.png',
    tags: ['android', 'macos', 'web'],
  },
  {
    category: 'fun',
    emoji: '🌀',
    id: 'attractors',
    name: 'Attractors',
    href: 'https://hieudoanm.github.io/attractors',
    github: 'https://github.com/hieudoanm/attractors',
    image:
      'https://raw.githubusercontent.com/hieudoanm/attractors/refs/heads/master/images/app.png',
    tags: ['android', 'macos', 'web'],
  },
  {
    category: 'fun',
    emoji: '⌚',
    id: 'garmin',
    name: 'Garmin',
    href: 'https://hieudoanm.github.io/garmin',
    github: 'https://github.com/hieudoanm/garmin',
    image:
      'https://raw.githubusercontent.com/hieudoanm/garmin/refs/heads/master/images/app.png',
    tags: ['android', 'macos', 'web'],
  },
  {
    category: 'fun',
    emoji: '👀',
    id: 'eyes',
    name: 'Eyes',
    href: 'https://hieudoanm.github.io/eyes',
    github: 'https://github.com/hieudoanm/eyes',
    image:
      'https://raw.githubusercontent.com/hieudoanm/eyes/refs/heads/master/images/app.png',
    tags: ['android', 'macos', 'web'],
  },
  {
    category: 'fun',
    emoji: '⚖️',
    id: 'legislation',
    name: 'Legislation',
    href: 'https://hieudoanm.github.io/legislation',
    github: 'https://github.com/hieudoanm/legislation',
    image:
      'https://raw.githubusercontent.com/hieudoanm/legislation/refs/heads/master/images/app.png',
    tags: ['android', 'macos', 'web'],
  },
  {
    category: 'fun',
    emoji: '🔁',
    id: 'palindrome',
    name: 'Palindrome',
    href: 'https://hieudoanm.github.io/palindrome',
    github: 'https://github.com/hieudoanm/palindrome',
    image:
      'https://raw.githubusercontent.com/hieudoanm/palindrome/refs/heads/master/images/app.png',
    tags: ['android', 'macos', 'web'],
  },
  {
    category: 'games',
    emoji: '♟',
    id: 'chess',
    name: 'Chess',
    href: 'https://hieudoanm.github.io/chess',
    github: 'https://github.com/hieudoanm/chess',
    image:
      'https://raw.githubusercontent.com/hieudoanm/chess/refs/heads/master/images/app.png',
    tags: ['android', 'macos', 'web'],
  },
  {
    category: 'games',
    emoji: '❓',
    id: 'quiz',
    name: 'Quiz',
    href: 'https://hieudoanm.github.io/quiz',
    github: 'https://github.com/hieudoanm/quiz',
    image:
      'https://raw.githubusercontent.com/hieudoanm/quiz/refs/heads/master/images/app.png',
    tags: ['cli', 'extension', 'android', 'macos', 'web'],
  },
  {
    category: 'languages',
    emoji: '🤟',
    id: 'sign',
    name: 'Sign',
    href: 'https://hieudoanm.github.io/sign',
    github: 'https://github.com/hieudoanm/sign',
    image:
      'https://raw.githubusercontent.com/hieudoanm/sign/refs/heads/master/images/app.png',
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
    tags: ['android', 'macos', 'web'],
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
    emoji: '📋',
    id: 'clipboard',
    name: 'Clipboard',
    href: 'https://hieudoanm.github.io/clipboard',
    github: 'https://github.com/hieudoanm/clipboard',
    image:
      'https://raw.githubusercontent.com/hieudoanm/clipboard/refs/heads/master/images/app.png',
    tags: ['cli', 'extension', 'android', 'macos', 'web'],
  },
  {
    category: 'utilities',
    emoji: '📱',
    id: 'instasize',
    name: 'InstaSize',
    href: 'https://hieudoanm.github.io/instasize',
    github: 'https://github.com/hieudoanm/instasize',
    image:
      'https://raw.githubusercontent.com/hieudoanm/instasize/refs/heads/master/images/app.png',
    tags: ['cli', 'extension', 'android', 'macos', 'web'],
  },
  {
    category: 'utilities',
    emoji: '🧾',
    id: 'invoice',
    name: 'Invoice',
    href: 'https://hieudoanm.github.io/invoice',
    github: 'https://github.com/hieudoanm/invoice',
    image:
      'https://raw.githubusercontent.com/hieudoanm/invoice/refs/heads/master/images/app.png',
    tags: ['cli', 'extension', 'android', 'macos', 'web'],
  },
  {
    category: 'utilities',
    emoji: '🕵️',
    id: 'redact',
    name: 'Redact',
    href: 'https://hieudoanm.github.io/redact',
    github: 'https://github.com/hieudoanm/redact',
    image:
      'https://raw.githubusercontent.com/hieudoanm/redact/refs/heads/master/images/app.png',
    tags: ['cli', 'extension', 'android', 'macos', 'web'],
  },
  {
    category: 'utilities',
    emoji: '📸',
    id: 'snapshot',
    name: 'Snapshot',
    href: 'https://hieudoanm.github.io/snapshot',
    github: 'https://github.com/hieudoanm/snapshot',
    image:
      'https://raw.githubusercontent.com/hieudoanm/snapshot/refs/heads/master/images/app.png',
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
  {
    category: 'utilities',
    emoji: '📝',
    id: 'transcript',
    name: 'Transcript',
    href: 'https://hieudoanm.github.io/transcript',
    github: 'https://github.com/hieudoanm/transcript',
    image:
      'https://raw.githubusercontent.com/hieudoanm/transcript/refs/heads/master/images/app.png',
    tags: ['cli', 'extension', 'android', 'macos', 'web'],
  },
  {
    category: 'utilities',
    emoji: '📶',
    id: 'wifi',
    name: 'Wifi',
    href: 'https://hieudoanm.github.io/wifi',
    github: 'https://github.com/hieudoanm/wifi',
    image:
      'https://raw.githubusercontent.com/hieudoanm/wifi/refs/heads/master/images/app.png',
    tags: ['cli', 'extension', 'android', 'macos', 'web'],
  },
  {
    category: 'workspace',
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
    category: 'workspace',
    emoji: '📝',
    id: 'keep',
    name: 'Keep',
    href: 'https://hieudoanm.github.io/keep',
    github: 'https://github.com/hieudoanm/keep',
    image:
      'https://raw.githubusercontent.com/hieudoanm/keep/refs/heads/master/images/app.png',
    tags: ['cli', 'extension', 'android', 'macos', 'web'],
  },
];
