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

export const ImageFlipModal: FC<{ onClose: () => void }> = ({ onClose }) => {
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);

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
          if (blob) downloadBlob(blob, `edited_${file.name}`);
          setLoading(false);
        },
        mime,
        q
      );
    },
    [file]
  );

  return (
    <ModalWrapper onClose={onClose} title="Flip Image" size="max-w-lg">
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
          <div className="flex gap-2">
            <button
              className="btn btn-primary btn-sm"
              disabled={loading}
              onClick={() =>
                processImage((ctx, img) => {
                  ctx.scale(-1, 1);
                  ctx.drawImage(img, -img.width, 0);
                })
              }>
              {loading ? (
                <span className="loading loading-spinner" />
              ) : (
                'Flip Horizontal'
              )}
            </button>
            <button
              className="btn btn-primary btn-sm"
              disabled={loading}
              onClick={() =>
                processImage((ctx, img) => {
                  ctx.scale(1, -1);
                  ctx.drawImage(img, 0, -img.height);
                })
              }>
              {loading ? (
                <span className="loading loading-spinner" />
              ) : (
                'Flip Vertical'
              )}
            </button>
          </div>
        )}
      </div>
    </ModalWrapper>
  );
};
ImageFlipModal.displayName = 'ImageFlipModal';
