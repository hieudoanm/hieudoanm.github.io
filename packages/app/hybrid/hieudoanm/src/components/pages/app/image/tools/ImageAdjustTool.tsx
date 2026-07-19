'use client';

import { FC, useCallback, useRef, useState } from 'react';
import { Dropzone } from '@hieudoanm.github.io/components/atoms';
import { ImageToolConfig } from '../config';
import { downloadBlob, loadImage } from '../lib/canvas';

export const ImageAdjustTool: FC<{ config: ImageToolConfig }> = () => {
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [brightness, setBrightness] = useState(0);
  const [contrast, setContrast] = useState(0);
  const [saturation, setSaturation] = useState(0);
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
    ctx.filter = `brightness(${1 + brightness / 100}) contrast(${1 + contrast / 100}) saturate(${1 + saturation / 100})`;
    ctx.drawImage(canvas, 0, 0);
    canvas.toBlob((blob) => {
      if (blob) downloadBlob(blob, `adjust_${file.name}`);
      setLoading(false);
    });
  }, [file, brightness, contrast, saturation]);

  return (
    <div className="flex flex-col gap-4">
      <Dropzone accept="image/*" onFile={(f) => setFile(f)} />
      {(['brightness', 'contrast', 'saturation'] as const).map((name) => {
        const val =
          name === 'brightness'
            ? brightness
            : name === 'contrast'
              ? contrast
              : saturation;
        const set =
          name === 'brightness'
            ? setBrightness
            : name === 'contrast'
              ? setContrast
              : setSaturation;
        return (
          <label key={name} className="flex flex-col gap-1 text-sm">
            {name.charAt(0).toUpperCase() + name.slice(1)}: {val > 0 ? '+' : ''}
            {val}
            <input
              type="range"
              min={-100}
              max={100}
              value={val}
              onChange={(e) => set(Number(e.target.value))}
            />
          </label>
        );
      })}
      <button
        className="btn btn-primary btn-sm"
        disabled={!file || loading}
        onClick={process}>
        {loading ? (
          <span className="loading loading-spinner" />
        ) : (
          'Apply Adjust'
        )}
      </button>
      <canvas ref={canvasRef} className="hidden" />
    </div>
  );
};
ImageAdjustTool.displayName = 'ImageAdjustTool';
