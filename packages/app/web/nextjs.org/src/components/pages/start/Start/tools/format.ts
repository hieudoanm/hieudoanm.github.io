import { Tool } from '@hieudoanm.github.io/components/pages/start/cards/ToolCard';
import { ModalId } from '../types';

export const make = (open: (id: ModalId) => () => void): Tool[] => [
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
];
