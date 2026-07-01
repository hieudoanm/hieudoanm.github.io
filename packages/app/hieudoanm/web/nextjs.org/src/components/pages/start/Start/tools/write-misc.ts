import { Tool } from '@hieudoanm.github.io/components/pages/start/cards/ToolCard';
import { ModalId } from '../types';

export const make = (open: (id: ModalId) => () => void): Tool[] => [
  {
    label: 'AI Detector',
    description: 'Write',
    tags: ['writing', 'text'],
    emoji: '✍️',
    onClick: open('write-ai-detector'),
  },
  {
    label: 'Explain',
    description: 'Write',
    tags: ['writing', 'text'],
    emoji: '✍️',
    onClick: open('write-explain'),
  },
  {
    label: 'Summarize Podcast',
    description: 'Write',
    tags: ['writing', 'text'],
    emoji: '✍️',
    onClick: open('write-summarize-podcast'),
  },
  {
    label: 'Summarize YouTube',
    description: 'Write',
    tags: ['writing', 'text', 'yt', 'video', 'download'],
    emoji: '✍️',
    onClick: open('write-summarize-youtube'),
  },
  {
    label: 'Title Generator',
    description: 'Write',
    tags: ['writing', 'text', 'create', 'maker', 'builder'],
    emoji: '✍️',
    onClick: open('write-title'),
  },
];
