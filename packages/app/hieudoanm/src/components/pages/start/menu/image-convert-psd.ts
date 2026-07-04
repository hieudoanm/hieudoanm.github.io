import { PiArrowsClockwise } from 'react-icons/pi';
import { Tool } from '@hieudoanm.github.io/components/pages/start/components/cards/ToolCard';
import { ModalId } from '../types';

export const make = (open: (id: ModalId) => () => void): Tool[] => [
  {
    label: 'PSD to JPG',
    description: 'Convert',
    tags: ['image', 'convert'],
    icon: PiArrowsClockwise,
    onClick: open('image-convert-psd-to-jpg'),
  },
  {
    label: 'PSD to PNG',
    description: 'Convert',
    tags: ['image', 'convert'],
    icon: PiArrowsClockwise,
    onClick: open('image-convert-psd-to-png'),
  },
];
