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

function pixelateRegion(
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number,
  size: number
) {
  const cx = width / 2,
    cy = height / 3;
  const rw = width * 0.3,
    rh = height * 0.3;
  const sx = Math.max(1, Math.floor(cx - rw / 2));
  const sy = Math.max(1, Math.floor(cy - rh / 2));
  const ex = Math.min(width, Math.ceil(cx + rw / 2));
  const ey = Math.min(height, Math.ceil(cy + rh / 2));

  for (let y = sy; y < ey; y += size) {
    for (let x = sx; x < ex; x += size) {
      const idx = (y * width + x) * 4;
      const r = ctx.getImageData(x, y, 1, 1).data;
      ctx.fillStyle = `rgb(${r[0]},${r[1]},${r[2]})`;
      ctx.fillRect(x, y, size, size);
    }
  }
}

export const ImagePixelateFaceModal: FC<{ onClose: () => void }> = ({
  onClose,
}) => {
  const [loading, setLoading] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [pixelSize, setPixelSize] = useState(10);
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

    pixelateRegion(ctx, canvas.width, canvas.height, pixelSize);

    canvas.toBlob((blob) => {
      if (blob) downloadBlob(blob, `pixelate_${file.name}`);
      setLoading(false);
    });
  }, [file, pixelSize]);

  return (
    <ModalWrapper onClose={onClose} title="Pixelate Face">
      <div className="flex flex-col gap-4">
        <input
          type="file"
          accept="image/*"
          className="file-input file-input-bordered"
          onChange={(e) => setFile(e.target.files?.[0] || null)}
        />

        <label className="flex flex-col gap-1 text-sm">
          Pixel Size: {pixelSize}
          <input
            type="range"
            min={3}
            max={30}
            value={pixelSize}
            onChange={(e) => setPixelSize(Number(e.target.value))}
          />
        </label>

        <button
          className="btn btn-primary btn-sm"
          disabled={!file || loading}
          onClick={process}>
          {loading ? (
            <span className="loading loading-spinner" />
          ) : (
            'Apply Pixelate Face'
          )}
        </button>
        <canvas ref={canvasRef} className="hidden" />
      </div>
    </ModalWrapper>
  );
};
ImagePixelateFaceModal.displayName = 'ImagePixelateFaceModal';
