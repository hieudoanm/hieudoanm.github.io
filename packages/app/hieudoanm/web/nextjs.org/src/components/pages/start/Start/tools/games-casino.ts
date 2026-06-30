import { Tool } from '@hieudoanm.github.io/components/pages/start/cards/ToolCard';
import { ModalId } from '../types';

export const make = (open: (id: ModalId) => () => void): Tool[] => [
  {
    label: 'Baccarat',
    description: 'Card game',
    tags: ['games-casino', 'gambling', 'card-game', 'baccarat'],
    emoji: '🏦',
    color: '#f59e0b',
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
    emoji: '🃏',
    color: '#f59e0b',
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
    emoji: '🃏',
    color: '#f59e0b',
    onClick: open('poker'),
  },
  {
    label: 'Slot Machine',
    description: '3 reels',
    tags: ['games-casino', 'gambling', 'slots'],
    emoji: '🎰',
    color: '#f59e0b',
    onClick: open('slot-machine'),
  },
];
