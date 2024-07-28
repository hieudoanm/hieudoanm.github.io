export const formatNumber = (x: number = 0) => {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};

export const formatCurrency = (number: number, currency: string = 'US') => {
  return new Intl.NumberFormat('en-US', { style: 'currency', currency }).format(
    number
  );
};

export const isNumeric = (str: string) => {
  if (typeof str != 'string') return false;
  return !Number.isNaN(str) && !Number.isNaN(parseFloat(str));
};

export const addZero = (number: number, repeat = 1): string => {
  if (repeat < 1) return `${number}`;
  const numberofZero: number = number > 9 ? repeat - 1 : repeat;
  const prefix: string = '0'.repeat(numberofZero);
  return `${prefix}${number}`;
};
