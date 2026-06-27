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

function chromaKey(
  ctx: CanvasRenderingContext2D,
  w: number,
  h: number,
  target: string,
  threshold: number
) {
  const imgData = ctx.getImageData(0, 0, w, h);
  const d = imgData.data;
  const tR = parseInt(target.slice(1, 3), 16);
  const tG = parseInt(target.slice(3, 5), 16);
  const tB = parseInt(target.slice(5, 7), 16);
  for (let i = 0; i < d.length; i += 4) {
    const dist = Math.sqrt(
      (d[i] - tR) ** 2 + (d[i + 1] - tG) ** 2 + (d[i + 2] - tB) ** 2
    );
    if (dist < threshold) d[i + 3] = 0;
  }
  ctx.putImageData(imgData, 0, 0);
}

export const ImageTransparentBgModal: FC<{ onClose: () => void }> = ({
  onClose,
}) => {
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [keyColor, setKeyColor] = useState('#00ff00');
  const [threshold, setThreshold] = useState(100);
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
    chromaKey(ctx, canvas.width, canvas.height, keyColor, threshold);
    canvas.toBlob((blob) => {
      if (blob) downloadBlob(blob, `transparent_${file.name}`);
      setLoading(false);
    });
  }, [file, keyColor, threshold]);

  return (
    <ModalWrapper onClose={onClose} title="Transparent BG">
      <div className="flex flex-col gap-4">
        <input
          type="file"
          accept="image/*"
          className="file-input file-input-bordered"
          onChange={(e) => setFile(e.target.files?.[0] || null)}
        />
        <label className="flex items-center gap-2 text-sm">
          Key Color:{' '}
          <input
            type="color"
            value={keyColor}
            onChange={(e) => setKeyColor(e.target.value)}
          />
        </label>
        <label className="flex flex-col gap-1 text-sm">
          Threshold: {threshold}
          <input
            type="range"
            min={10}
            max={200}
            value={threshold}
            onChange={(e) => setThreshold(Number(e.target.value))}
          />
        </label>
        <button
          className="btn btn-primary btn-sm"
          disabled={!file || loading}
          onClick={process}>
          {loading ? (
            <span className="loading loading-spinner" />
          ) : (
            'Apply Transparent BG'
          )}
        </button>
        <canvas ref={canvasRef} className="hidden" />
      </div>
    </ModalWrapper>
  );
};
ImageTransparentBgModal.displayName = 'ImageTransparentBgModal';
