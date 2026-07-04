import { PiTextT, PiWrench } from 'react-icons/pi';
import { Tool } from '@hieudoanm.github.io/components/pages/start/components/cards/ToolCard';
import { ModalId } from '../types';

export const make = (open: (id: ModalId) => () => void): Tool[] => [
  {
    label: 'Braille',
    description: '',
    tags: [],
    icon: PiWrench,
    onClick: open('braille'),
  },
  {
    label: 'Case',
    description: 'Converter',
    tags: [
      'developer',
      'programming',
      'code',
      'dev-tools',
      'transform',
      'change',
    ],
    icon: PiTextT,
    onClick: open('text-case'),
  },
  {
    label: 'Leet Speak',
    description: '',
    tags: [],
    icon: PiWrench,
    onClick: open('leetspeak'),
  },
  {
    label: 'Morse',
    description: '',
    tags: [],
    icon: PiWrench,
    onClick: open('morse'),
  },
];
