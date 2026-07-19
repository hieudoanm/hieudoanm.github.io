import type { QuizQuestion } from './types';

export const PROD_A = 10;
export const PROD_B = 0.6;

export const MIN_LABOR = 0;
export const MAX_LABOR = 20;
export const MIN_WAGE = 1;
export const MAX_WAGE = 100;
export const MIN_FC = 0;
export const MAX_FC = 1000;

export const DEFAULT_WAGE = 10;
export const DEFAULT_FC = 100;
export const DEFAULT_PRICE = 20;

export const TOTAL_QUIZ_ROUNDS = 5;

export const QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: 1,
    prompt: 'Where is average total cost at its minimum?',
    options: [
      'Where MC is at its own minimum',
      'Where MC crosses ATC from below',
      'Where AVC crosses ATC',
      'Where TC equals TVC',
    ],
    correctIndex: 1,
    explanation:
      'While MC < ATC, ATC falls; once MC > ATC, ATC rises. So MC crosses ATC at the minimum of ATC.',
  },
  {
    id: 2,
    prompt:
      'With w=$10 and FC=$100, and output price P=$4.00, what output Q maximizes profit?',
    options: ['Q ≈ 35', 'Q ≈ 37', 'Q ≈ 40', 'Q ≈ 44'],
    correctIndex: 1,
    explanation:
      'Produce where P = MC. MC = w/MP ≈ 4 when MP ≈ 2.5, which holds near L=9 where Q ≈ 37.',
  },
  {
    id: 3,
    prompt: 'Which curve does MC always cross exactly at its own minimum?',
    options: ['AVC', 'ATC', 'AFC', 'TVC'],
    correctIndex: 1,
    explanation:
      "MC crosses ATC at ATC's minimum, and it also crosses AVC at AVC's minimum—the classic textbook result.",
  },
  {
    id: 4,
    prompt:
      'MP sequence: 10.0, 5.2, 4.2, 3.7, 3.3, 3.0, 2.8... At which hiring level does MP first start to decrease?',
    options: ['L = 1', 'L = 2', 'L = 3', 'L = 4'],
    correctIndex: 1,
    explanation:
      'MP peaks at L=1 (MP ≈ 10) and falls at every hiring level after that: MP(2) ≈ 5.2 < 10. Diminishing returns begins at L=2.',
  },
  {
    id: 5,
    prompt:
      'If the output price P falls below the minimum of average variable cost, what should the firm do?',
    options: [
      'Produce where P = MC',
      'Shut down and produce nothing',
      'Raise fixed costs',
      'Hire more workers',
    ],
    correctIndex: 1,
    explanation:
      'When P < min AVC the firm cannot cover its variable costs. Shutting down limits losses to fixed costs.',
  },
];
