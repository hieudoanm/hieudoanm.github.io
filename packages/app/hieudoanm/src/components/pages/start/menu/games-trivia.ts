import { PiBook, PiScales } from 'react-icons/pi';
import { Tool } from '@hieudoanm.github.io/components/pages/start/components/cards/ToolCard';
import { ModalId } from '../types';

export const make = (open: (id: ModalId) => () => void): Tool[] => [
  {
    label: 'PD',
    description: '',
    tags: ['game', 'fun', 'entertainment'],
    icon: PiScales,
    onClick: open('pd'),
  },
  {
    label: 'Pokedex',
    description: 'Pokemon',
    tags: ['game', 'fun', 'entertainment'],
    icon: PiBook,
    onClick: open('pokedex'),
  },
];
