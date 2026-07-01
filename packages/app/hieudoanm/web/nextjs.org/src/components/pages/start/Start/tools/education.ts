import { Tool } from '@hieudoanm.github.io/components/pages/start/cards/ToolCard';
import { ModalId } from '../types';

export const make = (open: (id: ModalId) => () => void): Tool[] => [
  {
    label: 'DOI',
    description: 'Cite',
    tags: [
      'education',
      'learning',
      'study',
      'academic',
      'digital-object-identifier',
      'citation',
    ],
    emoji: '📄',
    onClick: open('doi'),
  },
  {
    label: 'English',
    description: 'Dictionary',
    tags: ['education', 'learning', 'study', 'academic'],
    emoji: '📚',
    onClick: open('english'),
  },
  {
    label: 'Flashcards',
    description: 'Words',
    tags: ['education', 'learning', 'study', 'academic'],
    emoji: '📓',
    onClick: open('flashcards'),
  },
  {
    label: 'Periodic Table',
    description: 'Elements',
    tags: ['education', 'learning', 'study', 'academic'],
    emoji: '📊',
    onClick: open('periodic-table'),
  },
  {
    label: 'Pitch',
    description: 'Training',
    tags: ['education', 'learning', 'study', 'academic'],
    emoji: '🎹',
    onClick: open('pitch'),
  },
  {
    label: 'Sign Language',
    description: 'Detection',
    tags: ['education', 'learning', 'study', 'academic'],
    emoji: '🤟',
    onClick: open('sign'),
  },
];
