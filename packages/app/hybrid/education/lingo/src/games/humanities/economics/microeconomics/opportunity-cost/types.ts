export type Phase = 'sandbox' | 'challenge' | 'done';

export interface SandboxParams {
  wages: number;
  hours: number;
  businessIncome: number;
  upfrontCost: number;
  risk: number;
}

export interface SandboxResult {
  expectedBusinessIncome: number;
  opportunityCost: number;
  netBenefit: number;
}

export interface ChallengeOption {
  label: string;
  description: string;
  value: number;
  oc: number;
}

export interface ChallengeRound {
  round: number;
  scenario: string;
  optionA: ChallengeOption;
  optionB: ChallengeOption;
  correctAnswer: 'A' | 'B';
}
