import { Tool } from '@hieudoanm.github.io/components/pages/start/cards/ToolCard';
import { ModalId } from '../types';

export const make = (open: (id: ModalId) => () => void): Tool[] => [
  {
    label: 'HEIC to JPG',
    description: 'Convert',
    tags: ['image', 'photo'],
    emoji: '🔄',
    color: '#06b6d4',
    onClick: open('image-convert-heic-to-jpg'),
  },
  {
    label: 'WebP to JPG',
    description: 'Convert',
    tags: ['image', 'photo'],
    emoji: '🔄',
    color: '#06b6d4',
    onClick: open('image-convert-webp-to-jpg'),
  },
  {
    label: 'WebP to PNG',
    description: 'Convert',
    tags: ['image', 'photo'],
    emoji: '🔄',
    color: '#06b6d4',
    onClick: open('image-convert-webp-to-png'),
  },
  {
    label: 'JPG to WebP',
    description: 'Convert',
    tags: ['image', 'photo'],
    emoji: '🔄',
    color: '#06b6d4',
    onClick: open('image-convert-jpg-to-webp'),
  },
  {
    label: 'JPG to PNG',
    description: 'Convert',
    tags: ['image', 'photo'],
    emoji: '🔄',
    color: '#06b6d4',
    onClick: open('image-convert-jpg-to-png'),
  },
  {
    label: 'PNG to WebP',
    description: 'Convert',
    tags: ['image', 'photo'],
    emoji: '🔄',
    color: '#06b6d4',
    onClick: open('image-convert-png-to-webp'),
  },
  {
    label: 'PNG to JPG',
    description: 'Convert',
    tags: ['image', 'photo'],
    emoji: '🔄',
    color: '#06b6d4',
    onClick: open('image-convert-png-to-jpg'),
  },
  {
    label: 'PNG to SVG',
    description: 'Convert',
    tags: ['image', 'photo'],
    emoji: '🔄',
    color: '#06b6d4',
    onClick: open('image-convert-png-to-svg'),
  },
];
