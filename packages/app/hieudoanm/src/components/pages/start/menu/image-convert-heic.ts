import { PiArrowsClockwise } from 'react-icons/pi';
import { Tool } from '@hieudoanm.github.io/components/pages/start/components/cards/ToolCard';
import { ModalId } from '../types';

export const make = (open: (id: ModalId) => () => void): Tool[] => [
  {
    label: 'HEIC to AVIF',
    description: 'Convert',
    tags: ['image', 'convert'],
    icon: PiArrowsClockwise,
    onClick: open('image-convert-heic-to-avif'),
  },
  {
    label: 'HEIC to JPG',
    description: 'Convert',
    tags: ['image', 'convert'],
    icon: PiArrowsClockwise,
    onClick: open('image-convert-heic-to-jpg'),
  },
  {
    label: 'HEIC to PNG',
    description: 'Convert',
    tags: ['image', 'convert'],
    icon: PiArrowsClockwise,
    onClick: open('image-convert-heic-to-png'),
  },
];
