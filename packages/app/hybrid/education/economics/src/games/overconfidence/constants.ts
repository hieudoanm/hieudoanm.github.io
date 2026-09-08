import type { Confidence, Question } from './types';

export const CONFIDENCES: Confidence[] = [50, 60, 70, 80, 90, 100];

export const TOTAL_QUESTIONS = 10;

export const NILE_LENGTH = 6650;

export const TRAINER_CLAIMED = 90;

export const MARKET_TRADES = 20;

export const STARTING_CAPITAL = 100;

export const QUESTION_LABEL: Record<Confidence, string> = {
  50: 'Just guessing',
  60: 'Slight edge',
  70: 'Somewhat sure',
  80: 'Fairly confident',
  90: 'Very confident',
  100: 'Absolutely certain',
};

export const QUESTIONS: Question[] = [
  {
    id: 'cities',
    prompt: 'Which city is larger?',
    optionA: 'Rome',
    optionB: 'Milan',
    correct: 'A',
  },
  {
    id: 'rivers',
    prompt: 'Which river is longer?',
    optionA: 'Nile',
    optionB: 'Amazon',
    correct: 'A',
  },
  {
    id: 'harvard',
    prompt: 'In what year was Harvard founded?',
    optionA: '1636',
    optionB: '1787',
    correct: 'A',
  },
  {
    id: 'population',
    prompt: 'Which country has more people?',
    optionA: 'China',
    optionB: 'India',
    correct: 'B',
  },
  {
    id: 'peaks',
    prompt: 'Which mountain is taller?',
    optionA: 'Everest',
    optionB: 'K2',
    correct: 'A',
  },
  {
    id: 'oceans',
    prompt: 'Which ocean is larger?',
    optionA: 'Pacific',
    optionB: 'Atlantic',
    correct: 'A',
  },
  {
    id: 'hot',
    prompt: 'Which planet is hottest?',
    optionA: 'Venus',
    optionB: 'Mercury',
    correct: 'A',
  },
  {
    id: 'state',
    prompt: 'Which US state joined the Union first?',
    optionA: 'Delaware',
    optionB: 'Pennsylvania',
    correct: 'A',
  },
  {
    id: 'crust',
    prompt: 'Which element is most abundant in Earth\u2019s crust?',
    optionA: 'Oxygen',
    optionB: 'Silicon',
    correct: 'A',
  },
  {
    id: 'sprint',
    prompt: 'Which land animal is faster in a sprint?',
    optionA: 'Cheetah',
    optionB: 'Lion',
    correct: 'A',
  },
];
