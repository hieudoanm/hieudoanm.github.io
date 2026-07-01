import { Tool } from '@hieudoanm.github.io/components/pages/start/cards/ToolCard';
import { ModalId } from '../types';

export const make = (open: (id: ModalId) => () => void): Tool[] => [
  {
    label: 'LogMAR Chart',
    description: 'LogMAR Chart',
    tags: ['eyes', 'vision', 'eye-test', 'sight'],
    emoji: '👀',
    onClick: open('logmar'),
  },
  {
    label: 'Snellen Chart',
    description: 'Snellen Chart',
    tags: ['eyes', 'vision', 'eye-test', 'sight'],
    emoji: '👀',
    onClick: open('snellen'),
  },
  {
    label: 'Tumbling E Chart',
    description: 'Tumbling E Chart',
    tags: ['eyes', 'vision', 'eye-test', 'sight'],
    emoji: '👀',
    onClick: open('tumbling-e'),
  },
];
