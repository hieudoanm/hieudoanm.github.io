import { PiImage } from 'react-icons/pi';
import { Tool } from '@hieudoanm.github.io/components/pages/start/components/cards/ToolCard';
import { ModalId } from '../types';

export const make = (open: (id: ModalId) => () => void): Tool[] => [
  {
    label: 'Image Tools',
    description: 'Image',
    tags: [
      'image',
      'photo',
      'picture',
      'edit',
      'convert',
      'resize',
      'crop',
      'filter',
      'compress',
      'ai',
      'color',
      'ocr',
      'barcode',
      'qr',
      'meme',
      'collage',
    ],
    icon: PiImage,
    onClick: open('image'),
  },
];
