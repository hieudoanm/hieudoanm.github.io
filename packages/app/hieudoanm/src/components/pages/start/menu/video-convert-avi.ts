import { PiVideoCamera } from 'react-icons/pi';
import { Tool } from '@hieudoanm.github.io/components/pages/start/components/cards/ToolCard';
import { ModalId } from '../types';

export const make = (open: (id: ModalId) => () => void): Tool[] => [
  {
    label: 'AVI to GIF',
    description: 'Video',
    tags: ['media', 'convert'],
    icon: PiVideoCamera,
    onClick: open('video-avi-to-gif'),
  },
  {
    label: 'AVI to MP3',
    description: 'Video',
    tags: ['media', 'convert'],
    icon: PiVideoCamera,
    onClick: open('video-avi-to-mp3'),
  },
  {
    label: 'AVI to MP4',
    description: 'Video',
    tags: ['media', 'convert'],
    icon: PiVideoCamera,
    onClick: open('video-avi-to-mp4'),
  },
];
