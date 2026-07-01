import { Tool } from '@hieudoanm.github.io/components/pages/start/cards/ToolCard';
import { ModalId } from '../types';

export const make = (open: (id: ModalId) => () => void): Tool[] => [
  {
    label: 'Ai Colorize',
    description: '',
    tags: [],
    emoji: '🔧',
    onClick: open('ai-colorize'),
  },
  {
    label: 'Colors',
    description: '',
    tags: [],
    emoji: '🔧',
    onClick: open('colors'),
  },
  {
    label: 'Contrast Checker',
    description: '',
    tags: [],
    emoji: '🔧',
    onClick: open('contrast-checker'),
  },
  {
    label: 'Gradient Generator',
    description: '',
    tags: [],
    emoji: '🔧',
    onClick: open('gradient-generator'),
  },
  {
    label: 'Image Colorize',
    description: '',
    tags: [],
    emoji: '🔧',
    onClick: open('image-colorize'),
  },
  {
    label: 'Image Dominant Color',
    description: '',
    tags: [],
    emoji: '🔧',
    onClick: open('image-dominant-color'),
  },
];
