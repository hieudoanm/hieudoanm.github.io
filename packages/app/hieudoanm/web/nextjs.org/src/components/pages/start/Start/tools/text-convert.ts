import { Tool } from '@hieudoanm.github.io/components/pages/start/cards/ToolCard';
import { ModalId } from '../types';

export const make = (open: (id: ModalId) => () => void): Tool[] => [
  {
    label: 'Braille',
    description: '',
    tags: [],
    emoji: '🔧',
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
    onClick: open('text-case'),
  },
  {
    label: 'Leet Speak',
    description: '',
    tags: [],
    emoji: '🔧',
    onClick: open('leetspeak'),
  },
  {
    label: 'Morse',
    description: '',
    tags: [],
    emoji: '🔧',
    onClick: open('morse'),
  },
];
