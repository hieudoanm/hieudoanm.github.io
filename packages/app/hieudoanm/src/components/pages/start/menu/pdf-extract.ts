import { PiFileText } from 'react-icons/pi';
import { Tool } from '@hieudoanm.github.io/components/pages/start/components/cards/ToolCard';
import { ModalId } from '../types';

export const make = (open: (id: ModalId) => () => void): Tool[] => [
  {
    label: 'Extract Images',
    description: 'PDF',
    tags: ['document', 'adobe', 'acrobat'],
    icon: PiFileText,
    onClick: open('pdf-extract-images'),
  },
  {
    label: 'Extract Text',
    description: 'PDF',
    tags: ['document', 'adobe', 'acrobat'],
    icon: PiFileText,
    onClick: open('pdf-extract-text'),
  },
  {
    label: 'Info',
    description: 'PDF',
    tags: ['extract', 'document', 'adobe', 'acrobat'],
    icon: PiFileText,
    onClick: open('pdf-info'),
  },
  {
    label: 'Metadata',
    description: 'PDF',
    tags: ['extract', 'document', 'adobe', 'acrobat'],
    icon: PiFileText,
    onClick: open('pdf-metadata'),
  },
  {
    label: 'OCR',
    description: 'PDF',
    tags: ['extract', 'document', 'adobe', 'acrobat'],
    icon: PiFileText,
    onClick: open('pdf-ocr'),
  },
  {
    label: 'Repair',
    description: 'PDF',
    tags: ['extract', 'document', 'adobe', 'acrobat'],
    icon: PiFileText,
    onClick: open('pdf-repair'),
  },
];
