'use client';

import { FC, useState, useCallback, useRef } from 'react';
import { Dropzone, FullScreen } from '@hieudoanm.github.io/components/atoms';
import { downloadBlob } from './utils';

export const ImageShadowModal: FC<{ onClose: () => void }> = ({ onClose }) => {
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [shadowColor, setShadowColor] = useState('#000000');
  const [shadowBlur, setShadowBlur] = useState(10);
  const [shadowOffset, setShadowOffset] = useState(5);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const process = useCallback(async () => {
    if (!file) return;
    setLoading(true);
    const img = await new Promise<HTMLImageElement>((res, rej) => {
      const i = new Image();
      i.onload = () => res(i);
      i.onerror = rej;
      i.src = URL.createObjectURL(file);
    });
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext('2d')!;
    canvas.width = img.width + shadowBlur * 2 + Math.abs(shadowOffset);
    canvas.height = img.height + shadowBlur * 2 + Math.abs(shadowOffset);
    ctx.shadowColor = shadowColor;
    ctx.shadowBlur = shadowBlur;
    ctx.shadowOffsetX = shadowOffset;
    ctx.shadowOffsetY = shadowOffset;
    ctx.drawImage(img, shadowBlur, shadowBlur);
    canvas.toBlob((blob) => {
      if (blob) downloadBlob(blob, `shadow_${file.name}`);
      setLoading(false);
    });
  }, [file, shadowColor, shadowBlur, shadowOffset]);

  return (
    <FullScreen centered onClose={onClose} title="Drop Shadow">
      <div className="rounded-box border-base-300 bg-base-200 border p-4">
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
            Offset: {shadowOffset}
            <input
              type="range"
              min={0}
              max={30}
              value={shadowOffset}
              onChange={(e) => setShadowOffset(Number(e.target.value))}
            />
          </label>
          <button
            className="btn btn-primary btn-sm"
            disabled={!file || loading}
            onClick={process}>
            {loading ? (
              <span className="loading loading-spinner" />
            ) : (
              'Apply Drop Shadow'
            )}
          </button>
          <canvas ref={canvasRef} className="hidden" />
        </div>
      </div>
    </FullScreen>
  );
};
ImageShadowModal.displayName = 'ImageShadowModal';
