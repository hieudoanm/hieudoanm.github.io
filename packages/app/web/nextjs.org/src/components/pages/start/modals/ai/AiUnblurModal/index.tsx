'use client';

import { FC, useState, useCallback, useRef } from 'react';
import { ModalWrapper } from '@hieudoanm.github.io/components/atoms/ModalWrapper';
import { downloadBlob, laplacianSharpen } from './utils';

export const AiUnblurModal: FC<{ onClose: () => void }> = ({ onClose }) => {
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [strength, setStrength] = useState(0.5);
  const [iterations, setIterations] = useState(1);
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

    for (let iter = 0; iter < iterations; iter++) {
      const data = ctx.getImageData(0, 0, canvas.width, canvas.height);
      laplacianSharpen(data.data, canvas.width, canvas.height, strength);
      ctx.putImageData(data, 0, 0);
    }

    canvas.toBlob((blob) => {
      if (blob) downloadBlob(blob, `deblurred_${file.name}`);
      setLoading(false);
    });
  }, [file, strength, iterations]);

  return (
    <ModalWrapper onClose={onClose} title="Unblur" size="max-w-lg">
      <div className="flex flex-col gap-4">
        <input
          type="file"
          accept="image/*"
          className="file-input file-input-bordered"
          onChange={(e) => setFile(e.target.files?.[0] || null)}
        />

        <label className="flex flex-col gap-1 text-sm">
          <span>Strength: {(strength * 100).toFixed(0)}%</span>
          <input
            type="range"
            min={0.1}
            max={2}
            step={0.1}
            value={strength}
            onChange={(e) => setStrength(Number(e.target.value))}
          />
        </label>

        <label className="flex flex-col gap-1 text-sm">
          <span>Iterations: {iterations}</span>
          <input
            type="range"
            min={1}
            max={5}
            value={iterations}
            onChange={(e) => setIterations(Number(e.target.value))}
          />
        </label>

        <button
          className="btn btn-primary btn-sm"
          disabled={!file || loading}
          onClick={process}>
          {loading ? (
            <span className="loading loading-spinner" />
          ) : (
            'Apply Deblur'
          )}
        </button>
        <canvas ref={canvasRef} className="hidden" />
      </div>
    </ModalWrapper>
  );
};
AiUnblurModal.displayName = 'AiUnblurModal';
