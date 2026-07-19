export type Design = 'opt-in' | 'opt-out' | 'active-choice' | 'default-timer';

export type Mechanism = 'status-quo-bias' | 'default-effect' | 'active-choice';

export type DomainId =
  'retirement' | 'organ' | 'energy' | 'privacy' | 'meal' | 'insurance';

export type Phase = 'design' | 'reveal' | 'simulator' | 'done';

export interface ParticipationRates {
  optIn: number;
  optOut: number;
  activeChoice: number;
  defaultTimer: number;
}

export interface DomainScript extends ParticipationRates {
  id: DomainId;
  label: string;
  emoji: string;
  context: string;
  target: number;
  bestDesign: Design;
  mechanism: Mechanism;
  mechanismText: string;
}

export interface RoundReport {
  round: number;
  domainId: DomainId;
  design: Design;
  inertia: number;
  participation: number;
  target: number;
  hitTarget: boolean;
  recommendedDesign: Design;
  recommendedParticipation: number;
  mechanism: Mechanism;
  mechanismText: string;
}

export interface SimulatorOutcome {
  defaultRate: number;
  employees: number;
  savers: number;
  target: number;
  hitTarget: boolean;
}
