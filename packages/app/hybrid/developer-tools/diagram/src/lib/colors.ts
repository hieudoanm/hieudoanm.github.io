import type { ColorName } from '@/lib/types';

export interface ColorPair {
  fill: string;
  stroke: string;
}

export const COLOR_NAMES: readonly ColorName[] = [
  'red',
  'orange',
  'amber',
  'yellow',
  'lime',
  'green',
  'teal',
  'cyan',
  'sky',
  'blue',
  'indigo',
  'violet',
  'purple',
  'pink',
  'gray',
];

const PALETTE: Record<ColorName, ColorPair> = {
  red: { fill: 'rgba(239,68,68,0.16)', stroke: '#ef4444' },
  orange: { fill: 'rgba(249,115,22,0.16)', stroke: '#f97316' },
  amber: { fill: 'rgba(245,158,11,0.18)', stroke: '#f59e0b' },
  yellow: { fill: 'rgba(234,179,8,0.18)', stroke: '#eab308' },
  lime: { fill: 'rgba(132,204,22,0.16)', stroke: '#84cc16' },
  green: { fill: 'rgba(34,197,94,0.16)', stroke: '#22c55e' },
  teal: { fill: 'rgba(20,184,166,0.16)', stroke: '#14b8a6' },
  cyan: { fill: 'rgba(6,182,212,0.16)', stroke: '#06b6d4' },
  sky: { fill: 'rgba(14,165,233,0.16)', stroke: '#0ea5e9' },
  blue: { fill: 'rgba(59,130,246,0.16)', stroke: '#3b82f6' },
  indigo: { fill: 'rgba(99,102,241,0.16)', stroke: '#6366f1' },
  violet: { fill: 'rgba(139,92,246,0.16)', stroke: '#8b5cf6' },
  purple: { fill: 'rgba(168,85,247,0.16)', stroke: '#a855f7' },
  pink: { fill: 'rgba(236,72,153,0.16)', stroke: '#ec4899' },
  gray: { fill: 'rgba(148,163,184,0.18)', stroke: '#94a3b8' },
};

export const isColorName = (value: string): value is ColorName =>
  (COLOR_NAMES as readonly string[]).includes(value);

export const colorPair = (name: ColorName): ColorPair => PALETTE[name];
