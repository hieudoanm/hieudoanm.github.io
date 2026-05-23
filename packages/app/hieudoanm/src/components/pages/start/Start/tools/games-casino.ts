import { PiBank, PiCards, PiCoin, PiDiceOne } from 'react-icons/pi';
import { Tool } from '@hieudoanm.github.io/components/pages/start/cards/ToolCard';
import { ModalId } from '../types';

export const make = (open: (id: ModalId) => () => void): Tool[] => [
  {
    label: 'Baccarat',
    description: 'Card game',
    tags: ['games-casino', 'gambling', 'card-game', 'baccarat'],
    icon: PiBank,
    onClick: open('tai-baccarat'),
  },
  {
    label: 'Blackjack',
    description: 'Cards Counter',
    tags: [
      'games-casino',
      'gambling',
      'card-game',
      'bj',
      '21',
      'black-jack',
      'tally',
    ],
    icon: PiCards,
    onClick: open('blackjack'),
  },
  {
    label: 'Poker',
    description: 'Odds Calculator',
    tags: [
      'games-casino',
      'gambling',
      'card-game',
      'texas-holdem',
      'holdem',
      'cards',
      'hand',
      'math',
      'arithmetic',
    ],
    icon: PiCards,
    onClick: open('poker'),
  },
  {
    label: 'Dice Game',
    description: 'Over/Under 7',
    tags: ['games-casino', 'gambling', 'dice', 'craps'],
    icon: PiDiceOne,
    onClick: open('dice-game'),
  },
  {
    label: 'Slot Machine',
    description: '3 reels',
    tags: ['games-casino', 'gambling', 'slots'],
    icon: PiCoin,
    onClick: open('slot-machine'),
  },
];
