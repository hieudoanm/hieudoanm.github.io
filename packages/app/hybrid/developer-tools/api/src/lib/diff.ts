export interface DiffLine {
  type: 'same' | 'added' | 'removed';
  text: string;
}

const lcsTable = (a: string[], b: string[]): number[][] => {
  const rows = a.length + 1;
  const cols = b.length + 1;
  const table: number[][] = Array.from({ length: rows }, () =>
    Array(cols).fill(0)
  );
  for (let i = 1; i < rows; i += 1) {
    for (let j = 1; j < cols; j += 1) {
      table[i][j] =
        a[i - 1] === b[j - 1]
          ? table[i - 1][j - 1] + 1
          : Math.max(table[i - 1][j], table[i][j - 1]);
    }
  }
  return table;
};

const backTrack = (a: string[], b: string[], table: number[][]): DiffLine[] => {
  const lines: DiffLine[] = [];
  let i = a.length;
  let j = b.length;
  while (i > 0 && j > 0) {
    if (a[i - 1] === b[j - 1]) {
      lines.unshift({ type: 'same', text: a[i - 1] });
      i -= 1;
      j -= 1;
    } else if (table[i - 1][j] >= table[i][j - 1]) {
      lines.unshift({ type: 'removed', text: a[i - 1] });
      i -= 1;
    } else {
      lines.unshift({ type: 'added', text: b[j - 1] });
      j -= 1;
    }
  }
  while (i > 0) {
    lines.unshift({ type: 'removed', text: a[i - 1] });
    i -= 1;
  }
  while (j > 0) {
    lines.unshift({ type: 'added', text: b[j - 1] });
    j -= 1;
  }
  return lines;
};

export const diffLines = (before: string, after: string): DiffLine[] => {
  const a = before === '' ? [] : before.split('\n');
  const b = after === '' ? [] : after.split('\n');
  return backTrack(a, b, lcsTable(a, b));
};

export const diffStats = (
  before: string,
  after: string
): { added: number; removed: number } => {
  const lines = diffLines(before, after);
  let added = 0;
  let removed = 0;
  for (const line of lines) {
    if (line.type === 'added') added += 1;
    if (line.type === 'removed') removed += 1;
  }
  return { added, removed };
};
