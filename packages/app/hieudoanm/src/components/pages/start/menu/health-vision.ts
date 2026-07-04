import { PiEyes } from 'react-icons/pi';
import { Tool } from '@hieudoanm.github.io/components/pages/start/components/cards/ToolCard';
import { ModalId } from '../types';

export const make = (open: (id: ModalId) => () => void): Tool[] => [
  {
    label: 'LogMAR Chart',
    description: 'LogMAR Chart',
    tags: ['eyes', 'vision', 'eye-test', 'sight'],
    icon: PiEyes,
    onClick: open('logmar'),
  },
  {
    label: 'Snellen Chart',
    description: 'Snellen Chart',
    tags: ['eyes', 'vision', 'eye-test', 'sight'],
    icon: PiEyes,
    onClick: open('snellen'),
  },
  {
    label: 'Tumbling E Chart',
    description: 'Tumbling E Chart',
    tags: ['eyes', 'vision', 'eye-test', 'sight'],
    icon: PiEyes,
    onClick: open('tumbling-e'),
  },
];
