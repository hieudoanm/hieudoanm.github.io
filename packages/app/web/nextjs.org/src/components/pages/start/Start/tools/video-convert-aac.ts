import { Tool } from '@hieudoanm.github.io/components/pages/start/cards/ToolCard';
import { ModalId } from '../types';

export const make = (open: (id: ModalId) => () => void): Tool[] => [
  {
    label: 'AAC to MP3',
    description: 'Video',
    tags: ['media', 'convert'],
    emoji: '🎬',
    color: '#ef4444',
    onClick: open('video-aac-to-mp3'),
  },
  {
    label: 'AAC to MP4',
    description: 'Video',
    tags: ['media', 'convert'],
    emoji: '🎬',
    color: '#ef4444',
    onClick: open('video-aac-to-mp4'),
  },
  {
    label: 'AAC to WAV',
    description: 'Video',
    tags: ['media', 'convert'],
    emoji: '🎬',
    color: '#ef4444',
    onClick: open('video-aac-to-wav'),
  },
];
