'use client';

import { FC, useState, useCallback } from 'react';
import { ModalWrapper } from '@hieudoanm.github.io/components/atoms/ModalWrapper';

const downloadBlob = (blob: Blob, name: string) => {
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = name;
  a.click();
  URL.revokeObjectURL(url);
};

export const ImageCompressModal: FC<{ onClose: () => void }> = ({
  onClose,
}) => {
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [quality, setQuality] = useState(0.7);
  const [originalSize, setOriginalSize] = useState(0);
  const [compressedSize, setCompressedSize] = useState(0);

  const loadImage = useCallback((f: File) => {
    setFile(f);
    setOriginalSize(f.size);
    setCompressedSize(0);
  }, []);

  const processImage = useCallback(
    async (
      transform: (ctx: CanvasRenderingContext2D, img: HTMLImageElement) => void,
      mime = 'image/png',
      q?: number
    ) => {
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
      transform(ctx, img);
      canvas.toBlob(
        (blob) => {
          if (blob) {
            downloadBlob(blob, `edited_${file.name}`);
            setCompressedSize(blob.size);
          }
          setLoading(false);
        },
        mime,
        q
      );
    },
    [file]
  );

  return (
    <ModalWrapper onClose={onClose} title="Compress Image" size="max-w-lg">
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
          onClick={() =>
            processImage(
              (ctx, img) => {
                ctx.drawImage(img, 0, 0);
              },
              'image/jpeg',
              quality
            )
          }>
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
      </div>
    </ModalWrapper>
  );
};
ImageCompressModal.displayName = 'ImageCompressModal';
