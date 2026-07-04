'use client';

import { FC, useCallback, useRef, useState } from 'react';
import { Dropzone } from '@hieudoanm.github.io/components/atoms';
import { ImageToolConfig } from '../config';
import { downloadBlob, loadImage } from '../lib/canvas';

type Position =
  'top-left' | 'top-right' | 'bottom-left' | 'bottom-right' | 'center';

const POSITIONS: Position[] = [
  'top-left',
  'top-right',
  'bottom-left',
  'bottom-right',
  'center',
];

export const ImageWatermarkTool: FC<{ config: ImageToolConfig }> = () => {
  const [file, setFile] = useState<File | null>(null);
  const [watermarkFile, setWatermarkFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [position, setPosition] = useState<Position>('bottom-right');
  const [opacity, setOpacity] = useState(0.5);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const process = useCallback(async () => {
    if (!file || !watermarkFile) return;
    setLoading(true);
    const [img, watermark] = await Promise.all([
      loadImage(file),
      loadImage(watermarkFile),
    ]);
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext('2d')!;
    canvas.width = img.width;
    canvas.height = img.height;
    ctx.drawImage(img, 0, 0);
    ctx.globalAlpha = opacity;
    const mw = Math.min(watermark.width, canvas.width / 3);
    const mh = watermark.height * (mw / watermark.width);
    const positions: Record<Position, [number, number]> = {
      'top-left': [10, 10],
      'top-right': [canvas.width - mw - 10, 10],
      'bottom-left': [10, canvas.height - mh - 10],
      'bottom-right': [canvas.width - mw - 10, canvas.height - mh - 10],
      center: [(canvas.width - mw) / 2, (canvas.height - mh) / 2],
    };
    const [px, py] = positions[position];
    ctx.drawImage(watermark, px, py, mw, mh);
    ctx.globalAlpha = 1;
    canvas.toBlob((blob) => {
      if (blob) downloadBlob(blob, `watermark_${file.name}`);
      setLoading(false);
    });
  }, [file, watermarkFile, position, opacity]);

  return (
    <div className="flex flex-col gap-4">
      <div>
        <p className="mb-1 text-xs opacity-60">Image</p>
        <Dropzone accept="image/*" onFile={(f) => setFile(f)} />
      </div>
      <div>
        <p className="mb-1 text-xs opacity-60">Watermark Image</p>
        <Dropzone accept="image/*" onFile={(f) => setWatermarkFile(f)} />
      </div>
      <select
        className="select select-bordered select-sm"
        value={position}
        onChange={(e) => setPosition(e.target.value as Position)}>
        {POSITIONS.map((p) => (
          <option key={p} value={p}>
            {p
              .split('-')
              .map((s) => s.charAt(0).toUpperCase() + s.slice(1))
              .join(' ')}
          </option>
        ))}
      </select>
      <label className="flex flex-col gap-1 text-sm">
        Opacity: {Math.round(opacity * 100)}%
        <input
          type="range"
          min={0.1}
          max={1}
          step={0.05}
          value={opacity}
          onChange={(e) => setOpacity(Number(e.target.value))}
        />
      </label>
      <button
        className="btn btn-primary btn-sm"
        disabled={!file || !watermarkFile || loading}
        onClick={process}>
        {loading ? (
          <span className="loading loading-spinner" />
        ) : (
          'Add Watermark'
        )}
      </button>
      <canvas ref={canvasRef} className="hidden" />
    </div>
  );
};
ImageWatermarkTool.displayName = 'ImageWatermarkTool';
