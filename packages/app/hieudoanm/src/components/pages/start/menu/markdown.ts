import { PiFileCode, PiFileDoc, PiFileImage, PiFileText } from 'react-icons/pi';
import { Tool } from '@hieudoanm.github.io/components/pages/start/components/cards/ToolCard';
import { ModalId } from '../types';

export const make = (open: (id: ModalId) => () => void): Tool[] => [
  {
    label: 'MD to HTML',
    description: 'Convert',
    tags: ['markdown', 'convert', 'html', 'web'],
    icon: PiFileCode,
    onClick: open('markdown-to-html'),
  },
  {
    label: 'MD to Image',
    description: 'Convert',
    tags: ['markdown', 'convert', 'image', 'png'],
    icon: PiFileImage,
    onClick: open('markdown-to-image'),
  },
  {
    label: 'MD to PDF',
    description: 'Convert',
    tags: ['markdown', 'convert', 'pdf', 'document'],
    icon: PiFileText,
    onClick: open('markdown-to-pdf'),
  },
  {
    label: 'MD to Word',
    description: 'Convert',
    tags: ['markdown', 'convert', 'docx', 'word'],
    icon: PiFileDoc,
    onClick: open('markdown-to-docx'),
  },
];
