'use client';

import { FC, useState, useCallback, useRef } from 'react';
import { ModalWrapper } from '@hieudoanm.github.io/components/atoms/ModalWrapper';
import { downloadBlob } from './utils';

export const ImageConvertHeicToJpgModal: FC<{ onClose: () => void }> = ({
  onClose,
}) => {
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [quality, setQuality] = useState(0.92);
  const [error, setError] = useState<string | null>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const process = useCallback(async () => {
    if (!file) return;
    setLoading(true);
    setError(null);
    try {
      const img = await new Promise<HTMLImageElement>((res, rej) => {
        const i = new Image();
        i.onload = () => res(i);
        i.onerror = () => rej(new Error('Unsupported format'));
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
    } catch {
      setError(
        'Your browser cannot decode HEIC files. Try using a Chromium-based browser or convert via a desktop tool.'
      );
      setLoading(false);
    }
  }, [file, quality]);

  return (
    <ModalWrapper onClose={onClose} title="Convert HEIC to JPG" size="max-w-lg">
      <div className="flex flex-col gap-4">
        <p className="text-sm">Convert HEIC images (iPhone) to JPG format.</p>
        <input
          type="file"
          accept=".heic,.heif,.heics,.heifs"
          className="file-input file-input-bordered"
          onChange={(e) => {
            setError(null);
            setFile(e.target.files?.[0] ?? null);
          }}
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
        {error && <div className="alert alert-error text-sm">{error}</div>}
        <p className="text-base-content/60 text-xs">
          HEIC conversion may not work in all browsers. Chrome and Edge have the
          best support.
        </p>
      </div>
    </ModalWrapper>
  );
};
ImageConvertHeicToJpgModal.displayName = 'ImageConvertHeicToJpgModal';
