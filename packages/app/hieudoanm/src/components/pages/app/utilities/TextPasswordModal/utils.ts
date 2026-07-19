export const generatePassword = (
  length: number,
  upper: boolean,
  lower: boolean,
  digits: boolean,
  symbols: boolean
): string => {
  const chars = [
    ...(upper ? 'ABCDEFGHIJKLMNOPQRSTUVWXYZ' : ''),
    ...(lower ? 'abcdefghijklmnopqrstuvwxyz' : ''),
    ...(digits ? '0123456789' : ''),
    ...(symbols ? '!@#$%^&*()_+-=[]{}|;:,.<>?' : ''),
  ];
  if (chars.length === 0) return '';
  let result = '';
  const array = new Uint32Array(length);
  crypto.getRandomValues(array);
  for (let i = 0; i < length; i++) {
    result += chars[array[i] % chars.length];
  }
  return result;
};
