import type { Round } from './types';

export const TOTAL_ROUNDS = 4;

export const MAX_SCORE = 12;

export const ROUNDS: Round[] = [
  {
    number: 1,
    topic: 'Deworming & School Attendance',
    question: 'Does giving children deworming pills improve school attendance?',
    outcome: 'school attendance rate',
    unit: 'attendance rate (0–1)',
    trueEffect: 0.31,
    tolerance: 0.05,
    toleranceKind: 'absolute',
    studies: [
      {
        id: 'A',
        label: 'Children from families that chose deworming vs. others',
        treatedMean: 0.55,
        treatedSd: 0.12,
        treatedN: 980,
        controlMean: 0.4,
        controlSd: 0.12,
        controlN: 1010,
        randomized: false,
      },
      {
        id: 'B',
        label: 'Children in schools given deworming vs. control schools',
        treatedMean: 0.71,
        treatedSd: 0.1,
        treatedN: 1536,
        controlMean: 0.4,
        controlSd: 0.11,
        controlN: 1417,
        randomized: true,
      },
    ],
    reveal:
      'Study A compares children whose well-off, health-conscious families chose deworming with everyone else, so the groups differ in more than just pills — its 0.15 difference blends treatment with selection. Study B randomly assigned deworming across schools, balancing wealth and health in both arms: 0.71 − 0.40 = 0.31 is the causal attendance gain.',
  },
  {
    number: 2,
    topic: 'Microcredit & Business Profit',
    question: 'Does microcredit lending raise small-business profits?',
    outcome: 'monthly business profit',
    unit: 'utiles',
    trueEffect: 120,
    tolerance: 0.1,
    toleranceKind: 'relative',
    studies: [
      {
        id: 'A',
        label: 'Borrowers from randomly offered loans vs. non-borrowers',
        treatedMean: 200,
        treatedSd: 140,
        treatedN: 2800,
        controlMean: 80,
        controlSd: 130,
        controlN: 2800,
        randomized: true,
      },
      {
        id: 'B',
        label: 'Microcredit takers vs. comparable non-borrowers',
        treatedMean: 480,
        treatedSd: 150,
        treatedN: 2500,
        controlMean: 80,
        controlSd: 120,
        controlN: 4000,
        randomized: false,
      },
    ],
    reveal:
      'Study A randomly offered loans to applicants, leaving both groups comparable: the causal profit gain is 200 − 80 = 120 utiles. Study B compares borrowers with non-borrowers — yet the businesses that borrow are the better-performing ones. Selection inflates that naive difference to 400 utiles.',
  },
  {
    number: 3,
    topic: 'Bednets & Malaria',
    question: 'Do insecticide-treated bednets reduce child malaria?',
    outcome: 'share of children free of malaria',
    unit: 'malaria-free share (0–1)',
    trueEffect: 0.12,
    tolerance: 0.05,
    toleranceKind: 'absolute',
    studies: [
      {
        id: 'A',
        label: 'Bednet buyers vs. households that did not buy',
        treatedMean: 0.62,
        treatedSd: 0.09,
        treatedN: 1200,
        controlMean: 0.6,
        controlSd: 0.09,
        controlN: 1300,
        randomized: false,
      },
      {
        id: 'B',
        label: 'Households randomly assigned nets vs. control households',
        treatedMean: 0.72,
        treatedSd: 0.1,
        treatedN: 1100,
        controlMean: 0.6,
        controlSd: 0.1,
        controlN: 1100,
        randomized: true,
      },
    ],
    reveal:
      'Comparing net buyers with non-buyers mixes in wealth: buyers already face little malaria, so the naive difference is just 0.02. Study B randomly assigned nets to a comparable control group, isolating a real gain — 0.72 − 0.60 = 0.12 more children free of malaria.',
  },
  {
    number: 4,
    topic: 'Fertilizer & Farm Yields',
    question: 'Does a fertilizer subsidy raise crop yields?',
    outcome: 'crop yield per acre',
    unit: 'yield index (0–1)',
    trueEffect: 0.18,
    tolerance: 0.05,
    toleranceKind: 'absolute',
    studies: [
      {
        id: 'A',
        label: 'Fertilizer adopters vs. certified farms randomly assigned',
        treatedMean: 0.58,
        treatedSd: 0.12,
        treatedN: 1100,
        controlMean: 0.4,
        controlSd: 0.11,
        controlN: 1080,
        randomized: true,
      },
      {
        id: 'B',
        label: 'Fertilizer adopters vs. non-adopting neighbors',
        treatedMean: 0.85,
        treatedSd: 0.14,
        treatedN: 900,
        controlMean: 0.4,
        controlSd: 0.12,
        controlN: 950,
        randomized: false,
      },
    ],
    reveal:
      'Adopters are wealthier and farm better plots, so comparing them with everyone else bakes in that advantage — hence the naive gap of 0.45. Randomized allocation put comparable land in both arms, yielding a causal gain of 0.58 − 0.40 = 0.18.',
  },
];

export const SAMPLE_MIN = 50;
export const SAMPLE_MAX = 200;
export const DEFAULT_SAMPLE = 100;
export const ALPHA = 0.05;
export const Z_CRIT = 1.96;
