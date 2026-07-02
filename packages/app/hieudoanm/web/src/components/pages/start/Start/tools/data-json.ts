import { PiArrowsClockwise } from 'react-icons/pi';
import { Tool } from '@hieudoanm.github.io/components/pages/start/cards/ToolCard';
import { ModalId } from '../types';

export const make = (open: (id: ModalId) => () => void): Tool[] => [
  {
    label: 'JSON to CSV',
    description: 'Data',
    tags: [
      'xml',
      'converter',
      'javascript-object-notation',
      'comma-separated',
      'spreadsheet',
    ],
    icon: PiArrowsClockwise,
    onClick: open('json-to-csv'),
  },
  {
    label: 'JSON to XML',
    description: 'Data',
    tags: ['converter', 'javascript-object-notation', 'markup'],
    icon: PiArrowsClockwise,
    onClick: open('json-to-xml'),
  },
];
