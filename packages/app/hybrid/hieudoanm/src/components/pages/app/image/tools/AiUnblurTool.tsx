'use client';

import { FC, useState, useCallback, useRef } from 'react';
import { Dropzone } from '@hieudoanm.github.io/components/atoms';
import { ImageToolConfig } from '../config';
import { downloadBlob, loadImage } from '../lib/canvas';

const laplacianSharpen = (
  data: Uint8ClampedArray,
  w: number,
  h: number,
  strength: number
) => {
  const copy = new Uint8ClampedArray(data);
  const kernel = [0, -1, 0, -1, 4, -1, 0, -1, 0];
  for (let y = 1; y < h - 1; y++) {
    for (let x = 1; x < w - 1; x++) {
      const idx = (y * w + x) * 4;
      for (let c = 0; c < 3; c++) {
        let laplacian = 0;
        for (let ky = -1; ky <= 1; ky++) {
          for (let kx = -1; kx <= 1; kx++) {
            const pIdx = ((y + ky) * w + (x + kx)) * 4 + c;
            laplacian += copy[pIdx] * kernel[(ky + 1) * 3 + (kx + 1)];
          }
        }
        const original = copy[idx + c];
        data[idx + c] = Math.min(
          255,
          Math.max(0, original - strength * laplacian)
        );
      }
    }
  }
};

export const AiUnblurTool: FC<{ config: ImageToolConfig }> = ({ config }) => {
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [strength, setStrength] = useState(0.5);
  const [iterations, setIterations] = useState(1);
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

    for (let iter = 0; iter < iterations; iter++) {
      const data = ctx.getImageData(0, 0, canvas.width, canvas.height);
      laplacianSharpen(data.data, canvas.width, canvas.height, strength);
      ctx.putImageData(data, 0, 0);
    }

    canvas.toBlob((blob) => {
      if (blob) downloadBlob(blob, `deblurred_${file.name}`);
      setLoading(false);
    });
  }, [file, strength, iterations]);

  return (
    <div className="flex flex-col gap-4">
      <Dropzone accept="image/*" onFile={(f) => setFile(f)} />

      <label className="flex flex-col gap-1 text-sm">
        <span>Strength: {(strength * 100).toFixed(0)}%</span>
        <input
          type="range"
          min={0.1}
          max={2}
          step={0.1}
          value={strength}
          onChange={(e) => setStrength(Number(e.target.value))}
        />
      </label>

      <label className="flex flex-col gap-1 text-sm">
        <span>Iterations: {iterations}</span>
        <input
          type="range"
          min={1}
          max={5}
          value={iterations}
          onChange={(e) => setIterations(Number(e.target.value))}
        />
      </label>

      <button
        className="btn btn-primary btn-sm"
        disabled={!file || loading}
        onClick={process}>
        {loading ? (
          <span className="loading loading-spinner" />
        ) : (
          'Apply Deblur'
        )}
      </button>
      <canvas ref={canvasRef} className="hidden" />
    </div>
  );
};
AiUnblurTool.displayName = 'AiUnblurTool';
