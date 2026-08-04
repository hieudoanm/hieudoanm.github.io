export const downloadBlob = (blob: Blob, filename: string): void => {
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement('a');
  anchor.href = url;
  anchor.download = filename;
  anchor.click();
  URL.revokeObjectURL(url);
};

export const downloadText = (
  filename: string,
  content: string,
  type = 'application/json'
): void => {
  downloadBlob(new Blob([content], { type }), filename);
};

export const readFileAsText = (file: File): Promise<string> => file.text();
