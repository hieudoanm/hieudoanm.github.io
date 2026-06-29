'use client';

import { FC, useCallback, useRef, useState } from 'react';
import { ModalWrapper } from '@hieudoanm.github.io/components/atoms/ModalWrapper';
import { downloadBlob } from './utils';

export const ImageCompressModal: FC<{ onClose: () => void }> = ({
  onClose,
}) => {
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [quality, setQuality] = useState(0.7);
  const [originalSize, setOriginalSize] = useState(0);
  const [compressedSize, setCompressedSize] = useState(0);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const loadImage = useCallback((f: File) => {
    setFile(f);
    setOriginalSize(f.size);
    setCompressedSize(0);
  }, []);

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
    canvas.toBlob(
      (blob) => {
        if (blob) {
          downloadBlob(blob, `compressed_${file.name}`);
          setCompressedSize(blob.size);
        }
        setLoading(false);
      },
      'image/jpeg',
      quality
    );
  }, [file, quality]);

  return (
    <ModalWrapper onClose={onClose} title="Compress Image">
      <div className="flex flex-col gap-4">
        <input
          type="file"
          accept="image/*"
          className="file-input file-input-bordered"
          onChange={(e) => {
            const f = e.target.files?.[0];
            if (f) loadImage(f);
          }}
        />
        {file && (
          <>
            <label className="flex flex-col gap-1">
              <span className="text-sm">Quality: {quality.toFixed(1)}</span>
              <input
                type="range"
                min={0.1}
                max={1}
                step={0.1}
                value={quality}
                onChange={(e) => setQuality(Number(e.target.value))}
                className="range range-sm"
              />
            </label>
            <button
              className="btn btn-primary btn-sm"
              disabled={!file || loading}
              onClick={processImage}>
              {loading ? (
                <span className="loading loading-spinner" />
              ) : (
                'Compress & Download'
              )}
            </button>
            {compressedSize > 0 && (
              <div className="bg-base-200 rounded p-3 text-sm">
                <p>Original: {(originalSize / 1024).toFixed(1)} KB</p>
                <p>Compressed: {(compressedSize / 1024).toFixed(1)} KB</p>
                <p>
                  Reduction:{' '}
                  {((1 - compressedSize / originalSize) * 100).toFixed(1)}%
                </p>
              </div>
            )}
          </>
        )}
      </div>
      <canvas ref={canvasRef} className="hidden" />
    </ModalWrapper>
  );
};
ImageCompressModal.displayName = 'ImageCompressModal';
