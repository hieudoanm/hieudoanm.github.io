import { Tool } from '@hieudoanm.github.io/components/pages/start/cards/ToolCard';
import { ModalId } from '../types';

export const make = (open: (id: ModalId) => () => void): Tool[] => [
  {
    label: 'Create ZIP',
    description: 'Data',
    tags: ['utility', 'tool'],
    emoji: '🗜️',
    color: '#10b981',
    onClick: open('create-zip'),
  },
];
