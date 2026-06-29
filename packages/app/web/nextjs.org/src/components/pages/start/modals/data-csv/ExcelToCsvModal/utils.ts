export const downloadBlob = (blob: Blob, name: string) => {
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = name;
  a.click();
  URL.revokeObjectURL(url);
};

export const toCSV = (rows: string[][]): string => {
  return rows
    .map((row) =>
      row
        .map((f) =>
          f.includes(',') || f.includes('"') || f.includes('\n')
            ? `"${f.replace(/"/g, '""')}"`
            : f
        )
        .join(',')
    )
    .join('\n');
};

export const readFile = (file: File): Promise<ArrayBuffer> =>
  new Promise((res, rej) => {
    const r = new FileReader();
    r.onload = () => res(r.result as ArrayBuffer);
    r.onerror = () => rej(r.error);
    r.readAsArrayBuffer(file);
  });
