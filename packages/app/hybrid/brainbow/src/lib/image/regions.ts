export const DEFAULT_MIN_REGION_SIZE = 4;

export const countRegions = (
  classified: Uint8Array,
  width: number,
  height: number,
  k: number,
  minRegionSize: number = DEFAULT_MIN_REGION_SIZE
): number[] => {
  const counts = new Array<number>(k).fill(0);
  if (width === 0 || height === 0 || classified.length === 0) {
    return counts;
  }
  const visited = new Uint8Array(classified.length);
  const stack: number[] = [];
  const neighbors = (index: number): number[] => {
    const x = index % width;
    const y = Math.floor(index / width);
    const out: number[] = [];
    if (x > 0) {
      out.push(index - 1);
    }
    if (x < width - 1) {
      out.push(index + 1);
    }
    if (y > 0) {
      out.push(index - width);
    }
    if (y < height - 1) {
      out.push(index + width);
    }
    return out;
  };
  for (let index = 0; index < classified.length; index += 1) {
    if (visited[index]) {
      continue;
    }
    const cluster = classified[index];
    visited[index] = 1;
    stack.length = 0;
    stack.push(index);
    let size = 0;
    while (stack.length > 0) {
      const current = stack.pop() as number;
      size += 1;
      for (const next of neighbors(current)) {
        if (!visited[next] && classified[next] === cluster) {
          visited[next] = 1;
          stack.push(next);
        }
      }
    }
    if (size >= minRegionSize) {
      counts[cluster] += 1;
    }
  }
  return counts;
};
