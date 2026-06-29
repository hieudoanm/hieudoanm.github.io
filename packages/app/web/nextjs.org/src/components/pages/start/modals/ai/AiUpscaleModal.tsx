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

function nearestNeighbor(src: ImageData, dst: ImageData) {
  const sw = src.width,
    sh = src.height;
  const dw = dst.width,
    dh = dst.height;
  const s = src.data,
    d = dst.data;
  for (let y = 0; y < dh; y++) {
    for (let x = 0; x < dw; x++) {
      const sx = Math.floor((x / dw) * sw);
      const sy = Math.floor((y / dh) * sh);
      const si = (sy * sw + sx) * 4;
      const di = (y * dw + x) * 4;
      d[di] = s[si];
      d[di + 1] = s[si + 1];
      d[di + 2] = s[si + 2];
      d[di + 3] = s[si + 3];
    }
  }
}

function bilinear(src: ImageData, dst: ImageData) {
  const sw = src.width,
    sh = src.height;
  const dw = dst.width,
    dh = dst.height;
  const s = src.data,
    d = dst.data;
  for (let y = 0; y < dh; y++) {
    for (let x = 0; x < dw; x++) {
      const gx = (x / dw) * (sw - 1);
      const gy = (y / dh) * (sh - 1);
      const gxi = Math.floor(gx);
      const gyi = Math.floor(gy);
      const xf = gx - gxi;
      const yf = gy - gyi;
      const di = (y * dw + x) * 4;
      for (let c = 0; c < 4; c++) {
        const a = s[(gyi * sw + gxi) * 4 + c];
        const b = s[(gyi * sw + Math.min(gxi + 1, sw - 1)) * 4 + c];
        const c_ = s[(Math.min(gyi + 1, sh - 1) * sw + gxi) * 4 + c];
        const dd =
          s[
            (Math.min(gyi + 1, sh - 1) * sw + Math.min(gxi + 1, sw - 1)) * 4 + c
          ];
        const top = a + (b - a) * xf;
        const bot = c_ + (dd - c_) * xf;
        d[di + c] = Math.round(top + (bot - top) * yf);
      }
    }
  }
}

const SCALE_PRESETS = [2, 3, 4];

export const AiUpscaleModal: FC<{ onClose: () => void }> = ({ onClose }) => {
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [scale, setScale] = useState(2);
  const [algorithm, setAlgorithm] = useState<'nearest' | 'bilinear'>(
    'bilinear'
  );
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
    const srcCanvas = document.createElement('canvas');
    srcCanvas.width = img.width;
    srcCanvas.height = img.height;
    const srcCtx = srcCanvas.getContext('2d')!;
    srcCtx.drawImage(img, 0, 0);
    const srcData = srcCtx.getImageData(0, 0, img.width, img.height);

    const dW = img.width * scale;
    const dH = img.height * scale;
    const canvas = canvasRef.current!;
    canvas.width = dW;
    canvas.height = dH;
    const ctx = canvas.getContext('2d')!;
    const dstData = ctx.createImageData(dW, dH);

    if (algorithm === 'nearest') {
      nearestNeighbor(srcData, dstData);
    } else {
      bilinear(srcData, dstData);
    }

    ctx.putImageData(dstData, 0, 0);
    canvas.toBlob((blob) => {
      if (blob) downloadBlob(blob, `upscaled_${scale}x_${file.name}`);
      setLoading(false);
    });
  }, [file, scale, algorithm]);

  return (
    <ModalWrapper onClose={onClose} title="Upscale" size="max-w-lg">
      <div className="flex flex-col gap-4">
        <input
          type="file"
          accept="image/*"
          className="file-input file-input-bordered"
          onChange={(e) => setFile(e.target.files?.[0] || null)}
        />

        <div className="flex gap-2">
          <button
            className={`btn btn-sm flex-1 ${algorithm === 'bilinear' ? 'btn-primary' : 'btn-ghost'}`}
            onClick={() => setAlgorithm('bilinear')}>
            Bilinear
          </button>
          <button
            className={`btn btn-sm flex-1 ${algorithm === 'nearest' ? 'btn-primary' : 'btn-ghost'}`}
            onClick={() => setAlgorithm('nearest')}>
            Nearest
          </button>
        </div>

        <div className="flex gap-2">
          {SCALE_PRESETS.map((s) => (
            <button
              key={s}
              className={`btn btn-sm flex-1 ${scale === s ? 'btn-primary' : 'btn-ghost'}`}
              onClick={() => setScale(s)}>
              {s}x
            </button>
          ))}
        </div>

        {file && (
          <p className="text-base-content/40 text-center text-xs">
            {file.name} → {file.name.replace(/(\.[^.]+)$/, `_${scale}x$1`)}
          </p>
        )}

        <button
          className="btn btn-primary btn-sm"
          disabled={!file || loading}
          onClick={process}>
          {loading ? (
            <span className="loading loading-spinner" />
          ) : (
            'Apply Upscale'
          )}
        </button>
        <canvas ref={canvasRef} className="hidden" />
      </div>
    </ModalWrapper>
  );
};
AiUpscaleModal.displayName = 'AiUpscaleModal';
