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

export const ImagePixelateModal: FC<{ onClose: () => void }> = ({
  onClose,
}) => {
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [pixelSize, setPixelSize] = useState(5);

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
    <ModalWrapper onClose={onClose} title="Pixelate" size="max-w-lg">
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
          <>
            <label className="flex flex-col gap-1">
              <span className="text-sm">Pixel size: {pixelSize}</span>
              <input
                type="range"
                min={2}
                max={20}
                value={pixelSize}
                onChange={(e) => setPixelSize(Number(e.target.value))}
                className="range range-sm"
              />
            </label>
            <button
              className="btn btn-primary btn-sm"
              disabled={loading}
              onClick={() =>
                processImage((ctx, img) => {
                  const w = img.width,
                    h = img.height;
                  ctx.imageSmoothingEnabled = false;
                  ctx.drawImage(img, 0, 0, w / pixelSize, h / pixelSize);
                  ctx.drawImage(
                    ctx.canvas,
                    0,
                    0,
                    w / pixelSize,
                    h / pixelSize,
                    0,
                    0,
                    w,
                    h
                  );
                })
              }>
              {loading ? (
                <span className="loading loading-spinner" />
              ) : (
                'Pixelate & Download'
              )}
            </button>
          </>
        )}
      </div>
    </ModalWrapper>
  );
};
ImagePixelateModal.displayName = 'ImagePixelateModal';
