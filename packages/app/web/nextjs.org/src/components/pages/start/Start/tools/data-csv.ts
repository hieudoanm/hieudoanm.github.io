import { Tool } from '@hieudoanm.github.io/components/pages/start/cards/ToolCard';
import { ModalId } from '../types';

export const make = (open: (id: ModalId) => () => void): Tool[] => [
  {
    label: 'CSV to Excel',
    description: 'Data',
    tags: ['spreadsheet', 'comma-separated', 'xlsx', 'xls', 'microsoft-excel'],
    emoji: '🔄',
    color: '#10b981',
    onClick: open('csv-to-excel'),
  },
  {
    label: 'CSV to JSON',
    description: 'Data',
    tags: ['spreadsheet', 'comma-separated', 'javascript-object-notation'],
    emoji: '🔄',
    color: '#10b981',
    onClick: open('csv-to-json'),
  },
  {
    label: 'CSV to XML',
    description: 'Data',
    tags: ['spreadsheet', 'comma-separated', 'markup'],
    emoji: '🔄',
    color: '#10b981',
    onClick: open('csv-to-xml'),
  },
  {
    label: 'Excel to CSV',
    description: 'Data',
    tags: ['spreadsheet', 'xlsx', 'xls', 'microsoft-excel', 'comma-separated'],
    emoji: '🔄',
    color: '#10b981',
    onClick: open('excel-to-csv'),
  },
  {
    label: 'Split CSV',
    description: 'Data',
    tags: ['spreadsheet', 'comma-separated'],
    emoji: '✂️',
    color: '#10b981',
    onClick: open('split-csv'),
  },
];
