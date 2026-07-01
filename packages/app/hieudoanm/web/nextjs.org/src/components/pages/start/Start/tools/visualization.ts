import { PiBuildings, PiCalendar, PiGraph, PiHourglass } from 'react-icons/pi';
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
    icon: PiCalendar,
    onClick: open('calendar-tracker'),
  },
  {
    label: 'Graph',
    description: 'Force Layout',
    tags: ['chart', 'visualization', 'data'],
    icon: PiGraph,
    onClick: open('graph'),
  },
  {
    label: 'Legislation',
    description: 'Visualization',
    tags: ['chart', 'graph', 'data'],
    icon: PiBuildings,
    onClick: open('legislation'),
  },
  {
    label: 'Resume',
    description: 'Timeline',
    tags: ['chart', 'graph', 'visualization', 'data'],
    icon: PiHourglass,
    onClick: open('resume-timeline'),
  },
];
