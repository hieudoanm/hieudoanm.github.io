export type Weight =
  'ton' | 'pound' | 'ounce' | 'kilogram' | 'gram' | 'milligram';

export const weightRates: Record<Weight, number> = {
  ton: 1,
  pound: 2_000,
  ounce: 32_000,
  kilogram: 907.18474,
  gram: 907184.74,
  milligram: 907184740,
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
      fromUnit: 'ounce',
      toUnit: 'cm',
    }
  ): number => {
    return parseFloat(
      ((fromAmount * rates[toUnit]) / rates[fromUnit]).toFixed(2)
    );
  };
