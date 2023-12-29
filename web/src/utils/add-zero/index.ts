export const addZero = (number: number, repeat: number = 1): string => {
  if (repeat < 1) repeat = 1;
  const numberofZero: number = number > 9 ? repeat - 1 : repeat;
  const prefix: string = '0'.repeat(numberofZero);
  return `${prefix}${number}`;
};
