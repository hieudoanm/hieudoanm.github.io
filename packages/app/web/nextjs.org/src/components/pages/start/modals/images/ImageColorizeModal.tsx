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

function colorize(
  ctx: CanvasRenderingContext2D,
  w: number,
  h: number,
  color: string,
  intensity: number
) {
  ctx.fillStyle = color;
  ctx.globalAlpha = intensity;
  ctx.fillRect(0, 0, w, h);
  ctx.globalAlpha = 1;
}

export const ImageColorizeModal: FC<{ onClose: () => void }> = ({
  onClose,
}) => {
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [tintColor, setTintColor] = useState('#ff6b6b');
  const [intensity, setIntensity] = useState(0.3);
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
    colorize(ctx, canvas.width, canvas.height, tintColor, intensity);
    canvas.toBlob((blob) => {
      if (blob) downloadBlob(blob, `colorize_${file.name}`);
      setLoading(false);
    });
  }, [file, tintColor, intensity]);

  return (
    <ModalWrapper onClose={onClose} title="Colorize">
      <div className="flex flex-col gap-4">
        <input
          type="file"
          accept="image/*"
          className="file-input file-input-bordered"
          onChange={(e) => setFile(e.target.files?.[0] || null)}
        />
        <label className="flex items-center gap-2 text-sm">
          Color:{' '}
          <input
            type="color"
            value={tintColor}
            onChange={(e) => setTintColor(e.target.value)}
          />
        </label>
        <label className="flex flex-col gap-1 text-sm">
          Intensity: {Math.round(intensity * 100)}%
          <input
            type="range"
            min={0}
            max={1}
            step={0.05}
            value={intensity}
            onChange={(e) => setIntensity(Number(e.target.value))}
          />
        </label>
        <button
          className="btn btn-primary btn-sm"
          disabled={!file || loading}
          onClick={process}>
          {loading ? (
            <span className="loading loading-spinner" />
          ) : (
            'Apply Colorize'
          )}
        </button>
        <canvas ref={canvasRef} className="hidden" />
      </div>
    </ModalWrapper>
  );
};
ImageColorizeModal.displayName = 'ImageColorizeModal';
