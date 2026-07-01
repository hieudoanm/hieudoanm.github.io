import { Tool } from '@hieudoanm.github.io/components/pages/start/cards/ToolCard';
import { ModalId } from '../types';

export const make = (open: (id: ModalId) => () => void): Tool[] => [
  {
    label: 'Complete',
    description: 'Write',
    tags: ['edit', 'rewrite', 'writing'],
    emoji: '✍️',
    onClick: open('write-complete'),
  },
  {
    label: 'Grammar Check',
    description: 'Write',
    tags: ['edit', 'rewrite', 'writing'],
    emoji: '✍️',
    onClick: open('write-grammar'),
  },
  {
    label: 'Humanizer',
    description: 'Write',
    tags: ['edit', 'rewrite', 'writing'],
    emoji: '✍️',
    onClick: open('write-humanizer'),
  },
  {
    label: 'Improve Text',
    description: 'Write',
    tags: ['edit', 'rewrite', 'writing'],
    emoji: '✍️',
    onClick: open('write-improve-text'),
  },
  {
    label: 'Paraphrase',
    description: 'Write',
    tags: ['edit', 'rewrite', 'writing'],
    emoji: '✍️',
    onClick: open('write-paraphrase'),
  },
  {
    label: 'Rewrite',
    description: 'Write',
    tags: ['edit', 'writing'],
    emoji: '✍️',
    onClick: open('write-rewrite'),
  },
  {
    label: 'Shorten Text',
    description: 'Write',
    tags: ['edit', 'rewrite', 'writing'],
    emoji: '✍️',
    onClick: open('write-shorten'),
  },
  {
    label: 'Summarize',
    description: 'Write',
    tags: ['edit', 'rewrite', 'writing'],
    emoji: '✍️',
    onClick: open('write-summarize'),
  },
  {
    label: 'Tone Changer',
    description: 'Write',
    tags: ['edit', 'rewrite', 'writing'],
    emoji: '✍️',
    onClick: open('write-tone'),
  },
  {
    label: 'Translate',
    description: 'Write',
    tags: ['edit', 'rewrite', 'writing', 'translation', 'language', 'i18n'],
    emoji: '✍️',
    onClick: open('write-translate'),
  },
];
