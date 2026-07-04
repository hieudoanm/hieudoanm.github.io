'use client';

import { FC, useState, useCallback, useRef } from 'react';
import { Dropzone, FullScreen } from '@hieudoanm.github.io/components/atoms';
import { downloadBlob, boxBlur } from './utils';

export const ImageBlurBackgroundModal: FC<{ onClose: () => void }> = ({
  onClose,
}) => {
  const [loading, setLoading] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [blurRadius, setBlurRadius] = useState(8);
  const [centerFrac, setCenterFrac] = useState(0.3);
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
    canvas.width = img.width;
    canvas.height = img.height;
    ctx.drawImage(img, 0, 0);

    boxBlur(ctx, canvas.width, canvas.height, blurRadius, centerFrac);

    canvas.toBlob((blob) => {
      if (blob) downloadBlob(blob, `blur_${file.name}`);
      setLoading(false);
    });
  }, [file, blurRadius, centerFrac]);

  return (
    <FullScreen centered onClose={onClose} title="Blur Background">
      <div className="rounded-box border-base-300 bg-base-200 border p-4">
        <div className="flex flex-col gap-4">
          <Dropzone accept="image/*" onFile={(f) => setFile(f)} />

          <label className="flex flex-col gap-1 text-sm">
            Blur Radius: {blurRadius}
            <input
              type="range"
              min={2}
              max={20}
              value={blurRadius}
              onChange={(e) => setBlurRadius(Number(e.target.value))}
            />
          </label>
          <label className="flex flex-col gap-1 text-sm">
            Center Clear Area: {Math.round(centerFrac * 100)}%
            <input
              type="range"
              min={0.1}
              max={0.8}
              step={0.05}
              value={centerFrac}
              onChange={(e) => setCenterFrac(Number(e.target.value))}
            />
          </label>

          <button
            className="btn btn-primary btn-sm"
            disabled={!file || loading}
            onClick={process}>
            {loading ? (
              <span className="loading loading-spinner" />
            ) : (
              'Apply Blur Background'
            )}
          </button>
          <canvas ref={canvasRef} className="hidden" />
        </div>
      </div>
    </FullScreen>
  );
};
ImageBlurBackgroundModal.displayName = 'ImageBlurBackgroundModal';
