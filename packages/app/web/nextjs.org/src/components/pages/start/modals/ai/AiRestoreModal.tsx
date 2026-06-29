'use client';

import { FC, useState, useCallback, useRef } from 'react';
import { ModalWrapper } from '@hieudoanm.github.io/components/atoms/ModalWrapper';

const downloadBlob = (blob: Blob, name: string) => {
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = name;
  a.click();
  URL.revokeObjectURL(url);
};

function applySharpen(
  data: Uint8ClampedArray,
  w: number,
  h: number,
  amount: number
) {
  const copy = new Uint8ClampedArray(data);
  const kernel = [0, -1, 0, -1, 4 + amount, -1, 0, -1, 0];
  for (let y = 1; y < h - 1; y++) {
    for (let x = 1; x < w - 1; x++) {
      const idx = (y * w + x) * 4;
      for (let c = 0; c < 3; c++) {
        let sum = 0;
        for (let ky = -1; ky <= 1; ky++) {
          for (let kx = -1; kx <= 1; kx++) {
            const pIdx = ((y + ky) * w + (x + kx)) * 4 + c;
            sum += copy[pIdx] * kernel[(ky + 1) * 3 + (kx + 1)];
          }
        }
        data[idx + c] = Math.min(255, Math.max(0, sum));
      }
    }
  }
}

function reduceNoise(
  data: Uint8ClampedArray,
  w: number,
  h: number,
  strength: number
) {
  const copy = new Uint8ClampedArray(data);
  const r = Math.max(1, Math.floor(strength));
  for (let y = 0; y < h; y++) {
    for (let x = 0; x < w; x++) {
      const idx = (y * w + x) * 4;
      for (let c = 0; c < 3; c++) {
        let sum = 0,
          count = 0;
        for (let dy = -r; dy <= r; dy++) {
          for (let dx = -r; dx <= r; dx++) {
            const nx = x + dx,
              ny = y + dy;
            if (nx < 0 || nx >= w || ny < 0 || ny >= h) continue;
            sum += copy[(ny * w + nx) * 4 + c];
            count++;
          }
        }
        data[idx + c] = sum / count;
      }
    }
  }
}

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
        <input
          type="file"
          accept="image/*"
          className="file-input file-input-bordered"
          onChange={(e) => setFile(e.target.files?.[0] || null)}
        />

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
