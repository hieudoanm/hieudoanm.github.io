import { Tool } from '@hieudoanm.github.io/components/pages/start/cards/ToolCard';
import { ModalId } from '../types';

export const make = (open: (id: ModalId) => () => void): Tool[] => [
  {
    label: 'Base64',
    description: 'Decode/Encode',
    tags: ['image', 'create', 'photo', 'generator', 'base-64'],
    emoji: '🔐',
    onClick: open('base64'),
  },
  {
    label: 'Breaking Bad',
    description: 'Element',
    tags: ['image', 'create', 'photo', 'generator'],
    emoji: '🧪',
    onClick: open('breaking-bad'),
  },
  {
    label: 'Camera',
    description: 'Composition',
    tags: ['image', 'create', 'photo', 'generator'],
    emoji: '📸',
    onClick: open('camera'),
  },
  {
    label: 'Chart Maker',
    description: 'Create Chart',
    tags: ['image', 'photo', 'generator'],
    emoji: '📊',
    onClick: open('chart-maker'),
  },
  {
    label: 'Collage',
    description: 'Photo Collage',
    tags: ['image', 'create', 'generator'],
    emoji: '🖼️',
    onClick: open('collage-maker'),
  },
  {
    label: 'House',
    description: 'M.D.',
    tags: ['image', 'create', 'photo', 'generator'],
    emoji: '🏥',
    onClick: open('house'),
  },
  {
    label: 'InstaSize',
    description: 'Square Fit',
    tags: ['image', 'create', 'photo', 'generator'],
    emoji: '📸',
    onClick: open('instasize'),
  },
  {
    label: 'Meme Maker',
    description: 'Create Meme',
    tags: ['image', 'photo', 'generator', 'funny'],
    emoji: '🎭',
    onClick: open('meme-maker'),
  },
  {
    label: 'Pixel',
    description: 'Art Grid',
    tags: ['image', 'create', 'photo', 'generator'],
    emoji: '▪️',
    onClick: open('pixel'),
  },
  {
    label: 'Profile',
    description: 'Photo Maker',
    tags: ['image', 'create', 'generator'],
    emoji: '👤',
    onClick: open('image-profile'),
  },
  {
    label: 'Social Preview',
    description: 'GitHub',
    tags: ['image', 'create', 'photo', 'generator'],
    emoji: '📸',
    onClick: open('github-social-preview'),
  },
  {
    label: 'Thumbnails',
    description: 'YouTube',
    tags: ['image', 'create', 'photo', 'generator', 'yt', 'video', 'download'],
    emoji: '📸',
    onClick: open('youtube-thumbnails'),
  },
];
