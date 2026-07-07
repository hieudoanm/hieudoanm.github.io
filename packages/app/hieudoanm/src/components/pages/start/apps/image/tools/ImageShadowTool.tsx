'use client';

import { FC, useCallback, useRef, useState } from 'react';
import { Dropzone } from '@hieudoanm.github.io/components/atoms';
import { ImageToolConfig } from '../config';
import { downloadBlob, loadImage } from '../lib/canvas';

export const ImageShadowTool: FC<{ config: ImageToolConfig }> = () => {
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [shadowColor, setShadowColor] = useState('#000000');
  const [shadowBlur, setShadowBlur] = useState(10);
  const [offsetX, setOffsetX] = useState(5);
  const [offsetY, setOffsetY] = useState(5);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const process = useCallback(async () => {
    if (!file) return;
    setLoading(true);
    const img = await loadImage(file);
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext('2d')!;
    canvas.width = img.width + shadowBlur * 2 + Math.abs(offsetX);
    canvas.height = img.height + shadowBlur * 2 + Math.abs(offsetY);
    ctx.shadowColor = shadowColor;
    ctx.shadowBlur = shadowBlur;
    ctx.shadowOffsetX = offsetX;
    ctx.shadowOffsetY = offsetY;
    ctx.drawImage(img, shadowBlur, shadowBlur);
    canvas.toBlob((blob) => {
      if (blob) downloadBlob(blob, `shadow_${file.name}`);
      setLoading(false);
    });
  }, [file, shadowColor, shadowBlur, offsetX, offsetY]);

  return (
    <div className="flex flex-col gap-4">
      <Dropzone accept="image/*" onFile={(f) => setFile(f)} />
      <label className="flex items-center gap-2 text-sm">
        Color:{' '}
        <input
          type="color"
          value={shadowColor}
          onChange={(e) => setShadowColor(e.target.value)}
        />
      </label>
      <label className="flex flex-col gap-1 text-sm">
        Blur: {shadowBlur}
        <input
          type="range"
          min={0}
          max={40}
          value={shadowBlur}
          onChange={(e) => setShadowBlur(Number(e.target.value))}
        />
      </label>
      <label className="flex flex-col gap-1 text-sm">
        Offset X: {offsetX}
        <input
          type="range"
          min={-30}
          max={30}
          value={offsetX}
          onChange={(e) => setOffsetX(Number(e.target.value))}
        />
      </label>
      <label className="flex flex-col gap-1 text-sm">
        Offset Y: {offsetY}
        <input
          type="range"
          min={-30}
          max={30}
          value={offsetY}
          onChange={(e) => setOffsetY(Number(e.target.value))}
        />
      </label>
      <button
        className="btn btn-primary btn-sm"
        disabled={!file || loading}
        onClick={process}>
        {loading ? <span className="loading loading-spinner" /> : 'Add Shadow'}
      </button>
      <canvas ref={canvasRef} className="hidden" />
    </div>
  );
};
ImageShadowTool.displayName = 'ImageShadowTool';
