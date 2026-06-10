import { Download } from './types';

export const agents: Download[] = [
  {
    id: 'antigravity',
    label: 'AntiGravity',
    url: 'https://antigravity.google',
    emoji: '🛰️',
    color: '#4285f4',
    description: 'AI Code Editor',
    downloads: [
      { label: 'Download CLI', url: 'https://antigravity.google/download' },
      { label: 'Download IDE', url: 'https://antigravity.google/download' },
    ],
  },
  {
    id: 'claude',
    label: 'Claude',
    url: 'https://claude.com/product/claude-code',
    description: 'Anthropic',
    emoji: '✦',
    color: '#d97757',
    downloads: [
      { label: 'Download CLI', url: 'https://claude.com/download' },
      { label: 'Download Dekstop', url: 'https://claude.com/download' },
    ],
  },
  {
    id: 'codex',
    label: 'Codex',
    url: 'https://openai.com/codex/',
    description: 'OpenAI',
    emoji: '✦',
    color: '#10a37f',
    downloads: [
      { label: 'Download App', url: 'https://developers.openai.com/codex/app' },
      { label: 'Download CLI', url: 'https://developers.openai.com/codex/cli' },
    ],
  },
  {
    id: 'cursor',
    label: 'Cursor',
    url: 'https://cursor.com',
    emoji: '🧠',
    color: '#7c3aed',
    description: 'AI Code Editor',
    downloads: [
      { label: 'Download App', url: 'https://cursor.com/download' },
      { label: 'Download CLI', url: 'https://cursor.com/cli' },
    ],
  },
  {
    id: 'kimi-code',
    label: 'Kimi Code',
    url: 'https://www.kimi.com/code',
    description: 'Moonshot AI',
    emoji: '🌙',
    color: '#39d353',
    downloads: [
      { label: 'Download CLI', url: 'https://www.kimi.com/code' },
      { label: 'Download EXT', url: 'https://www.kimi.com/code' },
    ],
  },
  {
    id: 'open-code',
    label: 'OpenCode',
    url: 'https://opencode.ai/',
    description: 'Anomaly',
    emoji: '✦',
    color: '#615ced',
    downloads: [{ label: 'Download CLI', url: 'https://opencode.ai/' }],
  },
  {
    id: 'qwen-code',
    label: 'Qwen Code',
    url: 'https://qwen.ai/qwencode',
    description: 'Alibaba Cloud',
    emoji: '✦',
    color: '#615ced',
    downloads: [
      { label: 'Download App', url: 'https://qwen.ai/download' },
      { label: 'Download CLI', url: 'https://qwen.ai/qwencode' },
    ],
  },
  {
    id: 'zed',
    label: 'Zed',
    url: 'https://zed.dev',
    emoji: '⚡',
    color: '#7c3aed',
    description: 'Code Editor',
    downloads: [
      { label: 'Download App', url: 'https://zed.dev/download' },
      { label: 'Download CLI', url: 'https://zed.dev/docs/reference/cli' },
    ],
  },
];
