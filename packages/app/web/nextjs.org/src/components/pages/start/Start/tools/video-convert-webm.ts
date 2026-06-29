import { Tool } from '@hieudoanm.github.io/components/pages/start/cards/ToolCard';
import { ModalId } from '../types';

export const make = (open: (id: ModalId) => () => void): Tool[] => [
  {
    label: 'WebM to MP3',
    description: 'Video',
    tags: ['media', 'convert'],
    emoji: '🎬',
    color: '#ef4444',
    onClick: open('video-webm-to-mp3'),
  },
];
