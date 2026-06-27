export type DataUnit =
  | 'bit'
  | 'kilobyte'
  | 'megabyte'
  | 'gigabyte'
  | 'terabyte';

export const dataRates: Record<DataUnit, number> = {
  bit: 1,
  kilobyte: 8 * 1024,
  megabyte: 8 * 1024 * 1024,
  gigabyte: 8 * 1024 * 1024 * 1024,
  terabyte: 8 * 1024 * 1024 * 1024 * 1024,
};

export const convertDataRates =
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
      fromUnit: 'bit',
      toUnit: 'megabyte',
    }
  ): number => {
    const amountInBits = fromAmount * rates[fromUnit];
    return parseFloat((amountInBits / rates[toUnit]).toFixed(6));
  };
