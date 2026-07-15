import { Preset } from './types';

export const ONE_SECOND = 1000;
export const ONE_MINUTE = 60 * ONE_SECOND;
export const DEFAULT_PLAYER = 10 * ONE_MINUTE;
export const TICK = 33;

export const PRESETS: Preset[] = [
  {
    label: 'Classic',
    p1: DEFAULT_PLAYER,
    p2: DEFAULT_PLAYER,
    delayType: 'none',
    delaySeconds: 0,
    increment: 0,
  },
  {
    label: 'Rapid',
    p1: 15 * ONE_MINUTE,
    p2: 15 * ONE_MINUTE,
    delayType: 'none',
    delaySeconds: 0,
    increment: 10,
  },
  {
    label: 'Blitz',
    p1: 3 * ONE_MINUTE,
    p2: 3 * ONE_MINUTE,
    delayType: 'none',
    delaySeconds: 0,
    increment: 2,
  },
  {
    label: 'Fischer',
    p1: 5 * ONE_MINUTE,
    p2: 5 * ONE_MINUTE,
    delayType: 'fischer',
    delaySeconds: 0,
    increment: 3,
  },
  {
    label: 'Bronstein',
    p1: 3 * ONE_MINUTE,
    p2: 3 * ONE_MINUTE,
    delayType: 'bronstein',
    delaySeconds: 3,
    increment: 0,
  },
  {
    label: 'Hourglass',
    p1: DEFAULT_PLAYER,
    p2: DEFAULT_PLAYER,
    delayType: 'none',
    delaySeconds: 0,
    increment: 0,
  },
  {
    label: '1 Min',
    p1: ONE_MINUTE,
    p2: ONE_MINUTE,
    delayType: 'none',
    delaySeconds: 0,
    increment: 0,
  },
  {
    label: '30 Sec',
    p1: 30 * ONE_SECOND,
    p2: 30 * ONE_SECOND,
    delayType: 'none',
    delaySeconds: 0,
    increment: 0,
  },
];
