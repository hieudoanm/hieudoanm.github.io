import { Tool } from '@hieudoanm.github.io/components/pages/start/cards/ToolCard';
import { ModalId } from '../types';

export const make = (open: (id: ModalId) => () => void): Tool[] => [
  {
    label: 'Braille',
    description: 'From Text',
    tags: ['format', 'converter', 'data'],
    emoji: '⠿',
    color: '#8b5cf6',
    onClick: open('braille'),
  },
  {
    label: 'Colors',
    description: 'From HEX',
    tags: ['format', 'converter', 'data'],
    emoji: '🎨',
    color: '#ec4899',
    onClick: open('colors'),
  },
  {
    label: 'Morse Code',
    description: 'From Text',
    tags: ['format', 'converter', 'data'],
    emoji: '🔣',
    color: '#f59e0b',
    onClick: open('morse'),
  },
  {
    label: 'Leet Speak',
    description: 'From Text',
    tags: ['format', 'converter', 'data'],
    emoji: '🔐',
    color: '#10b981',
    onClick: open('leetspeak'),
  },
  {
    label: 'Lorem Ipsum',
    description: 'Dummy text',
    tags: [
      'format',
      'converter',
      'data',
      'placeholder',
      'dummy-text',
      'filler',
    ],
    emoji: '📝',
    color: '#8b5cf6',
    onClick: open('lorem-ipsum'),
  },
  {
    label: 'OpenAPI',
    description: 'to Postman',
    tags: ['format', 'converter', 'data', 'rest', 'swagger', 'specification'],
    emoji: '🔄',
    color: '#ff6c37',
    onClick: open('openapi'),
  },
];
