'use client';

import { FC, useCallback, useRef, useState } from 'react';
import { Dropzone } from '@hieudoanm.github.io/components/atoms';
import { ImageToolConfig } from '../config';
import { downloadBlob, loadImage } from '../lib/canvas';

export const ImageRoundTool: FC<{ config: ImageToolConfig }> = ({ config }) => {
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [borderRadius, setBorderRadius] = useState(30);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const processImage = useCallback(async () => {
    if (!file) return;
    setLoading(true);
    const img = await loadImage(file);
    const canvas = document.createElement('canvas');
    canvas.width = img.width;
    canvas.height = img.height;
    const ctx = canvas.getContext('2d')!;
    const r = Math.min(borderRadius, img.width / 2, img.height / 2);
    ctx.beginPath();
    ctx.moveTo(r, 0);
    ctx.lineTo(img.width - r, 0);
    ctx.quadraticCurveTo(img.width, 0, img.width, r);
    ctx.lineTo(img.width, img.height - r);
    ctx.quadraticCurveTo(img.width, img.height, img.width - r, img.height);
    ctx.lineTo(r, img.height);
    ctx.quadraticCurveTo(0, img.height, 0, img.height - r);
    ctx.lineTo(0, r);
    ctx.quadraticCurveTo(0, 0, r, 0);
    ctx.closePath();
    ctx.clip();
    ctx.drawImage(img, 0, 0);
    canvas.toBlob((blob) => {
      if (blob) downloadBlob(blob, `rounded_${file.name}`);
      setLoading(false);
    });
  }, [file, borderRadius]);

  return (
    <div className="flex flex-col gap-4">
      <div className="rounded-box border-base-300 bg-base-200 border p-4">
        <div className="flex flex-col gap-4">
          <Dropzone accept="image/*" onFile={(f) => setFile(f)} />
          {file && (
            <>
              <label className="flex flex-col gap-1">
                <span className="text-sm">Border radius: {borderRadius}px</span>
                <input
                  type="range"
                  min={0}
                  max={100}
                  value={borderRadius}
                  onChange={(e) => setBorderRadius(Number(e.target.value))}
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
                  'Make Round'
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
ImageRoundTool.displayName = 'ImageRoundTool';
