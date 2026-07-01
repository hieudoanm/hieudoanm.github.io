import { Tool } from '@hieudoanm.github.io/components/pages/start/cards/ToolCard';
import { ModalId } from '../types';

export const make = (open: (id: ModalId) => () => void): Tool[] => [
  {
    label: 'GIF to JPG',
    description: 'Convert',
    tags: ['image', 'convert'],
    emoji: '🔄',
    onClick: open('image-convert-gif-to-jpg'),
  },
  {
    label: 'GIF to PNG',
    description: 'Convert',
    tags: ['image', 'convert'],
    emoji: '🔄',
    onClick: open('image-convert-gif-to-png'),
  },
];
