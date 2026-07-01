import { Tool } from '@hieudoanm.github.io/components/pages/start/cards/ToolCard';
import { ModalId } from '../types';

export const make = (open: (id: ModalId) => () => void): Tool[] => [
  {
    label: 'WMV to MP4',
    description: 'Video',
    tags: ['media', 'convert'],
    emoji: '🎬',
    onClick: open('video-wmv-to-mp4'),
  },
];
