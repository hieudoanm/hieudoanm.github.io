export function add(a: number, b: number): number {
  return a + b;
}

export function ceil(number: number, precision: number = 0): number {
  const factor = Math.pow(10, precision);
  return Math.ceil(number * factor) / factor;
}

export function divide(a: number, b: number): number {
  return a / b;
}

export function floor(number: number, precision: number = 0): number {
  const factor = Math.pow(10, precision);
  return Math.floor(number * factor) / factor;
}

export function max<T>(array: T[]): T | undefined {
  if (!array.length) return undefined;
  let maxVal = array[0];
  for (let i = 1; i < array.length; i++) {
    if (array[i]! > maxVal!) maxVal = array[i];
  }
  return maxVal;
}

export function maxBy<T>(
  array: T[],
  iteratee: (value: T) => number
): T | undefined {
  if (!array.length) return undefined;
  let maxVal = array[0];
  let maxScore = iteratee(array[0]!);
  for (let i = 1; i < array.length; i++) {
    const score = iteratee(array[i]!);
    if (score > maxScore) {
      maxScore = score;
      maxVal = array[i]!;
    }
  }
  return maxVal;
}

export function mean(array: number[]): number {
  if (!array.length) return NaN;
  let sum = 0;
  for (const n of array) sum += n;
  return sum / array.length;
}

export function meanBy<T>(array: T[], iteratee: (value: T) => number): number {
  if (!array.length) return NaN;
  let sum = 0;
  for (const item of array) sum += iteratee(item);
  return sum / array.length;
}

export function min<T>(array: T[]): T | undefined {
  if (!array.length) return undefined;
  let minVal = array[0];
  for (let i = 1; i < array.length; i++) {
    if (array[i]! < minVal!) minVal = array[i];
  }
  return minVal;
}

export function minBy<T>(
  array: T[],
  iteratee: (value: T) => number
): T | undefined {
  if (!array.length) return undefined;
  let minVal = array[0];
  let minScore = iteratee(array[0]!);
  for (let i = 1; i < array.length; i++) {
    const score = iteratee(array[i]!);
    if (score < minScore) {
      minScore = score;
      minVal = array[i]!;
    }
  }
  return minVal;
}

export function multiply(a: number, b: number): number {
  return a * b;
}

export function round(number: number, precision: number = 0): number {
  const factor = Math.pow(10, precision);
  return Math.round(number * factor) / factor;
}

export function subtract(a: number, b: number): number {
  return a - b;
}

export function sum(array: number[]): number {
  let total = 0;
  for (const n of array) total += n;
  return total;
}

export function sumBy<T>(array: T[], iteratee: (value: T) => number): number {
  let total = 0;
  for (const item of array) total += iteratee(item);
  return total;
}
