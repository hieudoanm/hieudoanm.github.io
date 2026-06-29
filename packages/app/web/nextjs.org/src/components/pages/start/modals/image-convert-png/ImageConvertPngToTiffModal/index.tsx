'use client';

import { FC, useState, useCallback, useRef } from 'react';
import { Dropzone, ModalWrapper } from '@hieudoanm.github.io/components/atoms';
import { downloadBlob } from './utils';

export const ImageConvertPngToTiffModal: FC<{ onClose: () => void }> = ({
  onClose,
}) => {
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const process = useCallback(async () => {
    if (!file) return;
    setLoading(true);
    try {
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
      canvas.toBlob((blob) => {
        if (blob) downloadBlob(blob, file.name.replace(/\.[^.]+$/, '.tiff'));
        setLoading(false);
      }, 'image/tiff');
    } catch (err) {
      console.error(err);
      setLoading(false);
    }
  }, [file]);

  return (
    <ModalWrapper onClose={onClose} title="PNG to TIFF" size="max-w-lg">
      <div className="flex flex-col gap-4">
        <p className="text-sm">Convert PNG images to TIFF format.</p>
        <Dropzone accept=".png" onFile={(f) => setFile(f)} />
        <canvas ref={canvasRef} className="hidden" />
        <button
          className="btn btn-primary"
          disabled={!file || loading}
          onClick={process}>
          {loading ? (
            <span className="loading loading-spinner" />
          ) : (
            'Convert to TIFF'
          )}
        </button>
        <p className="text-base-content/60 text-xs">
          TIFF encoding requires browser support. Chromium-based browsers may
          save as PNG instead.
        </p>
      </div>
    </ModalWrapper>
  );
};
ImageConvertPngToTiffModal.displayName = 'ImageConvertPngToTiffModal';
