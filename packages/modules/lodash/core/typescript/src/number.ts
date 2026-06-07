export function clamp(number: number, lower: number, upper: number): number {
  return Math.min(Math.max(number, lower), upper);
}

export function inRange(number: number, start: number, end?: number): boolean {
  if (end === undefined) {
    end = start;
    start = 0;
  }
  return number >= Math.min(start, end) && number < Math.max(start, end);
}

export function random(
  lower: number = 0,
  upper?: number,
  floating?: boolean
): number {
  if (upper === undefined) {
    upper = lower;
    lower = 0;
  }
  const rand = Math.random() * (upper - lower) + lower;
  if (
    floating ||
    Number.isInteger(lower) === false ||
    Number.isInteger(upper) === false
  ) {
    return rand;
  }
  return Math.floor(rand);
}
