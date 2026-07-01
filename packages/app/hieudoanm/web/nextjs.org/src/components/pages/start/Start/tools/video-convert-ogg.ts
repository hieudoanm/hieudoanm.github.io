import { Tool } from '@hieudoanm.github.io/components/pages/start/cards/ToolCard';
import { ModalId } from '../types';

export const make = (open: (id: ModalId) => () => void): Tool[] => [
  {
    label: 'OGG to MP3',
    description: 'Video',
    tags: ['media', 'convert'],
    emoji: '🎬',
    onClick: open('video-ogg-to-mp3'),
  },
  {
    label: 'OGG to WAV',
    description: 'Video',
    tags: ['media', 'convert'],
    emoji: '🎬',
    onClick: open('video-ogg-to-wav'),
  },
];
