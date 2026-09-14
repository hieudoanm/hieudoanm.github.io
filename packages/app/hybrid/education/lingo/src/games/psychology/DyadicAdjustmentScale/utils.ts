export type DasSubscale =
  'consensus' | 'satisfaction' | 'cohesion' | 'affectional';

export interface DasOption {
  value: number;
  label: string;
}

export interface DasItem {
  id: number;
  text: string;
  subscale: DasSubscale;
  options: DasOption[];
}

export interface DasScores {
  consensus: number;
  satisfaction: number;
  cohesion: number;
  affectional: number;
  total: number;
}

const CONSENSUS_OPTIONS: DasOption[] = [
  { value: 5, label: 'Always Agree' },
  { value: 4, label: 'Almost Always Agree' },
  { value: 3, label: 'Occasionally Disagree' },
  { value: 2, label: 'Frequently Disagree' },
  { value: 1, label: 'Almost Always Disagree' },
  { value: 0, label: 'Always Disagree' },
];

const ALL_TIME_LOW_FIRST: DasOption[] = [
  { value: 0, label: 'All the time' },
  { value: 1, label: 'Most of the time' },
  { value: 2, label: 'More often than not' },
  { value: 3, label: 'Occasionally' },
  { value: 4, label: 'Rarely' },
  { value: 5, label: 'Never' },
];

const ALL_TIME_HIGH_FIRST: DasOption[] = [
  { value: 5, label: 'All the time' },
  { value: 4, label: 'Most of the time' },
  { value: 3, label: 'More often than not' },
  { value: 2, label: 'Occasionally' },
  { value: 1, label: 'Rarely' },
  { value: 0, label: 'Never' },
];

const KISS_OPTIONS: DasOption[] = [
  { value: 4, label: 'Every day' },
  { value: 3, label: 'Almost every day' },
  { value: 2, label: 'Occasionally' },
  { value: 1, label: 'Rarely' },
  { value: 0, label: 'Never' },
];

const OUTSIDE_OPTIONS: DasOption[] = [
  { value: 4, label: 'All of them' },
  { value: 3, label: 'Most of them' },
  { value: 2, label: 'Some of them' },
  { value: 1, label: 'Very few of them' },
  { value: 0, label: 'None of them' },
];

const FREQUENCY_OPTIONS: DasOption[] = [
  { value: 0, label: 'Never' },
  { value: 1, label: 'Less than once a month' },
  { value: 2, label: 'Once or twice a month' },
  { value: 3, label: 'Once or twice a week' },
  { value: 4, label: 'Once a day' },
  { value: 5, label: 'More often' },
];

const YES_NO_OPTIONS: DasOption[] = [
  { value: 0, label: 'Yes' },
  { value: 1, label: 'No' },
];

const HAPPINESS_OPTIONS: DasOption[] = [
  { value: 0, label: 'Extremely unhappy' },
  { value: 1, label: 'Fairly unhappy' },
  { value: 2, label: 'A little unhappy' },
  { value: 3, label: 'Happy' },
  { value: 4, label: 'Very happy' },
  { value: 5, label: 'Extremely happy' },
  { value: 6, label: 'Perfect' },
];

const FUTURE_OPTIONS: DasOption[] = [
  {
    value: 5,
    label:
      'I want desperately for my relationship to succeed, and would go to almost any length to see that it does.',
  },
  {
    value: 4,
    label:
      'I want very much for my relationship to succeed, and will do all I can to see that it does.',
  },
  {
    value: 3,
    label:
      'I want very much for my relationship to succeed, and will do my fair share to see that it does.',
  },
  {
    value: 2,
    label:
      "It would be nice if my relationship succeeded, but I can't do much more than I am doing now to help it succeed.",
  },
  {
    value: 1,
    label:
      'It would be nice if it succeeded, but I refuse to do any more than I am doing now to keep the relationship going.',
  },
  {
    value: 0,
    label:
      'My relationship can never succeed, and there is no more that I can do to keep the relationship going.',
  },
];

