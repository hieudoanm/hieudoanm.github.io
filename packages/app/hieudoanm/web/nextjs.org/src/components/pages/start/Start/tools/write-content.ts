import { Tool } from '@hieudoanm.github.io/components/pages/start/cards/ToolCard';
import { ModalId } from '../types';

export const make = (open: (id: ModalId) => () => void): Tool[] => [
  {
    label: 'Content Brief',
    description: 'Write',
    tags: ['writing', 'copy'],
    emoji: '✍️',
    color: '#8b5cf6',
    onClick: open('write-content-brief'),
  },
  {
    label: 'Content Planner',
    description: 'Write',
    tags: ['writing', 'copy'],
    emoji: '✍️',
    color: '#8b5cf6',
    onClick: open('write-content-planner'),
  },
  {
    label: 'FAQ',
    description: 'Write',
    tags: ['content', 'writing', 'copy'],
    emoji: '✍️',
    color: '#8b5cf6',
    onClick: open('write-faq'),
  },
  {
    label: 'Poll',
    description: 'Write',
    tags: ['content', 'writing', 'copy'],
    emoji: '✍️',
    color: '#8b5cf6',
    onClick: open('write-poll'),
  },
  {
    label: 'Trivia',
    description: 'Write',
    tags: ['content', 'writing', 'copy'],
    emoji: '✍️',
    color: '#8b5cf6',
    onClick: open('write-trivia'),
  },
];
