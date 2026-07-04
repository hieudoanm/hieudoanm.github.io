import { PiWrench } from 'react-icons/pi';
import { Tool } from '@hieudoanm.github.io/components/pages/start/components/cards/ToolCard';
import { ModalId } from '../types';

export const make = (open: (id: ModalId) => () => void): Tool[] => [
  {
    label: 'Ai Colorize',
    description: '',
    tags: [],
    icon: PiWrench,
    onClick: open('ai-colorize'),
  },
  {
    label: 'Colors',
    description: '',
    tags: [],
    icon: PiWrench,
    onClick: open('colors'),
  },
  {
    label: 'Contrast Checker',
    description: '',
    tags: [],
    icon: PiWrench,
    onClick: open('contrast-checker'),
  },
  {
    label: 'Gradient Generator',
    description: '',
    tags: [],
    icon: PiWrench,
    onClick: open('gradient-generator'),
  },
  {
    label: 'Image Colorize',
    description: '',
    tags: [],
    icon: PiWrench,
    onClick: open('image-colorize'),
  },
  {
    label: 'Image Dominant Color',
    description: '',
    tags: [],
    icon: PiWrench,
    onClick: open('image-dominant-color'),
  },
];