export const DAS_ITEMS: DasItem[] = [
  {
    id: 1,
    text: 'Handling family finances',
    subscale: 'consensus',
    options: CONSENSUS_OPTIONS,
  },
  {
    id: 2,
    text: 'Matters of recreation',
    subscale: 'consensus',
    options: CONSENSUS_OPTIONS,
  },
  {
    id: 3,
    text: 'Religious matters',
    subscale: 'consensus',
    options: CONSENSUS_OPTIONS,
  },
  {
    id: 4,
    text: 'Demonstrations of affection',
    subscale: 'affectional',
    options: CONSENSUS_OPTIONS,
  },
  { id: 5, text: 'Friends', subscale: 'consensus', options: CONSENSUS_OPTIONS },
  {
    id: 6,
    text: 'Sex relations',
    subscale: 'affectional',
    options: CONSENSUS_OPTIONS,
  },
  {
    id: 7,
    text: 'Conventionality (correct or proper behavior)',
    subscale: 'consensus',
    options: CONSENSUS_OPTIONS,
  },
  {
    id: 8,
    text: 'Philosophy of life',
    subscale: 'consensus',
    options: CONSENSUS_OPTIONS,
  },
  {
    id: 9,
    text: 'Ways of dealing with parents or in-laws',
    subscale: 'consensus',
    options: CONSENSUS_OPTIONS,
  },
  {
    id: 10,
    text: 'Aims, goals, and things believed important',
    subscale: 'consensus',
    options: CONSENSUS_OPTIONS,
  },
  {
    id: 11,
    text: 'Amount of time spent together',
    subscale: 'consensus',
    options: CONSENSUS_OPTIONS,
  },
  {
    id: 12,
    text: 'Making major decisions',
    subscale: 'consensus',
    options: CONSENSUS_OPTIONS,
  },
  {
    id: 13,
    text: 'Household tasks',
    subscale: 'consensus',
    options: CONSENSUS_OPTIONS,
  },
  {
    id: 14,
    text: 'Leisure time interests and activities',
    subscale: 'consensus',
    options: CONSENSUS_OPTIONS,
  },
  {
    id: 15,
    text: 'Career decisions',
    subscale: 'consensus',
    options: CONSENSUS_OPTIONS,
  },
  {
    id: 16,
    text: 'How often do you discuss or have you considered divorce, separation, or terminating your relationship?',
    subscale: 'satisfaction',
    options: ALL_TIME_LOW_FIRST,
  },
  {
    id: 17,
    text: 'How often do you or your mate leave the house after a fight?',
    subscale: 'satisfaction',
    options: ALL_TIME_LOW_FIRST,
  },
  {
    id: 18,
    text: 'In general, how often do you think that things between you and your partner are going well?',
    subscale: 'satisfaction',
    options: ALL_TIME_HIGH_FIRST,
  },
  {
    id: 19,
    text: 'Do you confide in your mate?',
    subscale: 'satisfaction',
    options: ALL_TIME_HIGH_FIRST,
  },
  {
    id: 20,
    text: 'Do you ever regret that you married? (or lived together)',
    subscale: 'satisfaction',
    options: ALL_TIME_LOW_FIRST,
  },
  {
    id: 21,
    text: 'How often do you and your partner quarrel?',
    subscale: 'satisfaction',
    options: ALL_TIME_LOW_FIRST,
  },
  {
    id: 22,
    text: "How often do you and your mate 'get on each other's nerves'?",
    subscale: 'satisfaction',
    options: ALL_TIME_LOW_FIRST,
  },
  {
    id: 23,
    text: 'Do you kiss your mate?',
    subscale: 'satisfaction',
    options: KISS_OPTIONS,
  },
  {
    id: 24,
    text: 'Do you and your mate engage in outside interests together?',
    subscale: 'cohesion',
    options: OUTSIDE_OPTIONS,
  },
  {
    id: 25,
    text: 'Have a stimulating exchange of ideas',
    subscale: 'cohesion',
    options: FREQUENCY_OPTIONS,
  },
  {
    id: 26,
    text: 'Laugh together',
    subscale: 'cohesion',
    options: FREQUENCY_OPTIONS,
  },
  {
    id: 27,
    text: 'Calmly discuss something',
    subscale: 'cohesion',
    options: FREQUENCY_OPTIONS,
  },
  {
    id: 28,
    text: 'Work together on a project',
    subscale: 'cohesion',
    options: FREQUENCY_OPTIONS,
  },
  {
    id: 29,
    text: 'Being too tired for sex',
    subscale: 'affectional',
    options: YES_NO_OPTIONS,
  },
  {
    id: 30,
    text: 'Not showing love',
    subscale: 'affectional',
    options: YES_NO_OPTIONS,
  },
  {
    id: 31,
    text: "The circles on the following line represent different degrees of happiness in your relationship. The middle point, 'happy', represents the degree of happiness of most relationships. Please describe the degree of happiness, all things considered, of your relationship.",
    subscale: 'satisfaction',
    options: HAPPINESS_OPTIONS,
  },
  {
    id: 32,
    text: 'Which of the following statements best describes how you feel about the future of your relationship?',
    subscale: 'satisfaction',
    options: FUTURE_OPTIONS,
  },
];

export const DAS_SUBSCALE_MAX: Record<DasSubscale, number> = {
  consensus: 65,
  satisfaction: 50,
  cohesion: 24,
  affectional: 12,
};

export const DAS_TOTAL_MAX = 151;

export const computeDasScores = (responses: number[]): DasScores => {
  const sum = (subscale: DasSubscale) =>
    DAS_ITEMS.reduce(
      (total, item, i) =>
        item.subscale === subscale ? total + (responses[i] ?? 0) : total,
      0
    );
  const consensus = sum('consensus');
  const satisfaction = sum('satisfaction');
  const cohesion = sum('cohesion');
  const affectional = sum('affectional');
  return {
    consensus,
    satisfaction,
    cohesion,
    affectional,
    total: consensus + satisfaction + cohesion + affectional,
  };
};

export const interpretDasTotal = (total: number): string =>
  total >= 102 ? 'Relationally non-distressed' : 'Relationally distressed';
