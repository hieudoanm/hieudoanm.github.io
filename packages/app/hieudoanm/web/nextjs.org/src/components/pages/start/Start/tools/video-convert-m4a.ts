import { Tool } from '@hieudoanm.github.io/components/pages/start/cards/ToolCard';
import { ModalId } from '../types';

export const make = (open: (id: ModalId) => () => void): Tool[] => [
  {
    label: 'M4A to MP3',
    description: 'Video',
    tags: ['media', 'convert'],
    emoji: '🎬',
    onClick: open('video-m4a-to-mp3'),
  },
  {
    label: 'M4A to MP4',
    description: 'Video',
    tags: ['media', 'convert'],
    emoji: '🎬',
    onClick: open('video-m4a-to-mp4'),
  },
  {
    label: 'M4A to WAV',
    description: 'Video',
    tags: ['media', 'convert'],
    emoji: '🎬',
    onClick: open('video-m4a-to-wav'),
  },
];
