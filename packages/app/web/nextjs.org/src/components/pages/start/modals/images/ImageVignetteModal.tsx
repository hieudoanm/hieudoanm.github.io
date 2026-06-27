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

function applyVignette(
  ctx: CanvasRenderingContext2D,
  w: number,
  h: number,
  strength: number
) {
  const imgData = ctx.getImageData(0, 0, w, h);
  const d = imgData.data;
  const cx = w / 2,
    cy = h / 2;
  const maxDist = Math.sqrt(cx * cx + cy * cy);
  for (let y = 0; y < h; y++) {
    for (let x = 0; x < w; x++) {
      const dist = Math.sqrt((x - cx) ** 2 + (y - cy) ** 2);
      const factor = 1 - (dist / maxDist) * strength;
      const idx = (y * w + x) * 4;
      d[idx] *= factor;
      d[idx + 1] *= factor;
      d[idx + 2] *= factor;
    }
  }
  ctx.putImageData(imgData, 0, 0);
}

export const ImageVignetteModal: FC<{ onClose: () => void }> = ({
  onClose,
}) => {
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [vignetteStrength, setVignetteStrength] = useState(0.5);
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
    applyVignette(ctx, canvas.width, canvas.height, vignetteStrength);
    canvas.toBlob((blob) => {
      if (blob) downloadBlob(blob, `vignette_${file.name}`);
      setLoading(false);
    });
  }, [file, vignetteStrength]);

  return (
    <ModalWrapper onClose={onClose} title="Vignette">
      <div className="flex flex-col gap-4">
        <input
          type="file"
          accept="image/*"
          className="file-input file-input-bordered"
          onChange={(e) => setFile(e.target.files?.[0] || null)}
        />
        <label className="flex flex-col gap-1 text-sm">
          Strength: {Math.round(vignetteStrength * 100)}%
          <input
            type="range"
            min={0}
            max={1}
            step={0.05}
            value={vignetteStrength}
            onChange={(e) => setVignetteStrength(Number(e.target.value))}
          />
        </label>
        <button
          className="btn btn-primary btn-sm"
          disabled={!file || loading}
          onClick={process}>
          {loading ? (
            <span className="loading loading-spinner" />
          ) : (
            'Apply Vignette'
          )}
        </button>
        <canvas ref={canvasRef} className="hidden" />
      </div>
    </ModalWrapper>
  );
};
ImageVignetteModal.displayName = 'ImageVignetteModal';
