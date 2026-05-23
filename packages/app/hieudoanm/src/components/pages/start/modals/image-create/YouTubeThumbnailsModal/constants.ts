import { Quality } from './types';

export const QUALITIES: Quality[] = [
  {
    id: 'maxresdefault',
    label: 'Max Resolution',
    description: 'Best quality',
    resolution: '1280×720',
  },
  {
    id: 'sddefault',
    label: 'SD',
    description: 'Standard',
    resolution: '640×480',
  },
  {
    id: 'hqdefault',
    label: 'HQ',
    description: 'High quality',
    resolution: '480×360',
  },
  {
    id: 'mqdefault',
    label: 'MQ',
    description: 'Medium',
    resolution: '320×180',
  },
  {
    id: 'default',
    label: 'Default',
    description: 'Smallest',
    resolution: '120×90',
  },
  {
    id: '0',
    label: 'Frame 0',
    description: 'Start frame',
    resolution: '480×360',
  },
  {
    id: '1',
    label: 'Frame 1',
    description: 'Mid frame 1',
    resolution: '120×90',
  },
  {
    id: '2',
    label: 'Frame 2',
    description: 'Mid frame 2',
    resolution: '120×90',
  },
  {
    id: '3',
    label: 'Frame 3',
    description: 'Mid frame 3',
    resolution: '120×90',
  },
];
