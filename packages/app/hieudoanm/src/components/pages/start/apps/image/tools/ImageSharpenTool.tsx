'use client';

import { FC, useCallback, useRef, useState } from 'react';
import { Dropzone } from '@hieudoanm.github.io/components/atoms';
import { ImageToolConfig } from '../config';
import { downloadBlob, loadImage } from '../lib/canvas';

const applyConvolution = (
  ctx: CanvasRenderingContext2D,
  w: number,
  h: number,
  kernel: number[]
) => {
  const imgData = ctx.getImageData(0, 0, w, h);
  const out = ctx.createImageData(w, h);
  for (let y = 1; y < h - 1; y++)
    for (let x = 1; x < w - 1; x++) {
      let r = 0,
        g = 0,
        b = 0,
        idx = 0;
      for (let ky = -1; ky <= 1; ky++)
        for (let kx = -1; kx <= 1; kx++) {
          const px = (y + ky) * w + (x + kx);
          const ki = idx++;
          r += imgData.data[px * 4] * kernel[ki];
          g += imgData.data[px * 4 + 1] * kernel[ki];
          b += imgData.data[px * 4 + 2] * kernel[ki];
        }
      const oi = (y * w + x) * 4;
      out.data[oi] = Math.min(255, Math.max(0, r));
      out.data[oi + 1] = Math.min(255, Math.max(0, g));
      out.data[oi + 2] = Math.min(255, Math.max(0, b));
      out.data[oi + 3] = 255;
    }
  ctx.putImageData(out, 0, 0);
};

export const ImageSharpenTool: FC<{ config: ImageToolConfig }> = ({
  config,
}) => {
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [amount, setAmount] = useState(1);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const processImage = useCallback(async () => {
    if (!file) return;
    setLoading(true);
    const img = await loadImage(file);
    const canvas = document.createElement('canvas');
    canvas.width = img.width;
    canvas.height = img.height;
    const ctx = canvas.getContext('2d')!;
    ctx.drawImage(img, 0, 0);
    const kernel = [
      0,
      -amount,
      0,
      -amount,
      4 * amount + 1,
      -amount,
      0,
      -amount,
      0,
    ];
    applyConvolution(ctx, img.width, img.height, kernel);
    canvas.toBlob((blob) => {
      if (blob) downloadBlob(blob, `sharpened_${file.name}`);
      setLoading(false);
    });
  }, [file, amount]);

  return (
    <div className="flex flex-col gap-4">
      <div className="rounded-box border-base-300 bg-base-200 border p-4">
        <div className="flex flex-col gap-4">
          <Dropzone accept="image/*" onFile={(f) => setFile(f)} />
          {file && (
            <>
              <label className="flex flex-col gap-1">
                <span className="text-sm">Amount: {amount.toFixed(1)}</span>
                <input
                  type="range"
                  min={0.1}
                  max={3}
                  step={0.1}
                  value={amount}
                  onChange={(e) => setAmount(Number(e.target.value))}
                  className="range range-sm"
                />
              </label>
              <button
                className="btn btn-primary btn-sm"
                disabled={loading}
                onClick={processImage}>
                {loading ? (
                  <span className="loading loading-spinner" />
                ) : (
                  'Sharpen & Download'
                )}
              </button>
            </>
          )}
        </div>
        <canvas ref={canvasRef} className="hidden" />
      </div>
    </div>
  );
};
ImageSharpenTool.displayName = 'ImageSharpenTool';
