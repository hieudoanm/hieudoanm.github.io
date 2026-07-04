'use client';

import { FC, useCallback, useRef, useState } from 'react';
import { Dropzone, FullScreen } from '@hieudoanm.github.io/components/atoms';
import { downloadBlob } from './utils';

export const ImageRoundModal: FC<{ onClose: () => void }> = ({ onClose }) => {
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const processImage = useCallback(async () => {
    if (!file) return;
    setLoading(true);
    const img = await new Promise<HTMLImageElement>((res, rej) => {
      const i = new Image();
      i.onload = () => res(i);
      i.onerror = rej;
      i.src = URL.createObjectURL(file);
    });
    const canvas = document.createElement('canvas');
    canvas.width = img.width;
    canvas.height = img.height;
    const ctx = canvas.getContext('2d')!;
    const cx = img.width / 2,
      cy = img.height / 2,
      r = Math.min(cx, cy);
    ctx.beginPath();
    ctx.arc(cx, cy, r, 0, Math.PI * 2);
    ctx.closePath();
    ctx.clip();
    ctx.drawImage(img, 0, 0);
    canvas.toBlob((blob) => {
      if (blob) downloadBlob(blob, `rounded_${file.name}`);
      setLoading(false);
    });
  }, [file]);

  return (
    <FullScreen centered onClose={onClose} title="Round Image">
      <div className="rounded-box border-base-300 bg-base-200 border p-4">
        <div className="flex flex-col gap-4">
          <Dropzone accept="image/*" onFile={(f) => setFile(f)} />
          {file && (
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
          )}
        </div>
        <canvas ref={canvasRef} className="hidden" />
      </div>
    </FullScreen>
  );
};
ImageRoundModal.displayName = 'ImageRoundModal';
