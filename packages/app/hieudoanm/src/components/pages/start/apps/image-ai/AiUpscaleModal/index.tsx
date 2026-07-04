'use client';

import { FC, useState, useCallback, useRef } from 'react';
import { Dropzone, FullScreen } from '@hieudoanm.github.io/components/atoms';
import {
  downloadBlob,
  nearestNeighbor,
  bilinear,
  SCALE_PRESETS,
} from './utils';

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
    <FullScreen onClose={onClose} title="Upscale">
      <div className="flex flex-col gap-4">
        <Dropzone accept="image/*" onFile={(f) => setFile(f)} />

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
    </FullScreen>
  );
};
AiUpscaleModal.displayName = 'AiUpscaleModal';
