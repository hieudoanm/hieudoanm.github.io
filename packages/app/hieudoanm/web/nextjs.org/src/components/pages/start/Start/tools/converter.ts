import { Tool } from '@hieudoanm.github.io/components/pages/start/cards/ToolCard';
import { ModalId } from '../types';

export const make = (open: (id: ModalId) => () => void): Tool[] => [
  {
    label: 'Angle',
    description: 'Converter',
    tags: ['unit-converter', 'transform', 'change'],
    emoji: '📐',
    onClick: open('angle'),
  },
  {
    label: 'Base',
    description: 'Converter',
    tags: ['unit-converter', 'transform', 'change'],
    emoji: '💻',
    onClick: open('base'),
  },
  {
    label: 'Calculator',
    description: 'Math',
    tags: ['converter', 'unit-converter', 'arithmetic'],
    emoji: '➗',
    onClick: open('calculator'),
  },
  {
    label: 'Data',
    description: 'Converter',
    tags: ['unit-converter', 'transform', 'change'],
    emoji: '💾',
    onClick: open('data'),
  },
  {
    label: 'Length',
    description: 'Converter',
    tags: ['unit-converter', 'transform', 'change'],
    emoji: '📏',
    onClick: open('length'),
  },
  {
    label: 'Roman',
    description: 'Converter',
    tags: ['unit-converter', 'transform', 'change'],
    emoji: '🏛️',
    onClick: open('roman'),
  },
  {
    label: 'Temperature',
    description: 'Converter',
    tags: ['unit-converter', 'transform', 'change'],
    emoji: '🌡️',
    onClick: open('temperature'),
  },
  {
    label: 'Time',
    description: 'Converter',
    tags: [
      'unit-converter',
      'timezone',
      'world-clock',
      'time-converter',
      'clock',
      'transform',
      'change',
    ],
    emoji: '⏰',
    onClick: open('time'),
  },
  {
    label: 'Weight',
    description: 'Converter',
    tags: ['unit-converter', 'transform', 'change'],
    emoji: '⚖️',
    onClick: open('weight'),
  },
];
