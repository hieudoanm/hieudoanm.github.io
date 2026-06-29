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

function detectBrightRegions(
  data: Uint8ClampedArray,
  w: number,
  h: number,
  threshold: number
) {
  for (let i = 0; i < data.length; i += 4) {
    const brightness =
      0.299 * data[i] + 0.587 * data[i + 1] + 0.114 * data[i + 2];
    if (brightness > threshold) {
      data[i + 3] = 0;
    }
  }
}

function inpaint(
  data: Uint8ClampedArray,
  w: number,
  h: number,
  radius: number,
  iterations: number
) {
  for (let iter = 0; iter < iterations; iter++) {
    const copy = new Uint8ClampedArray(data);
    for (let y = 0; y < h; y++) {
      for (let x = 0; x < w; x++) {
        const idx = (y * w + x) * 4;
        if (data[idx + 3] < 255) {
          let r = 0,
            g = 0,
            b = 0,
            count = 0;
          for (let dy = -radius; dy <= radius; dy++) {
            for (let dx = -radius; dx <= radius; dx++) {
              const nx = x + dx,
                ny = y + dy;
              if (nx < 0 || nx >= w || ny < 0 || ny >= h) continue;
              const ni = (ny * w + nx) * 4;
              if (copy[ni + 3] === 255) {
                r += copy[ni];
                g += copy[ni + 1];
                b += copy[ni + 2];
                count++;
              }
            }
          }
          if (count > 0) {
            data[idx] = r / count;
            data[idx + 1] = g / count;
            data[idx + 2] = b / count;
          }
          data[idx + 3] = 255;
        }
      }
    }
  }
}

export const AiRemoveWatermarkModal: FC<{ onClose: () => void }> = ({
  onClose,
}) => {
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [mode, setMode] = useState<'bright' | 'patch'>('bright');
  const [threshold, setThreshold] = useState(200);
  const [patchRadius, setPatchRadius] = useState(3);
  const [iterations, setIterations] = useState(2);
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

    if (mode === 'bright') {
      detectBrightRegions(data.data, canvas.width, canvas.height, threshold);
    }

    inpaint(data.data, canvas.width, canvas.height, patchRadius, iterations);

    ctx.putImageData(data, 0, 0);
    canvas.toBlob((blob) => {
      if (blob) downloadBlob(blob, `clean_${file.name}`);
      setLoading(false);
    });
  }, [file, mode, threshold, patchRadius, iterations]);

  return (
    <ModalWrapper onClose={onClose} title="Remove Watermark" size="max-w-lg">
      <div className="flex flex-col gap-4">
        <input
          type="file"
          accept="image/*"
          className="file-input file-input-bordered"
          onChange={(e) => setFile(e.target.files?.[0] || null)}
        />

        <p className="text-base-content/40 text-xs">
          Removes bright/semi-transparent watermarks by detecting
          high-brightness regions and inpainting over them.
        </p>

        <label className="flex flex-col gap-1 text-sm">
          <span>Brightness Threshold: {threshold}</span>
          <input
            type="range"
            min={150}
            max={255}
            value={threshold}
            onChange={(e) => setThreshold(Number(e.target.value))}
          />
          <span className="text-base-content/30 text-[10px]">
            Lower = detects more areas as watermark
          </span>
        </label>

        <label className="flex flex-col gap-1 text-sm">
          <span>Patch Radius: {patchRadius}px</span>
          <input
            type="range"
            min={1}
            max={10}
            value={patchRadius}
            onChange={(e) => setPatchRadius(Number(e.target.value))}
          />
        </label>

        <label className="flex flex-col gap-1 text-sm">
          <span>Iterations: {iterations}</span>
          <input
            type="range"
            min={1}
            max={5}
            value={iterations}
            onChange={(e) => setIterations(Number(e.target.value))}
          />
        </label>

        <button
          className="btn btn-primary btn-sm"
          disabled={!file || loading}
          onClick={process}>
          {loading ? (
            <span className="loading loading-spinner" />
          ) : (
            'Remove Watermark'
          )}
        </button>
        <canvas ref={canvasRef} className="hidden" />
      </div>
    </ModalWrapper>
  );
};
AiRemoveWatermarkModal.displayName = 'AiRemoveWatermarkModal';
