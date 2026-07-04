import { PiPencilLine } from 'react-icons/pi';
import { Tool } from '@hieudoanm.github.io/components/pages/start/components/cards/ToolCard';
import { ModalId } from '../types';

export const make = (open: (id: ModalId) => () => void): Tool[] => [
  {
    label: 'Write Tools',
    description: 'Writing tools',
    tags: [
      'writing',
      'content',
      'edit',
      'translate',
      'social',
      'business',
      'copy',
      'rewrite',
    ],
    icon: PiPencilLine,
    onClick: open('write'),
  },
];
