import { Tool } from '@hieudoanm.github.io/components/pages/start/cards/ToolCard';
import { ModalId } from '../types';

export const make = (open: (id: ModalId) => () => void): Tool[] => [
  {
    label: 'Calendar Tracker',
    description: 'Activities',
    tags: [
      'chart',
      'graph',
      'visualization',
      'data',
      'date',
      'event',
      'schedule',
    ],
    emoji: '📅',
    color: '#10b981',
    onClick: open('calendar-tracker'),
  },
  {
    label: 'Graph',
    description: 'Force Layout',
    tags: ['chart', 'visualization', 'data'],
    emoji: '🕸️',
    color: '#6c5ce7',
    onClick: open('graph'),
  },
  {
    label: 'Legislation',
    description: 'Visualization',
    tags: ['chart', 'graph', 'data'],
    emoji: '🏛️',
    color: '#ef4444',
    onClick: open('legislation'),
  },
  {
    label: 'Resume',
    description: 'Timeline',
    tags: ['chart', 'graph', 'visualization', 'data'],
    emoji: '⏳',
    color: '#ef4444',
    onClick: open('resume-timeline'),
  },
];
