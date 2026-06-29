'use client';

import { FC, useState, useCallback, useRef } from 'react';
import { Dropzone, ModalWrapper } from '@hieudoanm.github.io/components/atoms';
import { downloadBlob, applySharpen, reduceNoise } from './utils';

export const AiRestoreModal: FC<{ onClose: () => void }> = ({ onClose }) => {
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [brightness, setBrightness] = useState(0);
  const [contrast, setContrast] = useState(0);
  const [sharpen, setSharpen] = useState(0);
  const [denoise, setDenoise] = useState(0);
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

    if (denoise > 0) {
      const data = ctx.getImageData(0, 0, canvas.width, canvas.height);
      reduceNoise(data.data, canvas.width, canvas.height, denoise);
      ctx.putImageData(data, 0, 0);
    }

    if (sharpen > 0) {
      const data = ctx.getImageData(0, 0, canvas.width, canvas.height);
      applySharpen(data.data, canvas.width, canvas.height, sharpen);
      ctx.putImageData(data, 0, 0);
    }

    if (brightness !== 0 || contrast !== 0) {
      const data = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const d = data.data;
      const cf =
        (259 * (contrast * 255 + 255)) / (255 * (259 - contrast * 255));
      for (let i = 0; i < d.length; i += 4) {
        d[i] = Math.min(
          255,
          Math.max(0, cf * (d[i] - 128) + 128 + brightness * 255)
        );
        d[i + 1] = Math.min(
          255,
          Math.max(0, cf * (d[i + 1] - 128) + 128 + brightness * 255)
        );
        d[i + 2] = Math.min(
          255,
          Math.max(0, cf * (d[i + 2] - 128) + 128 + brightness * 255)
        );
      }
      ctx.putImageData(data, 0, 0);
    }

    canvas.toBlob((blob) => {
      if (blob) downloadBlob(blob, `restored_${file.name}`);
      setLoading(false);
    });
  }, [file, brightness, contrast, sharpen, denoise]);

  return (
    <ModalWrapper onClose={onClose} title="Restore" size="max-w-lg">
      <div className="flex flex-col gap-4">
        <Dropzone accept="image/*" onFile={(f) => setFile(f)} />

        {(['brightness', 'contrast', 'sharpen', 'denoise'] as const).map(
          (name) => {
            const val = { brightness, contrast, sharpen, denoise }[name];
            const set = {
              brightness: setBrightness,
              contrast: setContrast,
              sharpen: setSharpen,
              denoise: setDenoise,
            }[name];
            return (
              <label key={name} className="flex flex-col gap-1 text-sm">
                <span className="capitalize">
                  {name}: {val > 0 ? '+' : ''}
                  {(val * 100).toFixed(0)}
                </span>
                <input
                  type="range"
                  min={name === 'denoise' ? 0 : -1}
                  max={name === 'denoise' ? 5 : 1}
                  step={name === 'denoise' ? 1 : 0.05}
                  value={val}
                  onChange={(e) => set(Number(e.target.value))}
                />
              </label>
            );
          }
        )}

        <button
          className="btn btn-primary btn-sm"
          disabled={!file || loading}
          onClick={process}>
          {loading ? (
            <span className="loading loading-spinner" />
          ) : (
            'Apply Restoration'
          )}
        </button>
        <canvas ref={canvasRef} className="hidden" />
      </div>
    </ModalWrapper>
  );
};
AiRestoreModal.displayName = 'AiRestoreModal';
