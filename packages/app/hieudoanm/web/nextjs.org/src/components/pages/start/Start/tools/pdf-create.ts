import { PiFileText } from 'react-icons/pi';
import { Tool } from '@hieudoanm.github.io/components/pages/start/cards/ToolCard';
import { ModalId } from '../types';

export const make = (open: (id: ModalId) => () => void): Tool[] => [
  {
    label: 'EPUB to PDF',
    description: 'PDF',
    tags: ['create', 'document', 'word', 'adobe', 'acrobat'],
    icon: PiFileText,
    onClick: open('epub-to-pdf'),
  },
  {
    label: 'Images to PDF',
    description: 'PDF',
    tags: ['create', 'document', 'word', 'adobe', 'acrobat'],
    icon: PiFileText,
    onClick: open('images-to-pdf'),
  },
  {
    label: 'MD to PDF',
    description: 'PDF',
    tags: ['create', 'document', 'word', 'adobe', 'acrobat'],
    icon: PiFileText,
    onClick: open('create-md-to-pdf'),
  },
  {
    label: 'PPT to PDF',
    description: 'PDF',
    tags: ['create', 'document', 'word', 'adobe', 'acrobat'],
    icon: PiFileText,
    onClick: open('ppt-to-pdf'),
  },
  {
    label: 'Text to PDF',
    description: 'PDF',
    tags: ['create', 'document', 'word', 'adobe', 'acrobat'],
    icon: PiFileText,
    onClick: open('create-text-to-pdf'),
  },
  {
    label: 'Fetch URL to PDF',
    description: 'PDF',
    tags: ['create', 'document', 'word', 'adobe', 'acrobat'],
    icon: PiFileText,
    onClick: open('create-url-to-pdf'),
  },
  {
    label: 'URL to PDF',
    description: 'PDF',
    tags: ['create', 'document', 'word', 'adobe', 'acrobat'],
    icon: PiFileText,
    onClick: open('url-to-pdf'),
  },
  {
    label: 'Word to PDF',
    description: 'PDF',
    tags: [
      'create',
      'document',
      'docx',
      'doc',
      'microsoft-word',
      'adobe',
      'acrobat',
    ],
    icon: PiFileText,
    onClick: open('word-to-pdf'),
  },
];
