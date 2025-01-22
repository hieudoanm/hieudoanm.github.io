export const addZero = (number: number): string =>
  number > 9 ? number.toString() : `0${number}`;
