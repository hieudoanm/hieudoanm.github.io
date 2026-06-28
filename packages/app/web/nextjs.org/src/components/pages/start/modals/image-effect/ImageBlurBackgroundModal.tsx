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

function boxBlur(
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number,
  radius: number,
  centerFrac: number
) {
  const imageData = ctx.getImageData(0, 0, width, height);
  const data = imageData.data;
  const copy = new Uint8ClampedArray(data);

  const cx = width / 2;
  const cy = height / 2;
  const maxDist = Math.sqrt(cx * cx + cy * cy) * centerFrac;

  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const dist = Math.sqrt((x - cx) ** 2 + (y - cy) ** 2);
      if (dist < maxDist) continue;
      const blurR = Math.min(radius, Math.ceil((dist - maxDist) / 10) * 2);
      if (blurR < 1) continue;
      let r = 0,
        g = 0,
        b = 0,
        a = 0,
        count = 0;
      for (let dy = -blurR; dy <= blurR; dy++) {
        for (let dx = -blurR; dx <= blurR; dx++) {
          const nx = x + dx,
            ny = y + dy;
          if (nx < 0 || nx >= width || ny < 0 || ny >= height) continue;
          const idx = (ny * width + nx) * 4;
          r += copy[idx];
          g += copy[idx + 1];
          b += copy[idx + 2];
          a += copy[idx + 3];
          count++;
        }
      }
      if (count > 0) {
        const idx = (y * width + x) * 4;
        data[idx] = r / count;
        data[idx + 1] = g / count;
        data[idx + 2] = b / count;
        data[idx + 3] = a / count;
      }
    }
  }
  ctx.putImageData(imageData, 0, 0);
}

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
    <ModalWrapper onClose={onClose} title="Blur Background">
      <div className="flex flex-col gap-4">
        <input
          type="file"
          accept="image/*"
          className="file-input file-input-bordered"
          onChange={(e) => setFile(e.target.files?.[0] || null)}
        />

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
    </ModalWrapper>
  );
};
ImageBlurBackgroundModal.displayName = 'ImageBlurBackgroundModal';
