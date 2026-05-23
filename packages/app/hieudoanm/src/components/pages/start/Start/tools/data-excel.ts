import { PiArrowsClockwise, PiFileText, PiScissors } from 'react-icons/pi';
import { Tool } from '@hieudoanm.github.io/components/pages/start/cards/ToolCard';
import { ModalId } from '../types';

export const make = (open: (id: ModalId) => () => void): Tool[] => [
  {
    label: 'Excel to CSV',
    description: 'Data',
    tags: ['spreadsheet', 'xlsx', 'xls', 'microsoft-excel', 'comma-separated'],
    icon: PiArrowsClockwise,
    onClick: open('excel-to-csv'),
  },
  {
    label: 'Excel to PDF',
    description: 'Data',
    tags: [
      'spreadsheet',
      'xlsx',
      'xls',
      'microsoft-excel',
      'document',
      'adobe',
      'acrobat',
    ],
    icon: PiFileText,
    onClick: open('excel-to-pdf'),
  },
  {
    label: 'Excel to XML',
    description: 'Data',
    tags: ['spreadsheet', 'xlsx', 'xls', 'microsoft-excel', 'markup'],
    icon: PiArrowsClockwise,
    onClick: open('excel-to-xml'),
  },
  {
    label: 'Split Excel',
    description: 'Data',
    tags: ['spreadsheet', 'xlsx', 'xls', 'microsoft-excel'],
    icon: PiScissors,
    onClick: open('split-excel'),
  },
];
