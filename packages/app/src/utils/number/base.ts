export const toBinary = (number: number): string => {
  return number.toString(2);
};

export const fromBinary = (binaryStr: string): number => {
  return parseInt(binaryStr, 2);
};

export const toOctal = (number: number): string => {
  return number.toString(8);
};

export const fromOctal = (binaryStr: string): number => {
  return parseInt(binaryStr, 8);
};

export const toHexadecimal = (number: number): string => {
  return number.toString(16);
};

export const fromHexadecimal = (binaryStr: string): number => {
  return parseInt(binaryStr, 16);
};
