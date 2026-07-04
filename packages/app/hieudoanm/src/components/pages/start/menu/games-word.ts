import { PiRepeat, PiShuffle, PiSquare } from 'react-icons/pi';
import { Tool } from '@hieudoanm.github.io/components/pages/start/components/cards/ToolCard';
import { ModalId } from '../types';

export const make = (open: (id: ModalId) => () => void): Tool[] => [
  {
    label: 'Palindrome',
    description: 'Palindrome',
    tags: ['game', 'fun', 'entertainment'],
    icon: PiRepeat,
    onClick: open('palindrome'),
  },
  {
    label: 'Typoglycemia',
    description: 'Scrambled text',
    tags: ['game', 'fun', 'entertainment'],
    icon: PiShuffle,
    onClick: open('typoglycemia'),
  },
  {
    label: 'Wordle',
    description: 'Guess the word',
    tags: ['game', 'fun', 'entertainment', 'docx', 'doc', 'microsoft-word'],
    icon: PiSquare,
    onClick: open('wordle'),
  },
];
