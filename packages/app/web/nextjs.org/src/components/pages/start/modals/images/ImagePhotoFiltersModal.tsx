'use client';

import { FC, useState, useCallback, useRef } from 'react';
import { ModalWrapper } from '@hieudoanm.github.io/components/atoms/ModalWrapper';

const FILTERS = [
  'sepia',
  'vintage',
  'invert',
  'grayscale',
  'warm',
  'cool',
] as const;

const downloadBlob = (blob: Blob, name: string) => {
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = name;
  a.click();
  URL.revokeObjectURL(url);
};

function applyFilter(
  ctx: CanvasRenderingContext2D,
  w: number,
  h: number,
  filter: string
) {
  const data = ctx.getImageData(0, 0, w, h);
  const d = data.data;
  for (let i = 0; i < d.length; i += 4) {
    const r = d[i],
      g = d[i + 1],
      b = d[i + 2];
    switch (filter) {
      case 'sepia': {
        d[i] = Math.min(255, r * 0.393 + g * 0.769 + b * 0.189);
        d[i + 1] = Math.min(255, r * 0.349 + g * 0.686 + b * 0.168);
        d[i + 2] = Math.min(255, r * 0.272 + g * 0.534 + b * 0.131);
        break;
      }
      case 'vintage': {
        d[i] = Math.min(255, r * 0.55 + g * 0.55 + b * 0.15);
        d[i + 1] = Math.min(255, r * 0.35 + g * 0.6 + b * 0.1);
        d[i + 2] = Math.min(255, r * 0.2 + g * 0.4 + b * 0.3);
        break;
      }
      case 'invert': {
        d[i] = 255 - r;
        d[i + 1] = 255 - g;
        d[i + 2] = 255 - b;
        break;
      }
      case 'grayscale': {
        const gray = 0.299 * r + 0.587 * g + 0.114 * b;
        d[i] = gray;
        d[i + 1] = gray;
        d[i + 2] = gray;
        break;
      }
      case 'warm': {
        d[i] = Math.min(255, r * 1.2);
        d[i + 2] = Math.max(0, b * 0.8);
        break;
      }
      case 'cool': {
        d[i + 2] = Math.min(255, b * 1.2);
        d[i] = Math.max(0, r * 0.8);
        break;
      }
    }
  }
  ctx.putImageData(data, 0, 0);
}

export const ImagePhotoFiltersModal: FC<{ onClose: () => void }> = ({
  onClose,
}) => {
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState<string>('sepia');
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
    applyFilter(ctx, canvas.width, canvas.height, selectedFilter);
    canvas.toBlob((blob) => {
      if (blob) downloadBlob(blob, `filter_${file.name}`);
      setLoading(false);
    });
  }, [file, selectedFilter]);

  return (
    <ModalWrapper onClose={onClose} title="Photo Filters">
      <div className="flex flex-col gap-4">
        <input
          type="file"
          accept="image/*"
          className="file-input file-input-bordered"
          onChange={(e) => setFile(e.target.files?.[0] || null)}
        />
        <div className="flex flex-wrap gap-2">
          {FILTERS.map((f) => (
            <button
              key={f}
              className={`btn btn-sm ${selectedFilter === f ? 'btn-primary' : 'btn-ghost'}`}
              onClick={() => setSelectedFilter(f)}>
              {f}
            </button>
          ))}
        </div>
        <button
          className="btn btn-primary btn-sm"
          disabled={!file || loading}
          onClick={process}>
          {loading ? (
            <span className="loading loading-spinner" />
          ) : (
            'Apply Filter'
          )}
        </button>
        <canvas ref={canvasRef} className="hidden" />
      </div>
    </ModalWrapper>
  );
};
ImagePhotoFiltersModal.displayName = 'ImagePhotoFiltersModal';
