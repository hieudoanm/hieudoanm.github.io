import { Tool } from '@hieudoanm.github.io/components/pages/start/cards/ToolCard';
import { ModalId } from '../types';

export const make = (open: (id: ModalId) => () => void): Tool[] => [
  {
    label: 'JPG to AVIF',
    description: 'Convert',
    tags: ['image', 'convert'],
    emoji: '🔄',
    color: '#06b6d4',
    onClick: open('image-convert-jpg-to-avif'),
  },
  {
    label: 'JPG to GIF',
    description: 'Convert',
    tags: ['image', 'convert'],
    emoji: '🔄',
    color: '#06b6d4',
    onClick: open('image-convert-jpg-to-gif'),
  },
  {
    label: 'JPG to PNG',
    description: 'Convert',
    tags: ['image', 'convert'],
    emoji: '🔄',
    color: '#06b6d4',
    onClick: open('image-convert-jpg-to-png'),
  },
  {
    label: 'JPG to SVG',
    description: 'Convert',
    tags: ['image', 'convert'],
    emoji: '🔄',
    color: '#06b6d4',
    onClick: open('image-convert-jpg-to-svg'),
  },
  {
    label: 'JPG to TIFF',
    description: 'Convert',
    tags: ['image', 'convert'],
    emoji: '🔄',
    color: '#06b6d4',
    onClick: open('image-convert-jpg-to-tiff'),
  },
  {
    label: 'JPG to WebP',
    description: 'Convert',
    tags: ['image', 'convert'],
    emoji: '🔄',
    color: '#06b6d4',
    onClick: open('image-convert-jpg-to-webp'),
  },
];
