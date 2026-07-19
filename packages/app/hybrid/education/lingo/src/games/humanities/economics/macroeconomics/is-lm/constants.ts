import type { Scenario, Shift } from './types';

export const DEFAULT_A = 6;
export const DEFAULT_C = 1;
export const DEFAULT_B = 0.8;
export const DEFAULT_D = 0.4;

export const A_MIN = 2;
export const A_MAX = 10;
export const C_MIN = 0;
export const C_MAX = 2.5;

export const SHIFTS: Shift[] = ['left', 'none', 'right'];

export const SCENARIOS: Scenario[] = [
  {
    id: 'recession',
    title: 'Recession',
    prompt:
      'Output is far below potential and unemployment is high. Boost the economy.',
    startA: 5,
    startC: 1.2,
    targetA: 7,
    targetC: 0.6,
    explanation:
      'Expansionary fiscal policy shifts IS right, and expansionary monetary policy shifts LM right, raising output.',
  },
  {
    id: 'boom',
    title: 'Overheating Boom',
    prompt:
      'Output is above potential and inflation is accelerating. Cool the economy.',
    startA: 9,
    startC: 0.2,
    targetA: 7,
    targetC: 0.9,
    explanation:
      'Contractionary fiscal policy shifts IS left, and contractionary monetary policy shifts LM left, lowering output.',
  },
  {
    id: 'inflation',
    title: 'Tighten Inflation',
    prompt:
      'Inflation is too high. Raise the interest rate by tightening monetary policy.',
    startA: 7,
    startC: 0.4,
    targetA: 7,
    targetC: 1.3,
    explanation:
      'A contractionary monetary policy shifts LM left, raising the interest rate to combat inflation.',
  },
  {
    id: 'crowding',
    title: 'Crowding Out',
    prompt:
      'You want higher output while keeping rates stable. Use fiscal policy alone.',
    startA: 6,
    startC: 0.6,
    targetA: 8,
    targetC: 0.6,
    explanation:
      'Expansionary fiscal policy shifts IS right, raising output; leaving money supply unchanged avoids extra rate moves.',
  },
  {
    id: 'deflation',
    title: 'Deflation Risk',
    prompt:
      'Demand is weak and prices risk falling. Stimulate without changing spending.',
    startA: 6,
    startC: 1,
    targetA: 6,
    targetC: 0.3,
    explanation:
      'Expansionary monetary policy shifts LM right, lowering rates and lifting output without fiscal change.',
  },
];

export const TOTAL_ROUNDS = SCENARIOS.length;
