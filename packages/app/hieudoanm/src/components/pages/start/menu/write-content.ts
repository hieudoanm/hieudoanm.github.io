import { PiPencilLine } from 'react-icons/pi';
import { Tool } from '@hieudoanm.github.io/components/pages/start/components/cards/ToolCard';
import { ModalId } from '../types';

export const make = (open: (id: ModalId) => () => void): Tool[] => [
  {
    label: 'Content Brief',
    description: 'Write',
    tags: ['writing', 'copy'],
    icon: PiPencilLine,
    onClick: open('write-content-brief'),
  },
  {
    label: 'Content Planner',
    description: 'Write',
    tags: ['writing', 'copy'],
    icon: PiPencilLine,
    onClick: open('write-content-planner'),
  },
  {
    label: 'FAQ',
    description: 'Write',
    tags: ['content', 'writing', 'copy'],
    icon: PiPencilLine,
    onClick: open('write-faq'),
  },
  {
    label: 'Poll',
    description: 'Write',
    tags: ['content', 'writing', 'copy'],
    icon: PiPencilLine,
    onClick: open('write-poll'),
  },
  {
    label: 'Trivia',
    description: 'Write',
    tags: ['content', 'writing', 'copy'],
    icon: PiPencilLine,
    onClick: open('write-trivia'),
  },
];
