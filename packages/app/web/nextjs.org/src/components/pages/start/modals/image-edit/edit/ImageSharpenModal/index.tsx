'use client';

import { FC, useCallback, useRef, useState } from 'react';
import { ModalWrapper } from '@hieudoanm.github.io/components/atoms/ModalWrapper';
import { downloadBlob, applyConvolution } from './utils';

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
