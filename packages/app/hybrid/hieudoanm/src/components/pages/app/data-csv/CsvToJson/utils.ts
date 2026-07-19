export const downloadBlob = (blob: Blob, name: string) => {
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = name;
  a.click();
  URL.revokeObjectURL(url);
};

export const csvToJson = (csv: string): string => {
  const lines = csv.trim().split('\n');
  if (lines.length < 2) return '[]';
  const headers = lines[0].split(',').map((h) => h.trim());
  const result = [];
  for (let i = 1; i < lines.length; i++) {
    const values = lines[i].split(',').map((v) => v.trim());
    const obj: Record<string, string> = {};
    headers.forEach((h, j) => {
      obj[h] = values[j] || '';
    });
    result.push(obj);
  }
  return JSON.stringify(result, null, 2);
};
