'use client';

import { FC, useCallback, useRef, useState } from 'react';
import { Dropzone } from '@hieudoanm.github.io/components/atoms';
import { ImageToolConfig } from '../config';
import { downloadBlob, loadImage } from '../lib/canvas';

const boxBlur = (
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number,
  radius: number,
  centerFrac: number
) => {
  const cx = width / 2,
    cy = height / 2;
  const maxDist = Math.sqrt(cx * cx + cy * cy) * centerFrac;
  const imgData = ctx.getImageData(0, 0, width, height);
  const output = new Uint8ClampedArray(imgData.data);
  for (let y = 0; y < height; y++)
    for (let x = 0; x < width; x++) {
      const dist = Math.sqrt((x - cx) ** 2 + (y - cy) ** 2);
      if (dist > maxDist) {
        const blurR = Math.max(1, Math.floor(radius * (dist / maxDist)));
        let r = 0,
          g = 0,
          b = 0,
          count = 0;
        for (let dy = -blurR; dy <= blurR; dy++)
          for (let dx = -blurR; dx <= blurR; dx++) {
            const nx = x + dx,
              ny = y + dy;
            if (nx < 0 || nx >= width || ny < 0 || ny >= height) continue;
            const idx = (ny * width + nx) * 4;
            r += imgData.data[idx];
            g += imgData.data[idx + 1];
            b += imgData.data[idx + 2];
            count++;
          }
        const idx = (y * width + x) * 4;
        if (count > 0) {
          output[idx] = r / count;
          output[idx + 1] = g / count;
          output[idx + 2] = b / count;
        }
      }
    }
  ctx.putImageData(new ImageData(output, width, height), 0, 0);
};

export const ImageBlurBackgroundTool: FC<{ config: ImageToolConfig }> = () => {
  const [loading, setLoading] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [blurRadius, setBlurRadius] = useState(8);
  const [centerFrac, setCenterFrac] = useState(0.3);
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
    boxBlur(ctx, canvas.width, canvas.height, blurRadius, centerFrac);
    canvas.toBlob((blob) => {
      if (blob) downloadBlob(blob, `blur_${file.name}`);
      setLoading(false);
    });
  }, [file, blurRadius, centerFrac]);

  return (
    <div className="flex flex-col gap-4">
      <Dropzone accept="image/*" onFile={(f) => setFile(f)} />
      <label className="flex flex-col gap-1 text-sm">
        Blur Radius: {blurRadius}
        <input
          type="range"
          min={2}
          max={20}
          value={blurRadius}
          onChange={(e) => setBlurRadius(Number(e.target.value))}
        />
      </label>
      <label className="flex flex-col gap-1 text-sm">
        Center Clear Area: {Math.round(centerFrac * 100)}%
        <input
          type="range"
          min={0.1}
          max={0.8}
          step={0.05}
          value={centerFrac}
          onChange={(e) => setCenterFrac(Number(e.target.value))}
        />
      </label>
      <button
        className="btn btn-primary btn-sm"
        disabled={!file || loading}
        onClick={process}>
        {loading ? (
          <span className="loading loading-spinner" />
        ) : (
          'Apply Blur Background'
        )}
      </button>
      <canvas ref={canvasRef} className="hidden" />
    </div>
  );
};
ImageBlurBackgroundTool.displayName = 'ImageBlurBackgroundTool';
