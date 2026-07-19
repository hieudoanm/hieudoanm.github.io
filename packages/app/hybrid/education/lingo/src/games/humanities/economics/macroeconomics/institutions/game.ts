import {
  BASE_TFP,
  DEPRECIATION,
  MAX_GROWTH,
  SAVINGS_BASE,
  SAVINGS_SCALE,
  WEIGHTS,
} from './constants';
import type { Institutions, SimulationResult, YearRecord } from './types';

const clamp = (value: number, min: number, max: number): number =>
  Math.min(max, Math.max(min, value));

export const institutionalQuality = (i: Institutions): number =>
  (WEIGHTS.propertyRights * i.propertyRights +
    WEIGHTS.contracts * i.contracts +
    WEIGHTS.stability * i.stability) /
  100;

export const tfpFor = (quality: number): number => BASE_TFP * (0.5 + quality);

export const growthRateFor = (quality: number): number =>
  MAX_GROWTH * (0.5 + quality);

export const investmentRateFor = (quality: number): number =>
  SAVINGS_BASE + SAVINGS_SCALE * quality;

export const simulateYears = (
  initialCapital: number,
  initialGdp: number,
  quality: number,
  years: number
): YearRecord[] => {
  const growth = growthRateFor(quality);
  const investment = investmentRateFor(quality);
  const tfp = tfpFor(quality);
  const records: YearRecord[] = [];
  let capital = initialCapital;
  let gdp = initialGdp;
  for (let year = 1; year <= years; year++) {
    const output = tfp * Math.pow(capital, 0.3);
    const nextCapital = capital + investment * output - DEPRECIATION * capital;
    capital = Math.max(0.01, nextCapital);
    gdp = gdp * (1 + growth);
    records.push({
      year,
      tfp,
      capital: Math.round(capital),
      gdp: Math.round(gdp),
    });
  }
  return records;
};

export const runSimulation = (
  institutions: Institutions,
  initialCapital: number,
  initialGdp: number
): SimulationResult => {
  const quality = clamp(institutionalQuality(institutions), 0, 1);
  const growth = growthRateFor(quality);
  const investment = investmentRateFor(quality);
  const tfp = tfpFor(quality);
  const years = simulateYears(initialCapital, initialGdp, quality, 10);
  const finalGdp = years[years.length - 1].gdp;
  return {
    years,
    gdpPerCapita: finalGdp,
    growthPct: Math.round(growth * 10000) / 100,
    investmentRate: Math.round(investment * 10000) / 100,
    tfp: Math.round(tfp),
  };
};

export const growthPctOverPeriod = (
  initialGdp: number,
  finalGdp: number
): number => ((finalGdp - initialGdp) / initialGdp) * 100;

export const isTargetHit = (
  growthPct: number,
  target: number,
  tolerance: number
): boolean => Math.abs(growthPct - target) <= tolerance;
