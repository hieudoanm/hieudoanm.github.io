import { PiFileText } from 'react-icons/pi';
import { Tool } from '@hieudoanm.github.io/components/pages/start/components/cards/ToolCard';
import { ModalId } from '../types';

export const make = (open: (id: ModalId) => () => void): Tool[] => [
  {
    label: 'PDF Tools',
    description: 'PDF',
    tags: [
      'pdf',
      'document',
      'adobe',
      'acrobat',
      'convert',
      'edit',
      'merge',
      'split',
      'compress',
      'ocr',
      'metadata',
    ],
    icon: PiFileText,
    onClick: open('pdf'),
  },
];
