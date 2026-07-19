import {
  DISCOUNT_RATE,
  HORIZON_YEARS,
  MAX_DEST_WAGE,
  MAX_MOVING_COST,
  MIN_DEST_WAGE,
  MIN_MOVING_COST,
} from './constants';
import type { DecisionResult, MacroSnapshot, QuizAnswer } from './types';

export const computeNPV = (
  w0: number,
  w1: number,
  p: number,
  m: number,
  r: number = DISCOUNT_RATE
): number => {
  let npv = -m;
  for (let t = 0; t < HORIZON_YEARS; t++) {
    npv += ((w1 - w0) * p) / Math.pow(1 + r, t);
  }
  return npv;
};

export const shouldMove = (npv: number): boolean => npv > 0;

export const evaluateDecision = (
  w0: number,
  w1: number,
  m: number,
  p: number
): DecisionResult => {
  const npv = computeNPV(w0, w1, p, m);
  const expectedIncomeMove = w1 * p;
  const expectedIncomeStay = w0;
  return { npv, shouldMove: npv > 0, expectedIncomeMove, expectedIncomeStay };
};

export const computeEquilibriumWage = (
  originWage: number,
  destWage: number,
  migrantCount: number,
  laborSupply: number,
  laborDemand: number
): number => {
  const totalSupply = laborSupply + migrantCount;
  const excessSupply = totalSupply - laborDemand;
  return Math.max(originWage, destWage - excessSupply * 0.05);
};

export const computeImmigrantSurplus = (
  equilibriumWage: number,
  destinationWage: number,
  migrantCount: number
): number => {
  if (migrantCount === 0) return 0;
  return (destinationWage - equilibriumWage) * migrantCount;
};

export const computeGDPGain = (
  migrantCount: number,
  equilibriumWage: number,
  originWage: number
): number => {
  return migrantCount * (equilibriumWage - originWage);
};

export const simulateMacro = (
  originWage: number,
  destWage: number,
  migrantCount: number,
  laborSupply: number,
  laborDemand: number
): MacroSnapshot => {
  const equilibriumWage = computeEquilibriumWage(
    originWage,
    destWage,
    migrantCount,
    laborSupply,
    laborDemand
  );
  const immigrantSurplus = computeImmigrantSurplus(
    equilibriumWage,
    destWage,
    migrantCount
  );
  const gdpGain = computeGDPGain(migrantCount, equilibriumWage, originWage);
  return {
    nativeWage: equilibriumWage,
    equilibriumWage,
    migrantCount,
    immigrantSurplus,
    gdpGain,
  };
};

const rand = (min: number, max: number): number =>
  Math.round(min + Math.random() * (max - min));

const randFloat = (min: number, max: number): number => {
  const value = min + Math.random() * (max - min);
  return Math.round(value * 100) / 100;
};

export const generateQuizParams = (): {
  w0: number;
  w1: number;
  m: number;
  p: number;
} => ({
  w0: rand(20000, 50000),
  w1: rand(MIN_DEST_WAGE, MAX_DEST_WAGE),
  m: rand(MIN_MOVING_COST, MAX_MOVING_COST),
  p: randFloat(0.7, 1.0),
});

export const judgeQuizAnswer = (
  answer: QuizAnswer,
  w0: number,
  w1: number,
  m: number,
  p: number
): { correct: boolean; npv: number } => {
  const npv = computeNPV(w0, w1, p, m);
  const correctAnswer: QuizAnswer = npv > 0 ? 'move' : 'stay';
  return { correct: answer === correctAnswer, npv };
};
