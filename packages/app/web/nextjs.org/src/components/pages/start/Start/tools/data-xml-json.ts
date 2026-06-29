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
    emoji: '🔄',
    color: '#10b981',
    onClick: open('json-to-csv'),
  },
  {
    label: 'JSON to XML',
    description: 'Data',
    tags: ['converter', 'javascript-object-notation', 'markup'],
    emoji: '🔄',
    color: '#10b981',
    onClick: open('json-to-xml'),
  },
  {
    label: 'XML to CSV',
    description: 'Data',
    tags: ['json', 'converter', 'markup', 'comma-separated', 'spreadsheet'],
    emoji: '🔄',
    color: '#10b981',
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
    emoji: '🔄',
    color: '#10b981',
    onClick: open('xml-to-excel'),
  },
  {
    label: 'XML to JSON',
    description: 'Data',
    tags: ['converter', 'markup', 'javascript-object-notation'],
    emoji: '🔄',
    color: '#10b981',
    onClick: open('xml-to-json'),
  },
];
