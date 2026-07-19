import {
  ACTIVE_ACCEPT,
  ATTITUDES,
  EMPLOYEE_COUNT,
  SIM_TARGET,
} from './constants';
import type {
  Design,
  DomainScript,
  ParticipationRates,
  RoundReport,
  SimulatorOutcome,
} from './types';

export const REF_INERTIA = 50;

const clamp01 = (n: number): number => Math.min(0.95, Math.max(0.05, n));

export const participationFor = (
  design: Design,
  rates: ParticipationRates,
  inertia: number
): number => {
  const p = inertia / 100;
  const stickiness = p * 0.35;
  switch (design) {
    case 'opt-in':
      return Math.round(clamp01(rates.optIn * (1 - stickiness)) * 100);
    case 'opt-out':
      return Math.round(
        clamp01(rates.optOut + (1 - rates.optOut) * stickiness) * 100
      );
    case 'active-choice':
      return Math.round(clamp01(rates.activeChoice) * 100);
    case 'default-timer':
      return Math.round(
        clamp01(rates.defaultTimer + (1 - rates.defaultTimer) * p * 0.2) * 100
      );
  }
};

export const recommendedFor = (
  domain: DomainScript
): { design: Design; participation: number } => {
  const design = domain.bestDesign;
  return {
    design,
    participation: participationFor(design, domain, REF_INERTIA),
  };
};

export const buildReport = (
  round: number,
  domain: DomainScript,
  design: Design,
  inertia: number
): RoundReport => {
  const participation = participationFor(design, domain, inertia);
  const recommended = recommendedFor(domain);
  return {
    round,
    domainId: domain.id,
    design,
    inertia,
    participation,
    target: domain.target,
    hitTarget: participation >= domain.target,
    recommendedDesign: recommended.design,
    recommendedParticipation: recommended.participation,
    mechanism: domain.mechanism,
    mechanismText: domain.mechanismText,
  };
};

export const computeSimulator = (defaultRate: number): SimulatorOutcome => {
  const savers =
    Math.round(EMPLOYEE_COUNT * ATTITUDES.saver) +
    (defaultRate > 0
      ? Math.round(EMPLOYEE_COUNT * ATTITUDES.procrastinator)
      : 0) +
    Math.round(EMPLOYEE_COUNT * ATTITUDES.active * ACTIVE_ACCEPT);
  return {
    defaultRate,
    employees: EMPLOYEE_COUNT,
    savers,
    target: SIM_TARGET,
    hitTarget: savers >= SIM_TARGET,
  };
};
