'use client';

import { FC, useState, useCallback, useRef } from 'react';
import { Dropzone, FullScreen } from '@hieudoanm.github.io/components/atoms';
import { downloadBlob } from './utils';

export const ImageConvertJpgToGifModal: FC<{ onClose: () => void }> = ({
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
        if (blob) downloadBlob(blob, file.name.replace(/\.[^.]+$/, '.gif'));
        setLoading(false);
      }, 'image/gif');
    } catch (err) {
      console.error(err);
      setLoading(false);
    }
  }, [file]);

  return (
    <FullScreen centered onClose={onClose} title="JPG to GIF">
      <div className="rounded-box border-base-300 bg-base-200 border p-4">
        <div className="flex flex-col gap-4">
          <p className="text-sm">Convert JPG images to GIF format.</p>
          <Dropzone accept=".jpg,.jpeg" onFile={(f) => setFile(f)} />
          <canvas ref={canvasRef} className="hidden" />
          <button
            className="btn btn-primary"
            disabled={!file || loading}
            onClick={process}>
            {loading ? (
              <span className="loading loading-spinner" />
            ) : (
              'Convert to GIF'
            )}
          </button>
          <p className="text-base-content/60 text-xs">
            GIF is limited to 256 colors. The output will be a static GIF.
          </p>
        </div>
      </div>
    </FullScreen>
  );
};
ImageConvertJpgToGifModal.displayName = 'ImageConvertJpgToGifModal';
