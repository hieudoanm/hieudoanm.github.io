'use client';

import { FC, useCallback, useRef, useState } from 'react';
import { ModalWrapper } from '@hieudoanm.github.io/components/atoms/ModalWrapper';

const downloadBlob = (blob: Blob, name: string) => {
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = name;
  a.click();
  URL.revokeObjectURL(url);
};

function applyConvolution(
  ctx: CanvasRenderingContext2D,
  w: number,
  h: number,
  kernel: number[]
) {
  const imgData = ctx.getImageData(0, 0, w, h);
  const out = ctx.createImageData(w, h);
  for (let y = 1; y < h - 1; y++) {
    for (let x = 1; x < w - 1; x++) {
      let r = 0,
        g = 0,
        b = 0,
        idx = 0;
      for (let ky = -1; ky <= 1; ky++) {
        for (let kx = -1; kx <= 1; kx++) {
          const px = (y + ky) * w + (x + kx);
          const ki = idx++;
          r += imgData.data[px * 4] * kernel[ki];
          g += imgData.data[px * 4 + 1] * kernel[ki];
          b += imgData.data[px * 4 + 2] * kernel[ki];
        }
      }
      const oi = (y * w + x) * 4;
      out.data[oi] = Math.min(255, Math.max(0, r));
      out.data[oi + 1] = Math.min(255, Math.max(0, g));
      out.data[oi + 2] = Math.min(255, Math.max(0, b));
      out.data[oi + 3] = 255;
    }
  }
  ctx.putImageData(out, 0, 0);
}

export const ImageSharpenModal: FC<{ onClose: () => void }> = ({ onClose }) => {
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const processImage = useCallback(async () => {
    if (!file) return;
    setLoading(true);
    const img = await new Promise<HTMLImageElement>((res, rej) => {
      const i = new Image();
      i.onload = () => res(i);
      i.onerror = rej;
      i.src = URL.createObjectURL(file);
    });
    const canvas = document.createElement('canvas');
    canvas.width = img.width;
    canvas.height = img.height;
    const ctx = canvas.getContext('2d')!;
    ctx.drawImage(img, 0, 0);
    applyConvolution(
      ctx,
      img.width,
      img.height,
      [0, -1, 0, -1, 5, -1, 0, -1, 0]
    );
    canvas.toBlob((blob) => {
      if (blob) downloadBlob(blob, `sharpened_${file.name}`);
      setLoading(false);
    });
  }, [file]);

  return (
    <ModalWrapper onClose={onClose} title="Sharpen Image">
      <div className="flex flex-col gap-4">
        <input
          type="file"
          accept="image/*"
          className="file-input file-input-bordered"
          onChange={(e) => {
            const f = e.target.files?.[0];
            if (f) setFile(f);
          }}
        />
        {file && (
          <button
            className="btn btn-primary btn-sm"
            disabled={loading}
            onClick={processImage}>
            {loading ? (
              <span className="loading loading-spinner" />
            ) : (
              'Sharpen & Download'
            )}
          </button>
        )}
      </div>
      <canvas ref={canvasRef} className="hidden" />
    </ModalWrapper>
  );
};
ImageSharpenModal.displayName = 'ImageSharpenModal';
