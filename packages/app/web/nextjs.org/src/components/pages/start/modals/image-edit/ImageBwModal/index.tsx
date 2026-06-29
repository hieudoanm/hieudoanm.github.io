'use client';

import { FC, useCallback, useRef, useState } from 'react';
import { Dropzone, ModalWrapper } from '@hieudoanm.github.io/components/atoms';
import { downloadBlob } from './utils';

export const ImageBwModal: FC<{ onClose: () => void }> = ({ onClose }) => {
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
    ctx.filter = 'grayscale(100%)';
    ctx.drawImage(img, 0, 0);
    canvas.toBlob((blob) => {
      if (blob) downloadBlob(blob, `bw_${file.name}`);
      setLoading(false);
    });
  }, [file]);

  return (
    <ModalWrapper onClose={onClose} title="Black & White">
      <div className="flex flex-col gap-4">
        <Dropzone accept="image/*" onFile={(f) => setFile(f)} />
        {file && (
          <button
            className="btn btn-primary btn-sm"
            disabled={loading}
            onClick={processImage}>
            {loading ? (
              <span className="loading loading-spinner" />
            ) : (
              'Convert to B&W'
            )}
          </button>
        )}
      </div>
      <canvas ref={canvasRef} className="hidden" />
    </ModalWrapper>
  );
};
ImageBwModal.displayName = 'ImageBwModal';
