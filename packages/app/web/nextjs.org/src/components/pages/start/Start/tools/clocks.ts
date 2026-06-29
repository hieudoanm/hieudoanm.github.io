import { Tool } from '@hieudoanm.github.io/components/pages/start/cards/ToolCard';
import { ModalId } from '../types';

export const make = (open: (id: ModalId) => () => void): Tool[] => [
  {
    label: 'Chess Clock',
    description: 'Chess Timer',
    tags: ['world-clock', 'countdown', 'stopwatch', 'alarm'],
    emoji: '♟️',
    color: '#8b5cf6',
    onClick: open('chess-clock'),
  },
  {
    label: 'Countdown',
    description: 'Timer',
    tags: ['clock', 'world-clock', 'stopwatch', 'alarm'],
    emoji: '⏳',
    color: '#06b6d4',
    onClick: open('countdown'),
  },
  {
    label: 'Cron',
    description: 'Expression Builder',
    tags: ['clock', 'time', 'world-clock'],
    emoji: '🕒',
    color: '#8b5cf6',
    onClick: open('cron'),
  },
  {
    label: 'Pomodoro',
    description: 'Timer',
    tags: ['clock', 'world-clock', 'countdown', 'stopwatch', 'alarm'],
    emoji: '🍅',
    color: '#ef4444',
    onClick: open('pomodoro'),
  },
  {
    label: 'Watchface',
    description: 'Garmin',
    tags: [
      'clock',
      'time',
      'world-clock',
      'smartwatch',
      'watch-face',
      'clock-face',
    ],
    emoji: '⌚',
    color: '#ef4444',
    onClick: open('watchface'),
  },
];
