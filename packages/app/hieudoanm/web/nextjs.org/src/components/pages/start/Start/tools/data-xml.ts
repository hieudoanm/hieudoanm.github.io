import { PiArrowsClockwise } from 'react-icons/pi';
import { Tool } from '@hieudoanm.github.io/components/pages/start/cards/ToolCard';
import { ModalId } from '../types';

export const make = (open: (id: ModalId) => () => void): Tool[] => [
  {
    label: 'XML to CSV',
    description: 'Data',
    tags: ['json', 'converter', 'markup', 'comma-separated', 'spreadsheet'],
    icon: PiArrowsClockwise,
    onClick: open('xml-to-csv'),
  },
  {
    label: 'XML to Excel',
    description: 'Data',
    tags: [
      'json',
      'converter',
      'markup',
      'xlsx',
      'xls',
      'spreadsheet',
      'microsoft-excel',
    ],
    icon: PiArrowsClockwise,
    onClick: open('xml-to-excel'),
  },
  {
    label: 'XML to JSON',
    description: 'Data',
    tags: ['converter', 'markup', 'javascript-object-notation'],
    icon: PiArrowsClockwise,
    onClick: open('xml-to-json'),
  },
];
