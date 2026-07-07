'use client';

import { FC, useState, useCallback, useRef } from 'react';
import { Dropzone } from '@hieudoanm.github.io/components/atoms';
import { ImageToolConfig } from '../config';
import { downloadBlob, loadImage } from '../lib/canvas';

const getDominantColor = (
  ctx: CanvasRenderingContext2D,
  w: number,
  h: number
): string => {
  const data = ctx.getImageData(0, 0, w, h).data;
  let r = 0,
    g = 0,
    b = 0,
    count = 0;
  for (let i = 0; i < data.length; i += 16) {
    r += data[i];
    g += data[i + 1];
    b += data[i + 2];
    count++;
  }
  r = Math.round(r / count);
  g = Math.round(g / count);
  b = Math.round(b / count);
  return `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`;
};

const getColorPalette = (
  ctx: CanvasRenderingContext2D,
  w: number,
  h: number,
  count: number
): string[] => {
  const data = ctx.getImageData(0, 0, w, h).data;
  const colorMap = new Map<string, number>();
  for (let i = 0; i < data.length; i += 12) {
    const r = Math.round(data[i] / 32) * 32;
    const g = Math.round(data[i + 1] / 32) * 32;
    const b = Math.round(data[i + 2] / 32) * 32;
    const key = `${r},${g},${b}`;
    colorMap.set(key, (colorMap.get(key) || 0) + 1);
  }
  return [...colorMap.entries()]
    .sort((a, b) => b[1] - a[1])
    .slice(0, count)
    .map(([key]) => {
      const [r, g, b] = key.split(',').map(Number);
      return `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`;
    });
};

export const ImageDominantColorTool: FC<{ config: ImageToolConfig }> = ({
  config,
}) => {
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [dominantResult, setDominantResult] = useState('');
  const [palette, setPalette] = useState<string[]>([]);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const handleFile = useCallback(async (f: File) => {
    setFile(f);
    setLoading(true);
    const img = await loadImage(f);
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext('2d')!;
    canvas.width = img.width;
    canvas.height = img.height;
    ctx.drawImage(img, 0, 0);
    const dominant = getDominantColor(ctx, canvas.width, canvas.height);
    const pal = getColorPalette(ctx, canvas.width, canvas.height, 8);
    setDominantResult(dominant);
    setPalette(pal);
    canvas.toBlob((blob) => {
      if (blob) downloadBlob(blob, `dominant_${f.name}`);
      setLoading(false);
    });
  }, []);

  return (
    <div className="flex flex-col gap-4">
      <Dropzone accept="image/*" onFile={handleFile} />
      {loading && <span className="loading loading-spinner" />}
      {dominantResult && (
        <div className="bg-base-200 space-y-2 rounded p-4 text-sm">
          <div className="flex items-center gap-2">
            <span className="font-normal">Dominant:</span>
            <span
              className="h-6 w-6 rounded border"
              style={{ backgroundColor: dominantResult }}
            />
            <span>{dominantResult}</span>
          </div>
          <div>
            <span className="font-normal">Palette:</span>
          </div>
          <div className="flex flex-wrap gap-1">
            {palette.map((c, i) => (
              <span
                key={i}
                className="h-8 w-8 rounded border"
                style={{ backgroundColor: c }}
                title={c}
              />
            ))}
          </div>
        </div>
      )}
      <canvas ref={canvasRef} className="hidden" />
    </div>
  );
};
ImageDominantColorTool.displayName = 'ImageDominantColorTool';
