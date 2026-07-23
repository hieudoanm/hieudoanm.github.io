'use client';

import { FC, useCallback, useRef, useState } from 'react';
import { Dropzone } from '@hieudoanm.github.io/components/atoms';
import { ImageToolConfig } from '../config';
import { downloadBlob, loadImage } from '../lib/canvas';

const FILTERS = [
  'sepia',
  'vintage',
  'invert',
  'grayscale',
  'warm',
  'cool',
] as const;

const applyFilter = (
  ctx: CanvasRenderingContext2D,
  w: number,
  h: number,
  filter: string
) => {
  const data = ctx.getImageData(0, 0, w, h).data;
  const out = ctx.createImageData(w, h);
  for (let i = 0; i < data.length; i += 4) {
    const r = data[i],
      g = data[i + 1],
      b = data[i + 2],
      a = data[i + 3];
    let nr = r,
      ng = g,
      nb = b;
    switch (filter) {
      case 'sepia':
        nr = r * 0.393 + g * 0.769 + b * 0.189;
        ng = r * 0.349 + g * 0.686 + b * 0.168;
        nb = r * 0.272 + g * 0.534 + b * 0.131;
        break;
      case 'vintage':
        nr = r * 0.9 + 20;
        ng = g * 0.85 + 10;
        nb = b * 0.75;
        break;
      case 'invert':
        nr = 255 - r;
        ng = 255 - g;
        nb = 255 - b;
        break;
      case 'grayscale':
        const gray = r * 0.299 + g * 0.587 + b * 0.114;
        nr = gray;
        ng = gray;
        nb = gray;
        break;
      case 'warm':
        nr = Math.min(255, r * 1.2);
        ng = g;
        nb = Math.max(0, b * 0.8);
        break;
      case 'cool':
        nr = Math.max(0, r * 0.8);
        ng = g;
        nb = Math.min(255, b * 1.2);
        break;
    }
    out.data[i] = Math.min(255, Math.max(0, nr));
    out.data[i + 1] = Math.min(255, Math.max(0, ng));
    out.data[i + 2] = Math.min(255, Math.max(0, nb));
    out.data[i + 3] = a;
  }
  ctx.putImageData(out, 0, 0);
};

export const ImagePhotoFiltersTool: FC<{ config: ImageToolConfig }> = () => {
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState<string>('sepia');
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
    applyFilter(ctx, canvas.width, canvas.height, selectedFilter);
    canvas.toBlob((blob) => {
      if (blob) downloadBlob(blob, `filter_${file.name}`);
      setLoading(false);
    });
  }, [file, selectedFilter]);

  return (
    <div className="flex flex-col gap-4">
      <Dropzone accept="image/*" onFile={(f) => setFile(f)} />
      <div className="flex flex-wrap gap-2">
        {FILTERS.map((f) => (
          <button
            key={f}
            className={`btn btn-sm ${selectedFilter === f ? 'btn-primary' : 'btn-ghost'}`}
            onClick={() => setSelectedFilter(f)}>
            {f}
          </button>
        ))}
      </div>
      <button
        className="btn btn-primary btn-sm"
        disabled={!file || loading}
        onClick={process}>
        {loading ? (
          <span className="loading loading-spinner" />
        ) : (
          'Apply Filter'
        )}
      </button>
      <canvas ref={canvasRef} className="hidden" />
    </div>
  );
};
ImagePhotoFiltersTool.displayName = 'ImagePhotoFiltersTool';
