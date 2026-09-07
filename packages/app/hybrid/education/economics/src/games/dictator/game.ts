import { ENDOWMENT } from './constants';

export const keep = (give: number, endowment: number = ENDOWMENT): number =>
  endowment - give;

export const selfishGive = (): number => 0;

export const fairGive = (): number => 50;

export const generousGive = (): number => 80;

export const average = (xs: number[]): number =>
  xs.length === 0 ? 0 : xs.reduce((sum, x) => sum + x, 0) / xs.length;
