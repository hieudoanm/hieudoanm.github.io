'use client';

import { FC, useState, useCallback, useRef } from 'react';
import { ModalWrapper } from '@hieudoanm.github.io/components/atoms/ModalWrapper';
import { downloadBlob, applyVignette } from './utils';

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
