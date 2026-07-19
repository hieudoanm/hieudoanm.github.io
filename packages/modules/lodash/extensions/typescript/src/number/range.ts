export const range = (start: number, end?: number, step?: number): number[] => {
  let from: number = start;
  let to: number | undefined = end;

  if (to === undefined) {
    from = 0;
    to = start;
  }

  const effectiveStep: number = step ?? (to < from ? -1 : 1);
  const length: number = Math.max(
    Math.ceil((to - from) / (effectiveStep || 1)),
    0
  );
  const result: number[] = [];

  for (let i = 0; i < length; i++) {
    result.push(from + i * effectiveStep);
  }

  return result;
};
