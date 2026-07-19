import type { SandboxParams, SandboxResult } from './types';

export const calcExpectedBusinessIncome = (
  income: number,
  risk: number
): number => Math.round((1 - risk) * income);

export const calcOpportunityCost = (wages: number, hours: number): number =>
  Math.round(wages * hours);

export const calcNetBenefit = (
  expectedIncome: number,
  oc: number,
  upfrontCost: number
): number => expectedIncome - oc - upfrontCost;

export const calcSandbox = (params: SandboxParams): SandboxResult => {
  const expectedBusinessIncome = calcExpectedBusinessIncome(
    params.businessIncome,
    params.risk
  );
  const opportunityCost = calcOpportunityCost(params.wages, params.hours);
  const netBenefit = calcNetBenefit(
    expectedBusinessIncome,
    opportunityCost,
    params.upfrontCost
  );
  return { expectedBusinessIncome, opportunityCost, netBenefit };
};
