'use client';

import { FC, useState, useCallback, useRef } from 'react';
import { Dropzone, FullScreen } from '@hieudoanm.github.io/components/atoms';
import { downloadBlob } from './utils';

export const ImageAdjustModal: FC<{ onClose: () => void }> = ({ onClose }) => {
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [brightness, setBrightness] = useState(0);
  const [contrast, setContrast] = useState(0);
  const [saturation, setSaturation] = useState(0);
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
    const data = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const d = data.data;
    for (let i = 0; i < d.length; i += 4) {
      let r = d[i] + brightness * 255;
      let g = d[i + 1] + brightness * 255;
      let b = d[i + 2] + brightness * 255;
      const cf =
        (259 * (contrast * 255 + 255)) / (255 * (259 - contrast * 255));
      r = cf * (r - 128) + 128;
      g = cf * (g - 128) + 128;
      b = cf * (b - 128) + 128;
      const gray = 0.299 * r + 0.587 * g + 0.114 * b;
      d[i] = Math.min(255, Math.max(0, gray + (r - gray) * (1 + saturation)));
      d[i + 1] = Math.min(
        255,
        Math.max(0, gray + (g - gray) * (1 + saturation))
      );
      d[i + 2] = Math.min(
        255,
        Math.max(0, gray + (b - gray) * (1 + saturation))
      );
    }
    ctx.putImageData(data, 0, 0);
    canvas.toBlob((blob) => {
      if (blob) downloadBlob(blob, `adjust_${file.name}`);
      setLoading(false);
    });
  }, [file, brightness, contrast, saturation]);

  return (
    <FullScreen centered onClose={onClose} title="Adjust">
      <div className="rounded-box border-base-300 bg-base-200 border p-4">
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
                {name.charAt(0).toUpperCase() + name.slice(1)}:{' '}
                {val > 0 ? '+' : ''}
                {(val * 100).toFixed(0)}
                <input
                  type="range"
                  min={-1}
                  max={1}
                  step={0.05}
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
      </div>
    </FullScreen>
  );
};
ImageAdjustModal.displayName = 'ImageAdjustModal';
