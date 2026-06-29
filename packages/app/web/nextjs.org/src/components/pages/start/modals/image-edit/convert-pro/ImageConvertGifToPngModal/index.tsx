'use client';

import { FC, useState, useCallback, useRef } from 'react';
import { ModalWrapper } from '@hieudoanm.github.io/components/atoms/ModalWrapper';
import { downloadBlob } from './utils';

export const ImageConvertGifToPngModal: FC<{ onClose: () => void }> = ({
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
        if (blob) downloadBlob(blob, file.name.replace(/\.[^.]+$/, '.png'));
        setLoading(false);
      }, 'image/png');
    } catch (err) {
      console.error(err);
      setLoading(false);
    }
  }, [file]);

  return (
    <ModalWrapper onClose={onClose} title="GIF to PNG" size="max-w-lg">
      <div className="flex flex-col gap-4">
        <p className="text-sm">Convert GIF images to PNG format.</p>
        <input
          type="file"
          accept=".gif"
          className="file-input file-input-bordered"
          onChange={(e) => setFile(e.target.files?.[0] ?? null)}
        />
        <canvas ref={canvasRef} className="hidden" />
        <button
          className="btn btn-primary"
          disabled={!file || loading}
          onClick={process}>
          {loading ? (
            <span className="loading loading-spinner" />
          ) : (
            'Convert to PNG'
          )}
        </button>
        <p className="text-base-content/60 text-xs">
          Only the first frame of animated GIFs will be converted.
        </p>
      </div>
    </ModalWrapper>
  );
};
ImageConvertGifToPngModal.displayName = 'ImageConvertGifToPngModal';
