import { Tool } from '@hieudoanm.github.io/components/pages/start/cards/ToolCard';
import { ModalId } from '../types';

export const make = (open: (id: ModalId) => () => void): Tool[] => [
  {
    label: 'Countdown',
    description: 'Timer',
    tags: ['clock', 'world-clock', 'stopwatch', 'alarm'],
    emoji: '⏳',
    onClick: open('countdown'),
  },
  {
    label: 'Cron',
    description: 'Expression Builder',
    tags: ['clock', 'time', 'world-clock'],
    emoji: '🕒',
    onClick: open('cron'),
  },
  {
    label: 'Days Count',
    description: 'Date Difference',
    tags: ['clock', 'time', 'date', 'difference'],
    emoji: '📅',
    onClick: open('days-count'),
  },
  {
    label: 'Epoch Convert',
    description: 'Timestamp',
    tags: ['clock', 'time', 'timestamp', 'unix', 'epoch'],
    emoji: '🕐',
    onClick: open('epoch-convert'),
  },
  {
    label: 'Pomodoro',
    description: 'Timer',
    tags: ['clock', 'world-clock', 'countdown', 'stopwatch', 'alarm'],
    emoji: '🍅',
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
    onClick: open('watchface'),
  },
];
