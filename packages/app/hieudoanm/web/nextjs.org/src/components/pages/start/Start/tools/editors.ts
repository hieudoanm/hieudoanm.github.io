import { Tool } from '@hieudoanm.github.io/components/pages/start/cards/ToolCard';
import { ModalId } from '../types';

export const make = (open: (id: ModalId) => () => void): Tool[] => [
  {
    label: 'JSON Schema',
    description: 'Validator',
    tags: ['editor', 'edit', 'text', 'javascript-object-notation', 'data'],
    emoji: '📄',
    onClick: open('json-schema'),
  },
  {
    label: 'Manifest',
    description: 'JSON Editor',
    tags: ['text', 'javascript-object-notation', 'data', 'modify', 'change'],
    emoji: '📄',
    onClick: open('manifest'),
  },
  {
    label: 'Markdown',
    description: 'Markdown Editor',
    tags: ['text', 'md', 'readme', 'markup', 'modify', 'change'],
    emoji: '📄',
    onClick: open('markdown'),
  },
  {
    label: 'Redact',
    description: 'PDF Redactor',
    tags: ['editor', 'edit', 'text', 'document', 'adobe', 'acrobat'],
    emoji: '🖋️',
    onClick: open('redact'),
  },
  {
    label: 'Regex',
    description: 'Pattern Generator',
    tags: [
      'editor',
      'edit',
      'text',
      'regular-expression',
      'regexp',
      'create',
      'maker',
      'builder',
    ],
    emoji: '🔍',
    onClick: open('regex'),
  },
  {
    label: 'Resume',
    description: 'Resume Builder',
    tags: ['editor', 'edit', 'text'],
    emoji: '📄',
    onClick: open('resume'),
  },
  {
    label: 'Slides',
    description: 'Pitch Deck',
    tags: [
      'editor',
      'edit',
      'text',
      'presentation',
      'powerpoint',
      'google-slides',
    ],
    emoji: '📽️',
    onClick: open('slides'),
  },
  {
    label: 'Word Counter',
    description: 'Data',
    tags: ['utility', 'tool', 'docx', 'doc', 'microsoft-word', 'tally'],
    emoji: '📝',
    onClick: open('word-counter'),
  },
];
