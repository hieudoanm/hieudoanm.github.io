'use client';

import { FC, useCallback, useRef, useState } from 'react';
import { Dropzone } from '@hieudoanm.github.io/components/atoms';
import { ImageToolConfig } from '../config';
import { downloadBlob, loadImage } from '../lib/canvas';

const chromaKey = (
  ctx: CanvasRenderingContext2D,
  w: number,
  h: number,
  target: string,
  threshold: number
) => {
  const imgData = ctx.getImageData(0, 0, w, h);
  const hex = target.replace('#', '');
  const tr = Number.parseInt(hex.substring(0, 2), 16);
  const tg = Number.parseInt(hex.substring(2, 4), 16);
  const tb = Number.parseInt(hex.substring(4, 6), 16);
  for (let i = 0; i < imgData.data.length; i += 4) {
    const dist = Math.sqrt(
      (imgData.data[i] - tr) ** 2 +
        (imgData.data[i + 1] - tg) ** 2 +
        (imgData.data[i + 2] - tb) ** 2
    );
    if (dist < threshold) imgData.data[i + 3] = 0;
  }
  ctx.putImageData(imgData, 0, 0);
};

export const ImageTransparentBgTool: FC<{ config: ImageToolConfig }> = () => {
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [keyColor, setKeyColor] = useState('#00ff00');
  const [threshold, setThreshold] = useState(100);
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
    chromaKey(ctx, canvas.width, canvas.height, keyColor, threshold);
    canvas.toBlob((blob) => {
      if (blob) downloadBlob(blob, `transparent_${file.name}`);
      setLoading(false);
    });
  }, [file, keyColor, threshold]);

  return (
    <div className="flex flex-col gap-4">
      <Dropzone accept="image/*" onFile={(f) => setFile(f)} />
      <label className="flex items-center gap-2 text-sm">
        Key Color:{' '}
        <input
          type="color"
          value={keyColor}
          onChange={(e) => setKeyColor(e.target.value)}
        />
      </label>
      <label className="flex flex-col gap-1 text-sm">
        Threshold: {threshold}
        <input
          type="range"
          min={10}
          max={200}
          value={threshold}
          onChange={(e) => setThreshold(Number(e.target.value))}
        />
      </label>
      <button
        className="btn btn-primary btn-sm"
        disabled={!file || loading}
        onClick={process}>
        {loading ? (
          <span className="loading loading-spinner" />
        ) : (
          'Make Transparent'
        )}
      </button>
      <canvas ref={canvasRef} className="hidden" />
    </div>
  );
};
ImageTransparentBgTool.displayName = 'ImageTransparentBgTool';
