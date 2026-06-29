import { Tool } from '@hieudoanm.github.io/components/pages/start/cards/ToolCard';
import { ModalId } from '../types';

export const make = (open: (id: ModalId) => () => void): Tool[] => [
  {
    label: 'Braille',
    description: '',
    tags: [],
    emoji: '🔧',
    color: '#3b82f6',
    onClick: open('braille'),
  },
  {
    label: 'Case',
    description: 'Converter',
    tags: [
      'developer',
      'programming',
      'code',
      'dev-tools',
      'transform',
      'change',
    ],
    emoji: '🔤',
    color: '#3b82f6',
    onClick: open('text-case'),
  },
  {
    label: 'Leet Speak',
    description: '',
    tags: [],
    emoji: '🔧',
    color: '#3b82f6',
    onClick: open('leetspeak'),
  },
  {
    label: 'Morse',
    description: '',
    tags: [],
    emoji: '🔧',
    color: '#3b82f6',
    onClick: open('morse'),
  },
];
