import { PiFileText } from 'react-icons/pi';
import { Tool } from '@hieudoanm.github.io/components/pages/start/components/cards/ToolCard';
import { ModalId } from '../types';

export const make = (open: (id: ModalId) => () => void): Tool[] => [
  {
    label: 'Markdown',
    description: 'Markdown',
    tags: ['markdown', 'editor', 'convert', 'html', 'pdf', 'docx', 'image'],
    icon: PiFileText,
    onClick: open('markdown'),
  },
];
