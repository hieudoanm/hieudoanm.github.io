import { Tool } from '@hieudoanm.github.io/components/pages/start/cards/ToolCard';
import { ModalId } from '../types';

export const make = (open: (id: ModalId) => () => void): Tool[] => [
  {
    label: 'Palindrome',
    description: 'Palindrome',
    tags: ['game', 'fun', 'entertainment'],
    emoji: '🔁',
    color: '#f59e0b',
    onClick: open('palindrome'),
  },
  {
    label: 'Typoglycemia',
    description: 'Scrambled text',
    tags: ['game', 'fun', 'entertainment'],
    emoji: '🔀',
    color: '#f59e0b',
    onClick: open('typoglycemia'),
  },
  {
    label: 'Wordle',
    description: 'Guess the word',
    tags: ['game', 'fun', 'entertainment', 'docx', 'doc', 'microsoft-word'],
    emoji: '🟩',
    color: '#f59e0b',
    onClick: open('wordle'),
  },
];
