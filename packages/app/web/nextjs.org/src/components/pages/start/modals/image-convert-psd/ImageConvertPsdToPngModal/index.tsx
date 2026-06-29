'use client';

import { FC, useState, useCallback, useRef } from 'react';
import { ModalWrapper } from '@hieudoanm.github.io/components/atoms/ModalWrapper';
import { downloadBlob } from './utils';

export const ImageConvertPsdToPngModal: FC<{ onClose: () => void }> = ({
  onClose,
}) => {
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
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
      canvas.toBlob((blob) => {
        if (blob) downloadBlob(blob, file.name.replace(/\.[^.]+$/, '.png'));
        setLoading(false);
      }, 'image/png');
    } catch {
      setError(
        'Your browser cannot decode PSD files. Use a desktop tool like Photoshop or GIMP.'
      );
      setLoading(false);
    }
  }, [file]);

  return (
    <ModalWrapper onClose={onClose} title="PSD to PNG" size="max-w-lg">
      <div className="flex flex-col gap-4">
        <p className="text-sm">Convert Photoshop PSD files to PNG format.</p>
        <input
          type="file"
          accept=".psd"
          className="file-input file-input-bordered"
          onChange={(e) => {
            setError(null);
            setFile(e.target.files?.[0] ?? null);
          }}
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
        {error && <div className="alert alert-error text-sm">{error}</div>}
        <p className="text-base-content/60 text-xs">
          PSD support varies by browser. Chrome may render flattened PSD
          previews.
        </p>
      </div>
    </ModalWrapper>
  );
};
ImageConvertPsdToPngModal.displayName = 'ImageConvertPsdToPngModal';
