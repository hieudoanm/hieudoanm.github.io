export interface SnapshotChunk {
  dataUrl: string;
  y: number;
}

export async function stitchChunks(
  chunks: ReadonlyArray<SnapshotChunk>,
  widthPx: number,
  heightPx: number
): Promise<string> {
  const canvas = new OffscreenCanvas(widthPx, heightPx);
  const ctx = canvas.getContext('2d');
  if (!ctx) {
    throw new Error('Snapshot: canvas context unavailable');
  }

  ctx.fillStyle = '#ffffff';
  ctx.fillRect(0, 0, widthPx, heightPx);

  for (const chunk of chunks) {
    const bitmap = await dataUrlToBitmap(chunk.dataUrl);
    ctx.drawImage(bitmap, 0, chunk.y);
  }

  const blob = await canvas.convertToBlob({ type: 'image/png' });
  return blobToDataUrl(blob);
}

async function dataUrlToBitmap(dataUrl: string): Promise<ImageBitmap> {
  const response = await fetch(dataUrl);
  const blob = await response.blob();
  return createImageBitmap(blob);
}

function blobToDataUrl(blob: Blob): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => resolve(reader.result as string);
    reader.onerror = () => reject(new Error('Snapshot: failed to read blob'));
    reader.readAsDataURL(blob);
  });
}
