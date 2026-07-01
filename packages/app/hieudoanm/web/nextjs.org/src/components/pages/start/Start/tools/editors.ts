import {
  PiFileText,
  PiMagnifyingGlass,
  PiNotePencil,
  PiPenNib,
  PiPresentation,
} from 'react-icons/pi';
import { Tool } from '@hieudoanm.github.io/components/pages/start/cards/ToolCard';
import { ModalId } from '../types';

export const make = (open: (id: ModalId) => () => void): Tool[] => [
  {
    label: 'JSON Schema',
    description: 'Validator',
    tags: ['editor', 'edit', 'text', 'javascript-object-notation', 'data'],
    icon: PiFileText,
    onClick: open('json-schema'),
  },
  {
    label: 'Manifest',
    description: 'JSON Editor',
    tags: ['text', 'javascript-object-notation', 'data', 'modify', 'change'],
    icon: PiFileText,
    onClick: open('manifest'),
  },
  {
    label: 'Markdown',
    description: 'Markdown Editor',
    tags: ['text', 'md', 'readme', 'markup', 'modify', 'change'],
    icon: PiFileText,
    onClick: open('markdown'),
  },
  {
    label: 'Redact',
    description: 'PDF Redactor',
    tags: ['editor', 'edit', 'text', 'document', 'adobe', 'acrobat'],
    icon: PiPenNib,
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
    icon: PiMagnifyingGlass,
    onClick: open('regex'),
  },
  {
    label: 'Resume',
    description: 'Resume Builder',
    tags: ['editor', 'edit', 'text'],
    icon: PiFileText,
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
    icon: PiPresentation,
    onClick: open('slides'),
  },
  {
    label: 'Word Counter',
    description: 'Data',
    tags: ['utility', 'tool', 'docx', 'doc', 'microsoft-word', 'tally'],
    icon: PiNotePencil,
    onClick: open('word-counter'),
  },
];
