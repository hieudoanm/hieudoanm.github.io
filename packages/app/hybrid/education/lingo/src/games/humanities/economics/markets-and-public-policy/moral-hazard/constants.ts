import type { Contract } from './types';

export const TOTAL_ROUNDS = 6;
export const STARTING_WEALTH = 100;
export const LOSS_AMOUNT = 60;

export interface ContractMeta {
  premium: number;
  deductible: number;
  description: string;
}

export const CONTRACTS: Record<Contract, ContractMeta> = {
  none: { premium: 0, deductible: 0, description: 'No insurance' },
  full: { premium: 15, deductible: 0, description: 'Full coverage' },
  partial: { premium: 8, deductible: 20, description: 'Partial coverage' },
};
