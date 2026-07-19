import type { GameMode } from '../types';

export interface ModeInfo {
  mode: GameMode;
  label: string;
  description: string;
}

export const MODES: ModeInfo[] = [
  { mode: 'practice', label: 'Practice', description: 'Unlimited, no score' },
  {
    mode: 'classic',
    label: 'Classic',
    description: '20 events, highest score',
  },
  {
    mode: 'endless',
    label: 'Endless',
    description: 'Infinite, ends on first mistake',
  },
  { mode: 'hardcore', label: 'Hardcore', description: 'One mistake only' },
];
