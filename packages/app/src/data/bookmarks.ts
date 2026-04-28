export const bookmarks = [
  {
    label: 'GitHub',
    url: 'https://github.com',
    description: 'Code',
    emoji: '🐙',
    color: '#6e40c9',
  },
  {
    label: 'Instagram',
    url: 'https://instagram.com',
    description: 'Photos',
    emoji: '📷',
    color: '#e1306c',
  },
  {
    label: 'YouTube',
    url: 'https://youtube.com',
    description: 'Videos',
    emoji: '▶',
    color: '#ff0000',
  },
];

export const aiBookmarks = [
  {
    label: 'ChatGPT',
    url: 'https://chatgpt.com',
    description: 'OpenAI',
    emoji: '🤖',
    color: '#10a37f',
  },
  {
    label: 'Claude',
    url: 'https://claude.ai/',
    description: 'Anthropic',
    emoji: '✦',
    color: '#d97757',
  },
  {
    label: 'Perplexity',
    url: 'https://www.perplexity.ai',
    description: 'AI Search',
    emoji: '🔍',
    color: '#20b2aa',
  },
  {
    label: 'Gemini',
    url: 'https://gemini.google.com/app',
    description: 'Google',
    emoji: '✨',
    color: '#4285f4',
  },
  {
    label: 'Grok',
    url: 'https://grok.com',
    description: 'xAI',
    emoji: '⚡',
    color: '#1d9bf0',
  },
  {
    label: 'Copilot',
    url: 'https://copilot.microsoft.com',
    description: 'Microsoft',
    emoji: '🪟',
    color: '#0078d4',
  },
  {
    label: 'DeepSeek',
    url: 'https://chat.deepseek.com',
    description: 'DeepSeek',
    emoji: '🐋',
    color: '#4d6bfe',
  },
  {
    label: 'Mistral',
    url: 'https://chat.mistral.ai',
    description: 'Mistral AI',
    emoji: '🌬️',
    color: '#ff7000',
  },
  {
    label: 'Meta AI',
    url: 'https://www.meta.ai',
    description: 'Meta',
    emoji: '♾️',
    color: '#0082fb',
  },
  {
    label: 'HuggingChat',
    url: 'https://huggingface.co/chat',
    description: 'HuggingFace',
    emoji: '🤗',
    color: '#ff9d00',
  },
  {
    label: 'Poe',
    url: 'https://poe.com',
    description: 'Quora',
    emoji: '💬',
    color: '#8b5cf6',
  },
  {
    label: 'Cohere',
    url: 'https://coral.cohere.com',
    description: 'Cohere',
    emoji: '🌊',
    color: '#39d353',
  },
];

export type Bookmark = (typeof bookmarks)[number];
