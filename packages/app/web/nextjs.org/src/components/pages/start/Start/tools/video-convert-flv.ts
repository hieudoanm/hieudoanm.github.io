import { Tool } from '@hieudoanm.github.io/components/pages/start/cards/ToolCard';
import { ModalId } from '../types';

export const make = (open: (id: ModalId) => () => void): Tool[] => [
  {
    label: 'FLV to MP4',
    description: 'Video',
    tags: ['media', 'convert'],
    emoji: '🎬',
    color: '#ef4444',
    onClick: open('video-flv-to-mp4'),
  },
];
