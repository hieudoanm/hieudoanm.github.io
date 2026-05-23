export const parsePageRange = (range: string, total: number): number[] => {
  if (!range.trim()) return Array.from({ length: total }, (_, i) => i);
  const selected = new Set<number>();
  for (const part of range.split(',')) {
    const trimmed = part.trim();
    if (trimmed.includes('-')) {
      const [s, e] = trimmed.split('-').map(Number);
      for (let i = s; i <= Math.min(e, total); i++) selected.add(i - 1);
    } else {
      const n = Number(trimmed);
      if (n > 0 && n <= total) selected.add(n - 1);
    }
  }
  return [...selected].sort((a, b) => a - b);
};

export const downloadBlob = (blob: Blob, name: string) => {
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = name;
  a.click();
  URL.revokeObjectURL(url);
};
