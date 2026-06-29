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

export const ImageConvertGifToJpgModal: FC<{ onClose: () => void }> = ({
  onClose,
}) => {
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [quality, setQuality] = useState(0.92);
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
      canvas.toBlob(
        (blob) => {
          if (blob) downloadBlob(blob, file.name.replace(/\.[^.]+$/, '.jpg'));
          setLoading(false);
        },
        'image/jpeg',
        quality
      );
    } catch (err) {
      console.error(err);
      setLoading(false);
    }
  }, [file, quality]);

  return (
    <ModalWrapper onClose={onClose} title="GIF to JPG" size="max-w-lg">
      <div className="flex flex-col gap-4">
        <p className="text-sm">Convert GIF images to JPG format.</p>
        <input
          type="file"
          accept=".gif"
          className="file-input file-input-bordered"
          onChange={(e) => setFile(e.target.files?.[0] ?? null)}
        />
        <canvas ref={canvasRef} className="hidden" />
        <div className="flex flex-col gap-1">
          <label className="text-xs">
            Quality: {Math.round(quality * 100)}%
          </label>
          <input
            type="range"
            min="0.1"
            max="1"
            step="0.01"
            value={quality}
            onChange={(e) => setQuality(Number(e.target.value))}
            className="range range-xs"
          />
        </div>
        <button
          className="btn btn-primary"
          disabled={!file || loading}
          onClick={process}>
          {loading ? (
            <span className="loading loading-spinner" />
          ) : (
            'Convert to JPG'
          )}
        </button>
        <p className="text-base-content/60 text-xs">
          Only the first frame of animated GIFs will be converted.
        </p>
      </div>
    </ModalWrapper>
  );
};
ImageConvertGifToJpgModal.displayName = 'ImageConvertGifToJpgModal';
