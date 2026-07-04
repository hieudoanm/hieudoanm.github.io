import {
  PiArrowsDownUp,
  PiGlobe,
  PiGridFour,
  PiMapTrifold,
  PiSortAscending,
  PiSmiley,
} from 'react-icons/pi';
import { Tool } from '@hieudoanm.github.io/components/pages/start/components/cards/ToolCard';
import { ModalId } from '../types';

export const make = (open: (id: ModalId) => () => void): Tool[] => [
  {
    label: 'Border',
    description: 'Guess the neighbor',
    tags: ['game', 'fun', 'entertainment', 'geography'],
    icon: PiMapTrifold,
    onClick: open('countries-border'),
  },
  {
    label: 'Connection',
    description: 'Group countries by category',
    tags: ['game', 'fun', 'entertainment', 'geography'],
    icon: PiGridFour,
    onClick: open('countries-connection'),
  },
  {
    label: 'Continents Sort',
    description: 'Drag countries into continents',
    tags: ['game', 'fun', 'entertainment', 'geography'],
    icon: PiSortAscending,
    onClick: open('countries-continents-sort'),
  },
  {
    label: 'Emoji Guesser',
    description: 'Pick the flag',
    tags: ['game', 'fun', 'entertainment'],
    icon: PiSmiley,
    onClick: open('emoji-guesser'),
  },
  {
    label: 'Flag Guesser',
    description: 'Name the country',
    tags: ['game', 'fun', 'entertainment'],
    icon: PiGlobe,
    onClick: open('flag-guesser'),
  },
  {
    label: 'Higher or Lower',
    description: 'Compare populations',
    tags: ['game', 'fun', 'entertainment', 'geography'],
    icon: PiArrowsDownUp,
    onClick: open('countries-higher-lower'),
  },
];
