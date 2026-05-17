import { PiGlobe, PiLock, PiPencilLine } from 'react-icons/pi';
import { Tool } from '@hieudoanm.github.io/components/pages/start/cards/ToolCard';
import { ModalId } from '../types';

export const make = (open: (id: ModalId) => () => void): Tool[] => [
  {
    label: 'eSign',
    description: 'Sign PDF',
    tags: ['document', 'utility', 'adobe', 'acrobat'],
    icon: PiPencilLine,
    onClick: open('pdf-esign'),
  },
  {
    label: 'Security',
    description: 'Encrypt/Decrypt',
    tags: ['pdf', 'document', 'utility'],
    icon: PiLock,
    onClick: open('pdf-security'),
  },
  {
    label: 'Translate',
    description: 'PDF',
    tags: [
      'document',
      'utility',
      'translation',
      'language',
      'i18n',
      'adobe',
      'acrobat',
    ],
    icon: PiGlobe,
    onClick: open('pdf-translate'),
  },
];
