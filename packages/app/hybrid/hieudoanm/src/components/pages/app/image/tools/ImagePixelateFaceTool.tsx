'use client';

import { FC, useCallback, useRef, useState } from 'react';
import { Dropzone } from '@hieudoanm.github.io/components/atoms';
import { ImageToolConfig } from '../config';
import { downloadBlob, loadImage } from '../lib/canvas';

const pixelateRegion = (
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number,
  size: number
) => {
  const faceX = Math.floor(width / 2),
    faceY = Math.floor(height / 3);
  const faceW = Math.floor(width * 0.3),
    faceH = Math.floor(height * 0.3);
  const startX = faceX - Math.floor(faceW / 2),
    startY = faceY - Math.floor(faceH / 2);
  for (let y = startY; y < startY + faceH; y += size)
    for (let x = startX; x < startX + faceW; x += size) {
      const idx = (y * width + x) * 4;
      const r = ctx.getImageData(x, y, 1, 1).data[0];
      ctx.fillStyle = `rgb(${r},${ctx.getImageData(x, y, 1, 1).data[1]},${ctx.getImageData(x, y, 1, 1).data[2]})`;
      ctx.fillRect(x, y, size, size);
    }
};

export const ImagePixelateFaceTool: FC<{ config: ImageToolConfig }> = () => {
  const [loading, setLoading] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [pixelSize, setPixelSize] = useState(10);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const process = useCallback(async () => {
    if (!file) return;
    setLoading(true);
    const img = await loadImage(file);
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext('2d')!;
    canvas.width = img.width;
    canvas.height = img.height;
    ctx.drawImage(img, 0, 0);
    pixelateRegion(ctx, canvas.width, canvas.height, pixelSize);
    canvas.toBlob((blob) => {
      if (blob) downloadBlob(blob, `pixelate_${file.name}`);
      setLoading(false);
    });
  }, [file, pixelSize]);

  return (
    <div className="flex flex-col gap-4">
      <Dropzone accept="image/*" onFile={(f) => setFile(f)} />
      <label className="flex flex-col gap-1 text-sm">
        Pixel Size: {pixelSize}
        <input
          type="range"
          min={3}
          max={30}
          value={pixelSize}
          onChange={(e) => setPixelSize(Number(e.target.value))}
        />
      </label>
      <button
        className="btn btn-primary btn-sm"
        disabled={!file || loading}
        onClick={process}>
        {loading ? (
          <span className="loading loading-spinner" />
        ) : (
          'Apply Pixelate Face'
        )}
      </button>
      <canvas ref={canvasRef} className="hidden" />
    </div>
  );
};
ImagePixelateFaceTool.displayName = 'ImagePixelateFaceTool';
