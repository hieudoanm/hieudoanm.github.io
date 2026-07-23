import {
  PiStarFour,
  PiPlanet,
  PiBrain,
  PiMoon,
  PiLightning,
} from 'react-icons/pi';
import { ItemCardProps } from '../ItemCard';

export const downloads: ItemCardProps[] = [
  {
    label: 'Antigravity',
    href: 'https://antigravity.google/download',
    description: 'Google',
    icon: PiPlanet,
  },
  {
    label: 'Claude Code',
    href: 'https://claude.com/download',
    description: 'Anthropic',
    icon: PiStarFour,
  },
  {
    label: 'Codex',
    href: 'https://openai.com/codex/',
    description: 'OpenAI',
    icon: PiStarFour,
  },
  {
    label: 'Cursor',
    href: 'https://cursor.com',
    icon: PiBrain,
    description: 'AI Code Editor',
  },
  {
    label: 'Kimi Code',
    href: 'https://www.kimi.com/code',
    description: 'Moonshot AI',
    icon: PiMoon,
  },
  {
    label: 'OpenCode',
    href: 'https://opencode.ai/',
    description: 'Anomaly',
    icon: PiStarFour,
  },
  {
    label: 'Qwen Code',
    href: 'https://qwen.ai/qwencode',
    description: 'Alibaba Cloud',
    icon: PiStarFour,
  },
  {
    label: 'Zed',
    href: 'https://zed.dev',
    icon: PiLightning,
    description: 'Code Editor',
  },
];
