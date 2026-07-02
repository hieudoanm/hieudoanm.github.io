import {
  PiBooks,
  PiChartBar,
  PiFileText,
  PiHandPeace,
  PiNotebook,
  PiPianoKeys,
} from 'react-icons/pi';
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
    icon: PiFileText,
    onClick: open('doi'),
  },
  {
    label: 'English',
    description: 'Dictionary',
    tags: ['education', 'learning', 'study', 'academic'],
    icon: PiBooks,
    onClick: open('english'),
  },
  {
    label: 'Flashcards',
    description: 'Words',
    tags: ['education', 'learning', 'study', 'academic'],
    icon: PiNotebook,
    onClick: open('flashcards'),
  },
  {
    label: 'Periodic Table',
    description: 'Elements',
    tags: ['education', 'learning', 'study', 'academic'],
    icon: PiChartBar,
    onClick: open('periodic-table'),
  },
  {
    label: 'Pitch',
    description: 'Training',
    tags: ['education', 'learning', 'study', 'academic'],
    icon: PiPianoKeys,
    onClick: open('pitch'),
  },
  {
    label: 'Sign Language',
    description: 'Detection',
    tags: ['education', 'learning', 'study', 'academic'],
    icon: PiHandPeace,
    onClick: open('sign'),
  },
];
