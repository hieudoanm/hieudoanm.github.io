import {
  PiAlarm,
  PiBuildings,
  PiDivide,
  PiFloppyDisk,
  PiLaptop,
  PiRuler,
  PiScales,
  PiThermometer,
} from 'react-icons/pi';
import { Tool } from '@hieudoanm.github.io/components/pages/start/components/cards/ToolCard';
import { ModalId } from '../types';

export const make = (open: (id: ModalId) => () => void): Tool[] => [
  {
    label: 'Angle',
    description: 'Converter',
    tags: ['unit-converter', 'transform', 'change'],
    icon: PiRuler,
    onClick: open('angle'),
  },
  {
    label: 'Base',
    description: 'Converter',
    tags: ['unit-converter', 'transform', 'change'],
    icon: PiLaptop,
    onClick: open('base'),
  },
  {
    label: 'Calculator',
    description: 'Math',
    tags: ['converter', 'unit-converter', 'arithmetic'],
    icon: PiDivide,
    onClick: open('calculator'),
  },
  {
    label: 'Data',
    description: 'Converter',
    tags: ['unit-converter', 'transform', 'change'],
    icon: PiFloppyDisk,
    onClick: open('data'),
  },
  {
    label: 'Length',
    description: 'Converter',
    tags: ['unit-converter', 'transform', 'change'],
    icon: PiRuler,
    onClick: open('length'),
  },
  {
    label: 'Roman',
    description: 'Converter',
    tags: ['unit-converter', 'transform', 'change'],
    icon: PiBuildings,
    onClick: open('roman'),
  },
  {
    label: 'Temperature',
    description: 'Converter',
    tags: ['unit-converter', 'transform', 'change'],
    icon: PiThermometer,
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
    icon: PiAlarm,
    onClick: open('time'),
  },
  {
    label: 'Weight',
    description: 'Converter',
    tags: ['unit-converter', 'transform', 'change'],
    icon: PiScales,
    onClick: open('weight'),
  },
];
