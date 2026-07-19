export const downloadBlob = (blob: Blob, name: string) => {
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = name;
  a.click();
  URL.revokeObjectURL(url);
};

export const jsonToCsv = (json: string): string => {
  const data = JSON.parse(json);
  const arr = Array.isArray(data) ? data : [data];
  if (arr.length === 0) return '';
  const keys = Object.keys(arr[0]);
  const lines = [keys.join(',')];
  for (const item of arr) {
    lines.push(keys.map((k) => String(item[k] ?? '')).join(','));
  }
  return lines.join('\n');
};
