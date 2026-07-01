import { PiFileText } from 'react-icons/pi';
import { Tool } from '@hieudoanm.github.io/components/pages/start/cards/ToolCard';
import { ModalId } from '../types';

export const make = (open: (id: ModalId) => () => void): Tool[] => [
  {
    label: 'PDF to EPUB',
    description: 'PDF',
    tags: ['convert', 'document', 'adobe', 'acrobat'],
    icon: PiFileText,
    onClick: open('pdf-to-epub'),
  },
  {
    label: 'PDF to Excel',
    description: 'PDF',
    tags: [
      'convert',
      'document',
      'adobe',
      'acrobat',
      'xlsx',
      'xls',
      'spreadsheet',
      'microsoft-excel',
    ],
    icon: PiFileText,
    onClick: open('pdf-to-excel'),
  },
  {
    label: 'PDF to Images',
    description: 'PDF',
    tags: ['convert', 'document', 'adobe', 'acrobat'],
    icon: PiFileText,
    onClick: open('pdf-to-images'),
  },
  {
    label: 'PDF to PPT',
    description: 'PDF',
    tags: ['convert', 'document', 'adobe', 'acrobat'],
    icon: PiFileText,
    onClick: open('pdf-to-ppt'),
  },
  {
    label: 'PDF to Word',
    description: 'PDF',
    tags: [
      'convert',
      'document',
      'adobe',
      'acrobat',
      'docx',
      'doc',
      'microsoft-word',
    ],
    icon: PiFileText,
    onClick: open('pdf-to-word'),
  },
];
