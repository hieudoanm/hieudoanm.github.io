import { Tool } from '@hieudoanm.github.io/components/pages/start/cards/ToolCard';
import { ModalId } from '../types';

export const make = (open: (id: ModalId) => () => void): Tool[] => [
  {
    label: 'PSD to JPG',
    description: 'Convert',
    tags: ['image', 'convert'],
    emoji: '🔄',
    color: '#06b6d4',
    onClick: open('image-convert-psd-to-jpg'),
  },
  {
    label: 'PSD to PNG',
    description: 'Convert',
    tags: ['image', 'convert'],
    emoji: '🔄',
    color: '#06b6d4',
    onClick: open('image-convert-psd-to-png'),
  },
];
