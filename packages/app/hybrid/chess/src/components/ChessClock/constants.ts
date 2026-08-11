import { Preset } from './types';

export const ONE_SECOND = 1000;
export const ONE_MINUTE = 60 * ONE_SECOND;
export const DEFAULT_PLAYER = 10 * ONE_MINUTE;
export const TICK = 33;

const BASE: Omit<Preset, 'label' | 'p1' | 'p2'> = {
  delayType: 'none',
  delaySeconds: 0,
  increment: 0,
  movesToGo: 0,
  extraTime: 0,
};

export const PRESETS: Preset[] = [
  { ...BASE, label: 'Classic', p1: DEFAULT_PLAYER, p2: DEFAULT_PLAYER },
  { ...BASE, label: 'Rapid', p1: 15 * ONE_MINUTE, p2: 15 * ONE_MINUTE, increment: 10 },
  { ...BASE, label: 'Blitz', p1: 3 * ONE_MINUTE, p2: 3 * ONE_MINUTE, increment: 2 },
  {
    ...BASE,
    label: 'Fischer',
    p1: 5 * ONE_MINUTE,
    p2: 5 * ONE_MINUTE,
    delayType: 'fischer',
    increment: 3,
  },
  {
    ...BASE,
    label: 'Bronstein',
    p1: 3 * ONE_MINUTE,
    p2: 3 * ONE_MINUTE,
    delayType: 'bronstein',
    delaySeconds: 3,
  },
  { ...BASE, label: 'Hourglass', p1: DEFAULT_PLAYER, p2: DEFAULT_PLAYER },
  { ...BASE, label: '1 Min', p1: ONE_MINUTE, p2: ONE_MINUTE },
  { ...BASE, label: '30 Sec', p1: 30 * ONE_SECOND, p2: 30 * ONE_SECOND },
];

export const LOW_TIME_THRESHOLD = 10 * ONE_SECOND;
