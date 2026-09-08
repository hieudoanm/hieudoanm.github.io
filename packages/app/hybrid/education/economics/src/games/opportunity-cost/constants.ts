import type { ChallengeRound } from './types';

export const TOTAL_ROUNDS = 5;

export const DEFAULT_SANDBOX = {
  wages: 18,
  hours: 10,
  businessIncome: 300,
  upfrontCost: 50,
  risk: 0.3,
};

export const CHALLENGES: ChallengeRound[] = [
  {
    round: 1,
    scenario:
      'You can attend a 4-year college (tuition $40k/yr) or work full-time ($35k/yr).',
    optionA: {
      label: 'College',
      description: '4 years of college, earn degree',
      value: 140000,
      oc: 140000,
    },
    optionB: {
      label: 'Work',
      description: '4 years working full-time',
      value: 140000,
      oc: 0,
    },
    correctAnswer: 'B',
  },
  {
    round: 2,
    scenario:
      'Spend $100 today or invest it at 5% annual compound interest for 10 years.',
    optionA: {
      label: 'Spend now',
      description: '$100 of goods today',
      value: 100,
      oc: 63,
    },
    optionB: {
      label: 'Invest',
      description: '$163 future value in 10 years',
      value: 163,
      oc: 100,
    },
    correctAnswer: 'B',
  },
  {
    round: 3,
    scenario:
      'Attend a free outdoor concert (3 hours) or pick up a 3-hour shift at $20/hr.',
    optionA: {
      label: 'Concert',
      description: 'Free music, 3 hours of enjoyment',
      value: 50,
      oc: 60,
    },
    optionB: {
      label: 'Work shift',
      description: 'Earn $60 for 3 hours',
      value: 60,
      oc: 50,
    },
    correctAnswer: 'B',
  },
  {
    round: 4,
    scenario:
      'You have $1,000. Buy a gadget (resale value $200) or put it in a savings account earning 4% for a year.',
    optionA: {
      label: 'Gadget',
      description: 'Enjoy gadget, resale $200',
      value: 500,
      oc: 40,
    },
    optionB: {
      label: 'Savings',
      description: 'Earn $40 interest in a year',
      value: 1040,
      oc: 500,
    },
    correctAnswer: 'B',
  },
  {
    round: 5,
    scenario:
      'Spend Saturday painting your house (value $300 saved) or freelance for $25/hr (8 hours).',
    optionA: {
      label: 'DIY paint',
      description: 'Save $300 on painter',
      value: 300,
      oc: 200,
    },
    optionB: {
      label: 'Freelance',
      description: 'Earn $200 for 8 hours',
      value: 200,
      oc: 300,
    },
    correctAnswer: 'A',
  },
];
