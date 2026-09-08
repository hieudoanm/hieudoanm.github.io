import type {
  Design,
  DomainId,
  DomainScript,
  Mechanism,
  ParticipationRates,
} from './types';

export const GAME_TITLE = 'Nudge Design Lab';

export const TOTAL_ROUNDS = 6;

export const EMPLOYEE_COUNT = 100;

export const SIM_TARGET = 85;

export const ACTIVE_ACCEPT = 0.6;

export const ATTITUDES = {
  saver: 0.3,
  procrastinator: 0.5,
  active: 0.2,
} as const;

export const DESIGN_ORDER: Design[] = [
  'opt-in',
  'opt-out',
  'active-choice',
  'default-timer',
];

export const DESIGN_LABELS: Record<Design, string> = {
  'opt-in': 'Opt-in',
  'opt-out': 'Opt-out',
  'active-choice': 'Active choice',
  'default-timer': 'Default + timer',
};

export const DESIGN_BLURBS: Record<Design, string> = {
  'opt-in': 'Baseline sign-up — you do all the work.',
  'opt-out': 'Everyone is enrolled; opting out takes effort.',
  'active-choice': 'Everyone must make an explicit decision.',
  'default-timer': 'Enrolled by default plus a deadline prompt.',
};

export const MECHANISM_LABELS: Record<Mechanism, string> = {
  'status-quo-bias': 'Status quo bias',
  'default-effect': 'Default effect',
  'active-choice': 'Active choice',
};

export const PARTICIPATION: Record<DomainId, ParticipationRates> = {
  retirement: {
    optIn: 0.42,
    optOut: 0.8,
    activeChoice: 0.65,
    defaultTimer: 0.86,
  },
  organ: { optIn: 0.28, optOut: 0.9, activeChoice: 0.62, defaultTimer: 0.88 },
  energy: { optIn: 0.3, optOut: 0.62, activeChoice: 0.82, defaultTimer: 0.7 },
  privacy: { optIn: 0.32, optOut: 0.5, activeChoice: 0.75, defaultTimer: 0.55 },
  meal: { optIn: 0.25, optOut: 0.72, activeChoice: 0.48, defaultTimer: 0.66 },
  insurance: {
    optIn: 0.36,
    optOut: 0.78,
    activeChoice: 0.6,
    defaultTimer: 0.66,
  },
};

export const DOMAINS: DomainScript[] = [
  {
    id: 'retirement',
    label: '401(k) enrollment',
    emoji: '🏦',
    context:
      'New hires must decide whether to enroll in the company 401(k) retirement plan.',
    target: 80,
    bestDesign: 'opt-out',
    mechanism: 'default-effect',
    mechanismText:
      'Auto-enrollment exploits the default effect: people rarely override the pre-selected option, so participation jumps.',
    ...PARTICIPATION.retirement,
  },
  {
    id: 'organ',
    label: 'Organ donation consent',
    emoji: '🫀',
    context:
      'Citizens receive their licence application without a consent decision — what is the default?',
    target: 90,
    bestDesign: 'opt-out',
    mechanism: 'status-quo-bias',
    mechanismText:
      'Status quo bias: with opt-out, doing nothing means consent — and most people never get around to opting out.',
    ...PARTICIPATION.organ,
  },
  {
    id: 'energy',
    label: 'Green energy tariff',
    emoji: '⚡',
    context:
      'Customers choose between a green tariff and the standard fossil tariff.',
    target: 82,
    bestDesign: 'active-choice',
    mechanism: 'active-choice',
    mechanismText:
      'Active choice: forcing an explicit decision reveals true preferences instead of lulling people into the dirty default.',
    ...PARTICIPATION.energy,
  },
  {
    id: 'privacy',
    label: 'App location privacy',
    emoji: '🔐',
    context:
      'A social app decides whether users share location data by default.',
    target: 75,
    bestDesign: 'active-choice',
    mechanism: 'active-choice',
    mechanismText:
      'Active choice: an explicit prompt surfaces real preferences; an opt-out default hides the decision entirely.',
    ...PARTICIPATION.privacy,
  },
  {
    id: 'meal',
    label: 'School meal vegetables',
    emoji: '🥗',
    context: 'A cafeteria pre-decides what lands on every child’s lunch tray.',
    target: 72,
    bestDesign: 'opt-out',
    mechanism: 'default-effect',
    mechanismText:
      'Default effect: pre-selecting vegetables puts the healthy option on the tray, and kids mostly keep it.',
    ...PARTICIPATION.meal,
  },
  {
    id: 'insurance',
    label: 'Flood insurance uptake',
    emoji: '🛡️',
    context:
      'Homeowners in a flood zone decide whether to buy coverage before the season.',
    target: 78,
    bestDesign: 'opt-out',
    mechanism: 'status-quo-bias',
    mechanismText:
      'Status quo bias: once coverage is the default, even procrastinators keep it rather than cancel.',
    ...PARTICIPATION.insurance,
  },
];
