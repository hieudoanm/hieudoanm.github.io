import { PiPencilLine } from 'react-icons/pi';
import { Tool } from '@hieudoanm.github.io/components/pages/start/cards/ToolCard';
import { ModalId } from '../types';

export const make = (open: (id: ModalId) => () => void): Tool[] => [
  {
    label: 'AI Detector',
    description: 'Write',
    tags: ['writing', 'text'],
    icon: PiPencilLine,
    onClick: open('write-ai-detector'),
  },
  {
    label: 'Explain',
    description: 'Write',
    tags: ['writing', 'text'],
    icon: PiPencilLine,
    onClick: open('write-explain'),
  },
  {
    label: 'Summarize Podcast',
    description: 'Write',
    tags: ['writing', 'text'],
    icon: PiPencilLine,
    onClick: open('write-summarize-podcast'),
  },
  {
    label: 'Summarize YouTube',
    description: 'Write',
    tags: ['writing', 'text', 'yt', 'video', 'download'],
    icon: PiPencilLine,
    onClick: open('write-summarize-youtube'),
  },
  {
    label: 'Title Generator',
    description: 'Write',
    tags: ['writing', 'text', 'create', 'maker', 'builder'],
    icon: PiPencilLine,
    onClick: open('write-title'),
  },
];
