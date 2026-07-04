import { PiBook, PiGlobe, PiScales } from 'react-icons/pi';
import { Tool } from '@hieudoanm.github.io/components/pages/start/components/cards/ToolCard';
import { ModalId } from '../types';

export const make = (open: (id: ModalId) => () => void): Tool[] => [
  {
    label: 'Flag Guesser',
    description: 'Name the country',
    tags: ['game', 'fun', 'entertainment'],
    icon: PiGlobe,
    onClick: open('flag-guesser'),
  },
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
