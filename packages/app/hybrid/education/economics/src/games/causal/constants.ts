import type { Classification, Scenario } from './types';

export const TOTAL_SCENARIOS = 6;
export const STARTING_BUDGET = 3;
export const POINTS_PER_SCENARIO = 10;

export const CLASSIFICATION_LABELS: Record<Classification, string> = {
  causal: 'Causal',
  'correlated-not-causal': 'Correlated but not causal',
  'reverse-causation': 'Reverse causation',
  coincidence: 'Coincidence',
};

export const SCENARIOS: Scenario[] = [
  {
    id: 1,
    title: 'Ice Cream & Drowning',
    correlation:
      'Ice cream sales and drowning deaths both rise in summer months.',
    confounder: 'Hot weather increases both swimming and ice cream purchases.',
    choices: [
      'causal',
      'correlated-not-causal',
      'reverse-causation',
      'coincidence',
    ],
    correct: 'correlated-not-causal',
    explanation:
      'Temperature is the confounder — hot weather increases both ice cream consumption and swimming activity, leading to more drownings.',
  },
  {
    id: 2,
    title: 'Chocolate & Nobel Prizes',
    correlation:
      'Countries that eat more chocolate per capita win more Nobel Prizes.',
    confounder:
      'Wealthier nations have both more chocolate consumption and better-funded research institutions.',
    choices: [
      'causal',
      'correlated-not-causal',
      'reverse-causation',
      'coincidence',
    ],
    correct: 'coincidence',
    explanation:
      'Wealth and education spending confound the relationship — chocolate consumption has no bearing on scientific achievement.',
  },
  {
    id: 3,
    title: 'Fire Trucks & Fire Damage',
    correlation:
      'Homes visited by more fire trucks suffer greater fire damage.',
    confounder: 'Larger fires require more trucks and also cause more damage.',
    choices: [
      'causal',
      'correlated-not-causal',
      'reverse-causation',
      'coincidence',
    ],
    correct: 'reverse-causation',
    explanation:
      'The causal arrow is reversed — more severe fires cause both more trucks to be dispatched and more damage, not the other way around.',
  },
  {
    id: 4,
    title: 'Sleep & Grades',
    correlation: 'Students who sleep more hours tend to have higher GPAs.',
    confounder:
      'Stress, time management, and health affect both sleep and academic performance.',
    choices: [
      'causal',
      'correlated-not-causal',
      'reverse-causation',
      'coincidence',
    ],
    correct: 'correlated-not-causal',
    explanation:
      'Better time management and lower stress cause both more sleep and higher grades — there is likely a bidirectional influence but no simple causal chain.',
  },
  {
    id: 5,
    title: 'Rogue Traders & Profit',
    correlation:
      'Trading firms that hire more aggressive rogue traders see higher short-term profits.',
    confounder:
      'Firms in volatile markets both hire aggressive traders and experience outsized gains (and losses).',
    choices: [
      'causal',
      'correlated-not-causal',
      'reverse-causation',
      'coincidence',
    ],
    correct: 'correlated-not-causal',
    explanation:
      'Market volatility is the confounder — it creates both the incentive for aggressive hiring and the appearance of outsized returns.',
  },
  {
    id: 6,
    title: 'Hospital Visits & Mortality',
    correlation:
      'Patients who visit hospitals more frequently have higher mortality rates.',
    confounder:
      'Sicker patients both visit hospitals more often and are more likely to die.',
    choices: [
      'causal',
      'correlated-not-causal',
      'reverse-causation',
      'coincidence',
    ],
    correct: 'reverse-causation',
    explanation:
      'Illness severity drives both hospital visits and mortality — the causal arrow points from sickness to both outcomes, not from hospital visits to death.',
  },
];
