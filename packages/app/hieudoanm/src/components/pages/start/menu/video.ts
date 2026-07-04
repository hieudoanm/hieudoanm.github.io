import { PiVideoCamera } from 'react-icons/pi';
import { Tool } from '@hieudoanm.github.io/components/pages/start/components/cards/ToolCard';
import { ModalId } from '../types';

export const make = (open: (id: ModalId) => () => void): Tool[] => [
  {
    label: 'Video Tools',
    description: 'Video tools',
    tags: [
      'video',
      'convert',
      'edit',
      'download',
      'audio',
      'media',
      'mp4',
      'clip',
      'movie',
      'footage',
    ],
    icon: PiVideoCamera,
    onClick: open('video'),
  },
];
