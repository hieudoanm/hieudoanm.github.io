import type { GoodType, OptimalBundle } from './types';

export interface LabParams {
  income: number;
  px: number;
  py: number;
  alpha: number;
  goodType: GoodType;
}

export const qyOnBudget = (params: LabParams, qx: number): number =>
  Math.max(0, (params.income - params.px * qx) / params.py);

export const utility = (params: LabParams, x: number, y: number): number => {
  switch (params.goodType) {
    case 'cobb-douglas':
      return Math.pow(x, params.alpha) * Math.pow(y, 1 - params.alpha);
    case 'perfect-substitutes':
      return x + y;
    case 'perfect-complements':
      return Math.min(x, y);
  }
};

const cobbOptimal = (params: LabParams): OptimalBundle => {
  const k = (1 - params.alpha) / params.alpha;
  const x = params.income / (params.px * (1 + k));
  return { x, y: (k * x * params.px) / params.py };
};

const substituteOptimal = (params: LabParams): OptimalBundle => {
  if (params.px < params.py) return { x: params.income / params.px, y: 0 };
  if (params.py < params.px) return { x: 0, y: params.income / params.py };
  return {
    x: params.income / (2 * params.px),
    y: params.income / (2 * params.py),
  };
};

const complementOptimal = (params: LabParams): OptimalBundle => {
  const x = params.income / (params.px + params.py);
  return { x, y: x };
};

export const optimalBundle = (params: LabParams): OptimalBundle => {
  switch (params.goodType) {
    case 'cobb-douglas':
      return cobbOptimal(params);
    case 'perfect-substitutes':
      return substituteOptimal(params);
    case 'perfect-complements':
      return complementOptimal(params);
  }
};

export const mrsAt = (
  params: LabParams,
  x: number,
  y: number
): number | null => {
  switch (params.goodType) {
    case 'cobb-douglas':
      if (x <= 0 || y <= 0) return null;
      return (params.alpha * y) / ((1 - params.alpha) * x);
    case 'perfect-substitutes':
      return 1;
    case 'perfect-complements':
      return null;
  }
};

export const budgetSatisfied = (
  params: LabParams,
  x: number,
  y: number
): boolean => Math.abs(params.px * x + params.py * y - params.income) < 1e-6;

export const score = (choiceU: number, optU: number): number => {
  if (optU <= 0) return choiceU <= 0 ? 100 : 0;
  const diff = Math.max(0, optU - choiceU);
  return Math.max(0, Math.min(100, Math.round(100 - (diff / optU) * 100)));
};

export const priceRatio = (params: LabParams): number => params.px / params.py;
