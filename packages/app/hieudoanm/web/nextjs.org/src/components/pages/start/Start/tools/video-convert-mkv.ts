import { Tool } from '@hieudoanm.github.io/components/pages/start/cards/ToolCard';
import { ModalId } from '../types';

export const make = (open: (id: ModalId) => () => void): Tool[] => [
  {
    label: 'MKV to GIF',
    description: 'Video',
    tags: ['media', 'convert'],
    emoji: '🎬',
    onClick: open('video-mkv-to-gif'),
  },
  {
    label: 'MKV to MP3',
    description: 'Video',
    tags: ['media', 'convert'],
    emoji: '🎬',
    onClick: open('video-mkv-to-mp3'),
  },
  {
    label: 'MKV to MP4',
    description: 'Video',
    tags: ['media', 'convert'],
    emoji: '🎬',
    onClick: open('video-mkv-to-mp4'),
  },
];
