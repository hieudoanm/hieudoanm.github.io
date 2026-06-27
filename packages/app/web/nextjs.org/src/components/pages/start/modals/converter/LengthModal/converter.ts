export type Length =
  | 'yard'
  | 'foot'
  | 'inch'
  | 'centimeter'
  | 'meter'
  | 'kilometer';

export const lengthRates: Record<Length, number> = {
  yard: 1,
  foot: 3,
  inch: 36,
  centimeter: 91.44,
  meter: 0.9144,
  kilometer: 0.0009144,
};

export const convertRates =
  (rates: Record<string, number> = {}) =>
  (
    {
      fromAmount,
      fromUnit,
      toUnit,
    }: {
      fromAmount: number;
      fromUnit: string;
      toUnit: string;
    } = {
      fromAmount: 1,
      fromUnit: 'inch',
      toUnit: 'cm',
    }
  ): number => {
    return parseFloat(
      ((fromAmount * rates[toUnit]) / rates[fromUnit]).toFixed(2)
    );
  };
