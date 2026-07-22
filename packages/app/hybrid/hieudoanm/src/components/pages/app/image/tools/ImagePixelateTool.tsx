'use client';

import { FC, useCallback, useRef, useState } from 'react';
import { Dropzone } from '@hieudoanm.github.io/components/atoms';
import { ImageToolConfig } from '../config';
import { downloadBlob, loadImage } from '../lib/canvas';

export const ImagePixelateTool: FC<{ config: ImageToolConfig }> = ({
  config,
}) => {
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [pixelSize, setPixelSize] = useState(5);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const processImage = useCallback(async () => {
    if (!file) return;
    setLoading(true);
    const img = await loadImage(file);
    const canvas = document.createElement('canvas');
    canvas.width = img.width;
    canvas.height = img.height;
    const ctx = canvas.getContext('2d')!;
    ctx.imageSmoothingEnabled = false;
    ctx.drawImage(img, 0, 0, img.width / pixelSize, img.height / pixelSize);
    ctx.drawImage(
      ctx.canvas,
      0,
      0,
      img.width / pixelSize,
      img.height / pixelSize,
      0,
      0,
      img.width,
      img.height
    );
    canvas.toBlob((blob) => {
      if (blob) downloadBlob(blob, `pixelated_${file.name}`);
      setLoading(false);
    });
  }, [file, pixelSize]);

  return (
    <div className="flex flex-col gap-4">
      <div className="rounded-box border-base-300 bg-base-200 border p-4">
        <div className="flex flex-col gap-4">
          <Dropzone accept="image/*" onFile={(f) => setFile(f)} />
          {file && (
            <>
              <label className="flex flex-col gap-1">
                <span className="text-sm">Pixel size: {pixelSize}</span>
                <input
                  type="range"
                  min={2}
                  max={20}
                  value={pixelSize}
                  onChange={(e) => setPixelSize(Number(e.target.value))}
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
                  'Pixelate & Download'
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
ImagePixelateTool.displayName = 'ImagePixelateTool';
