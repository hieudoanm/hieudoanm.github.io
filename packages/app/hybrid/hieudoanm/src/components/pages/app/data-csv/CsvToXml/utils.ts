export const downloadBlob = (blob: Blob, name: string) => {
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = name;
  a.click();
  URL.revokeObjectURL(url);
};

export const csvToXml = (csv: string): string => {
  const lines = csv.trim().split('\n');
  if (lines.length < 2) return '<root></root>';
  const headers = lines[0].split(',').map((h) => h.trim());
  let xml = '<?xml version="1.0" encoding="UTF-8"?>\n<root>\n';
  for (let i = 1; i < lines.length; i++) {
    const values = lines[i].split(',').map((v) => v.trim());
    xml += '  <item>\n';
    headers.forEach((h, j) => {
      const safeTag = h.replace(/[^a-zA-Z0-9_-]/g, '_');
      const safeVal = (values[j] || '')
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;');
      xml += `    <${safeTag}>${safeVal}</${safeTag}>\n`;
    });
    xml += '  </item>\n';
  }
  xml += '</root>';
  return xml;
};
