import { Tool } from '@hieudoanm.github.io/components/pages/start/cards/ToolCard';
import { ModalId } from '../types';

export const make = (open: (id: ModalId) => () => void): Tool[] => [
  {
    label: 'Blackjack',
    description: 'Cards Counter',
    tags: [
      'casino',
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
      'casino',
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
];
