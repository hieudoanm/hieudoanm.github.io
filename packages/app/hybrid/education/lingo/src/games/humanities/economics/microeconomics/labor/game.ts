import type { LaborCurve, LaborMetrics, QuizScenario } from './types';

export const demandAt = (wage: number, curve: LaborCurve): number =>
  Math.max(0, curve.a - curve.b * wage);

export const supplyAt = (wage: number, curve: LaborCurve): number =>
  Math.max(0, curve.c + curve.d * wage);

export const equilibriumWage = (curve: LaborCurve): number => {
  const denom = curve.b + curve.d;
  return denom === 0 ? 0 : (curve.a - curve.c) / denom;
};

export const equilibriumEmployment = (curve: LaborCurve): number =>
  demandAt(equilibriumWage(curve), curve);

export const effectiveWage = (wMin: number, curve: LaborCurve): number =>
  Math.max(wMin, equilibriumWage(curve));

export const employmentAt = (wMin: number, curve: LaborCurve): number => {
  const wage = effectiveWage(wMin, curve);
  return Math.min(demandAt(wage, curve), supplyAt(wage, curve));
};

export const unemploymentAt = (wMin: number, curve: LaborCurve): number =>
  wMin > equilibriumWage(curve)
    ? Math.max(0, supplyAt(wMin, curve) - demandAt(wMin, curve))
    : 0;

const totalSurplusAt = (employment: number, curve: LaborCurve): number => {
  const denom = 2 * curve.b * curve.d;
  if (denom === 0) return 0;
  return (
    employment * (curve.a / curve.b + curve.c / curve.d) -
    (employment * employment * (curve.b + curve.d)) / denom
  );
};

export const surplusAt = (wMin: number, curve: LaborCurve): number =>
  totalSurplusAt(employmentAt(wMin, curve), curve);

export const deficitAt = (wMin: number, curve: LaborCurve): number =>
  Math.max(
    0,
    totalSurplusAt(equilibriumEmployment(curve), curve) -
      totalSurplusAt(employmentAt(wMin, curve), curve)
  );

export const computeMetrics = (
  wMin: number,
  curve: LaborCurve
): LaborMetrics => {
  const wage = effectiveWage(wMin, curve);
  const demand = demandAt(wage, curve);
  const supply = supplyAt(wage, curve);
  const employment = employmentAt(wMin, curve);
  return {
    wStar: equilibriumWage(curve),
    qStar: equilibriumEmployment(curve),
    demand,
    supply,
    employment,
    unemployment: unemploymentAt(wMin, curve),
    surplus: surplusAt(wMin, curve),
    deficit: deficitAt(wMin, curve),
  };
};

export interface QuizOptionsFrame {
  options: number[];
  correctIndex: number;
}

const rotateLeft = <T>(items: T[], amount: number): T[] => [
  ...items.slice(amount),
  ...items.slice(0, amount),
];

export const quizOptions = (scenario: QuizScenario): QuizOptionsFrame => {
  const wStar = equilibriumWage(scenario);
  const correct =
    scenario.target.kind === 'unemployment'
      ? Math.round(
          (scenario.a - scenario.c + scenario.target.amount) /
            (scenario.b + scenario.d)
        )
      : Math.floor(wStar);
  const rotation = (scenario.a + scenario.c) % 4;
  const options = rotateLeft(
    [correct, correct + 4, correct + 7, correct + 10],
    rotation
  );
  const correctIndex = (4 - rotation) % 4;
  return { options, correctIndex };
};
