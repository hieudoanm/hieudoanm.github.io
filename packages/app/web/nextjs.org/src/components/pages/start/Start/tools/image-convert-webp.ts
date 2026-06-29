import { Tool } from '@hieudoanm.github.io/components/pages/start/cards/ToolCard';
import { ModalId } from '../types';

export const make = (open: (id: ModalId) => () => void): Tool[] => [
  {
    label: 'WebP to AVIF',
    description: 'Convert',
    tags: ['image', 'convert'],
    emoji: '🔄',
    color: '#06b6d4',
    onClick: open('image-convert-webp-to-avif'),
  },
  {
    label: 'WebP to GIF',
    description: 'Convert',
    tags: ['image', 'convert'],
    emoji: '🔄',
    color: '#06b6d4',
    onClick: open('image-convert-webp-to-gif'),
  },
  {
    label: 'WebP to JPG',
    description: 'Convert',
    tags: ['image', 'convert'],
    emoji: '🔄',
    color: '#06b6d4',
    onClick: open('image-convert-webp-to-jpg'),
  },
  {
    label: 'WebP to PNG',
    description: 'Convert',
    tags: ['image', 'convert'],
    emoji: '🔄',
    color: '#06b6d4',
    onClick: open('image-convert-webp-to-png'),
  },
];
