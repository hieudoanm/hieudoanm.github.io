export function extractBase64(str: string) {
  const trimmed = str.trim();
  const commaIdx = trimmed.indexOf('base64,');
  if (commaIdx !== -1) return trimmed.slice(commaIdx + 7);
  const spaceIdx = trimmed.indexOf(' ');
  if (spaceIdx === -1) return trimmed;
  return trimmed.split(/\s+/)[0];
}

export function isImageMime(mime: string) {
  return /^image\/(png|jpe?g|gif|webp|svg\+xml|bmp|avif)$/.test(mime);
}

export function sniffMime(raw: string): string | null {
  if (raw.startsWith('\u0089PNG')) return 'image/png';
  if (raw.startsWith('\u00ff\u00d8\u00ff')) return 'image/jpeg';
  if (raw.startsWith('GIF87a') || raw.startsWith('GIF89a')) return 'image/gif';
  if (raw.startsWith('RIFF') && raw.includes('WEBP')) return 'image/webp';
  if (raw.startsWith('<svg') || raw.startsWith('<?xml')) return 'image/svg+xml';
  if (raw.startsWith('BM')) return 'image/bmp';
  return null;
}

export function dataUrlFromMime(b64: string, mime: string) {
  return `data:${mime};base64,${b64}`;
}
