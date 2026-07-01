import { Tool } from '@hieudoanm.github.io/components/pages/start/cards/ToolCard';
import { ModalId } from '../types';

export const make = (open: (id: ModalId) => () => void): Tool[] => [
  {
    label: 'AZW3 to EPUB',
    description: 'Ebook',
    tags: ['pdf', 'document'],
    emoji: '📄',
    onClick: open('azw3-to-epub'),
  },
  {
    label: 'AZW3 to MOBI',
    description: 'Ebook',
    tags: ['pdf', 'epub', 'document'],
    emoji: '📄',
    onClick: open('azw3-to-mobi'),
  },
  {
    label: 'EPUB to AZW3',
    description: 'Ebook',
    tags: ['pdf', 'document'],
    emoji: '📄',
    onClick: open('epub-to-azw3'),
  },
  {
    label: 'EPUB to MOBI',
    description: 'Ebook',
    tags: ['pdf', 'document'],
    emoji: '📄',
    onClick: open('epub-to-mobi'),
  },
  {
    label: 'MOBI to AZW3',
    description: 'Ebook',
    tags: ['pdf', 'epub', 'document'],
    emoji: '📄',
    onClick: open('mobi-to-azw3'),
  },
  {
    label: 'MOBI to EPUB',
    description: 'Ebook',
    tags: ['pdf', 'document'],
    emoji: '📄',
    onClick: open('mobi-to-epub'),
  },
];
