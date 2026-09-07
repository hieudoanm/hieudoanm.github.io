import type { Scenario } from './types';

export const SCENARIOS: Scenario[] = [
  {
    id: 'A',
    title: 'Scenario A — Gains',
    context:
      'A disease is expected to kill 600 people. Two programs are proposed:',
    programX: 'Program X: 200 people will be saved for sure.',
    programY:
      'Program Y: 1/3 chance that all 600 are saved, 2/3 chance that nobody is saved.',
  },
  {
    id: 'B',
    title: 'Scenario B — Losses',
    context:
      'A disease is expected to kill 600 people. Two programs are proposed:',
    programX: 'Program X: 400 people will DIE for sure.',
    programY:
      'Program Y: 1/3 chance that nobody dies, 2/3 chance that all 600 die.',
  },
];

export const OPTION_X_LABEL = 'Program X (sure)';
export const OPTION_Y_LABEL = 'Program Y (gamble)';
