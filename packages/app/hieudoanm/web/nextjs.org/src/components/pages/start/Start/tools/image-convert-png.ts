import { PiArrowsClockwise } from 'react-icons/pi';
import { Tool } from '@hieudoanm.github.io/components/pages/start/cards/ToolCard';
import { ModalId } from '../types';

export const make = (open: (id: ModalId) => () => void): Tool[] => [
  {
    label: 'PNG to AVIF',
    description: 'Convert',
    tags: ['image', 'convert'],
    icon: PiArrowsClockwise,
    onClick: open('image-convert-png-to-avif'),
  },
  {
    label: 'PNG to EPS',
    description: 'Convert',
    tags: ['image', 'convert'],
    icon: PiArrowsClockwise,
    onClick: open('image-convert-png-to-eps'),
  },
  {
    label: 'PNG to GIF',
    description: 'Convert',
    tags: ['image', 'convert'],
    icon: PiArrowsClockwise,
    onClick: open('image-convert-png-to-gif'),
  },
  {
    label: 'PNG to JPG',
    description: 'Convert',
    tags: ['image', 'convert'],
    icon: PiArrowsClockwise,
    onClick: open('image-convert-png-to-jpg'),
  },
  {
    label: 'PNG to SVG',
    description: 'Convert',
    tags: ['image', 'convert'],
    icon: PiArrowsClockwise,
    onClick: open('image-convert-png-to-svg'),
  },
  {
    label: 'PNG to TIFF',
    description: 'Convert',
    tags: ['image', 'convert'],
    icon: PiArrowsClockwise,
    onClick: open('image-convert-png-to-tiff'),
  },
  {
    label: 'PNG to WebP',
    description: 'Convert',
    tags: ['image', 'convert'],
    icon: PiArrowsClockwise,
    onClick: open('image-convert-png-to-webp'),
  },
];
