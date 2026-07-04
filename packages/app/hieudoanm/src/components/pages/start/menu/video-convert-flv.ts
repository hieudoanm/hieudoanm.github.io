import { PiVideoCamera } from 'react-icons/pi';
import { Tool } from '@hieudoanm.github.io/components/pages/start/components/cards/ToolCard';
import { ModalId } from '../types';

export const make = (open: (id: ModalId) => () => void): Tool[] => [
  {
    label: 'FLV to MP4',
    description: 'Video',
    tags: ['media', 'convert'],
    icon: PiVideoCamera,
    onClick: open('video-flv-to-mp4'),
  },
];
