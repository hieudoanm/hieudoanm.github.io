import type { CurveKey, QuizScenario } from './types';

export const DEFAULT_CURVE = { a: 100, b: 2, c: 10, d: 1 } as const;

export const CURVE_RANGE: Record<
  CurveKey,
  { min: number; max: number; step: number; label: string }
> = {
  a: { min: 40, max: 160, step: 5, label: 'Demand intercept A' },
  b: { min: 1, max: 5, step: 0.5, label: 'Demand slope B' },
  c: { min: 0, max: 40, step: 2, label: 'Supply intercept C' },
  d: { min: 0.5, max: 3, step: 0.25, label: 'Supply slope D' },
};

export const WAGE_STEP = 1;

export interface CurvePreset {
  id: string;
  label: string;
  a: number;
  b: number;
  c: number;
  d: number;
}

export const CURVE_SCENARIOS: CurvePreset[] = [
  { id: 'base', label: 'Baseline', a: 100, b: 2, c: 10, d: 1 },
  { id: 'strong-hiring', label: 'Strong hiring', a: 140, b: 2, c: 10, d: 1 },
  { id: 'elastic-demand', label: 'Elastic demand', a: 120, b: 4, c: 10, d: 1 },
  { id: 'tight-supply', label: 'Tight supply', a: 100, b: 2, c: 40, d: 1 },
];

export const QUIZ_SCENARIOS: QuizScenario[] = [
  {
    id: 'q1',
    title: 'Maximize employment',
    prompt: 'Pick the minimum wage that keeps employment highest.',
    a: 120,
    b: 3,
    c: 15,
    d: 1.5,
    target: { kind: 'max-employment' },
  },
  {
    id: 'q2',
    title: '15 unemployed',
    prompt: 'Pick the minimum wage that pushes unemployment to 15 workers.',
    a: 100,
    b: 2,
    c: 10,
    d: 1,
    target: { kind: 'unemployment', amount: 15 },
  },
  {
    id: 'q3',
    title: 'No effect',
    prompt: 'Pick the minimum wage that has no effect on the labor market.',
    a: 140,
    b: 4,
    c: 20,
    d: 1,
    target: { kind: 'no-effect' },
  },
  {
    id: 'q4',
    title: '22 unemployed',
    prompt: 'Pick the minimum wage that pushes unemployment to 22 workers.',
    a: 120,
    b: 2,
    c: 10,
    d: 2,
    target: { kind: 'unemployment', amount: 22 },
  },
  {
    id: 'q5',
    title: 'Maximize employment',
    prompt: 'Pick the minimum wage that keeps employment highest.',
    a: 110,
    b: 5,
    c: 20,
    d: 2,
    target: { kind: 'max-employment' },
  },
  {
    id: 'q6',
    title: '12 unemployed',
    prompt: 'Pick the minimum wage that pushes unemployment to 12 workers.',
    a: 100,
    b: 3,
    c: 20,
    d: 1,
    target: { kind: 'unemployment', amount: 12 },
  },
];

export const TOTAL_QUIZ_ROUNDS = QUIZ_SCENARIOS.length;
