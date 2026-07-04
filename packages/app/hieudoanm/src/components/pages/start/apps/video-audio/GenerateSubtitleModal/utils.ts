export const downloadBlob = (blob: Blob, name: string) => {
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = name;
  a.click();
  URL.revokeObjectURL(url);
};

export const toSrt = (
  entries: { start: number; end: number; text: string }[]
) =>
  entries
    .map(
      (e, i) =>
        `${i + 1}\n${new Date(e.start * 1000).toISOString().slice(11, 23).replace('.', ',')} --> ${new Date(e.end * 1000).toISOString().slice(11, 23).replace('.', ',')}\n${e.text}`
    )
    .join('\n\n');

export const toVtt = (
  entries: { start: number; end: number; text: string }[]
) =>
  'WEBVTT\n\n' +
  entries
    .map(
      (e) =>
        `${new Date(e.start * 1000).toISOString().slice(11, 23)} --> ${new Date(e.end * 1000).toISOString().slice(11, 23)}\n${e.text}`
    )
    .join('\n\n');
