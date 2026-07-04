import { PiVideoCamera } from 'react-icons/pi';
import { Tool } from '@hieudoanm.github.io/components/pages/start/components/cards/ToolCard';
import { ModalId } from '../types';

export const make = (open: (id: ModalId) => () => void): Tool[] => [
  {
    label: 'OGG to MP3',
    description: 'Video',
    tags: ['media', 'convert'],
    icon: PiVideoCamera,
    onClick: open('video-ogg-to-mp3'),
  },
  {
    label: 'OGG to WAV',
    description: 'Video',
    tags: ['media', 'convert'],
    icon: PiVideoCamera,
    onClick: open('video-ogg-to-wav'),
  },
];
