import { Download } from './types';

export const agents: Download[] = [
  {
    id: 'claude-code',
    label: 'Claude Code',
    url: 'https://claude.com/product/claude-code',
    description: 'Anthropic',
    emoji: '✦',
    color: '#d97757',
    downloads: [],
  },
  {
    id: 'codex',
    label: 'Codex',
    url: 'https://openai.com/codex/',
    description: 'OpenAI',
    emoji: '✦',
    color: '#10a37f',
    downloads: [],
  },
  {
    id: 'qwen-code',
    label: 'Qwen Code',
    url: 'https://qwen.ai/qwencode',
    description: 'Alibaba Cloud',
    emoji: '✦',
    color: '#615ced',
    downloads: [],
  },
  {
    id: 'kimi-code',
    label: 'Kimi Code',
    url: 'https://www.kimi.com/code',
    description: 'Moonshot AI',
    emoji: '🌙',
    color: '#39d353',
    downloads: [],
  },
];
