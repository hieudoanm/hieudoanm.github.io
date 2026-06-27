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

export const ImageBorderModal: FC<{ onClose: () => void }> = ({ onClose }) => {
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [borderWidth, setBorderWidth] = useState(5);
  const [borderColor, setBorderColor] = useState('#000000');

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
    <ModalWrapper onClose={onClose} title="Add Border" size="max-w-lg">
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
            <div className="flex gap-2">
              <label className="flex flex-1 flex-col gap-1">
                <span className="text-xs">Border width:</span>
                <input
                  type="number"
                  className="input input-bordered input-sm"
                  min={1}
                  value={borderWidth}
                  onChange={(e) => setBorderWidth(Number(e.target.value))}
                />
              </label>
              <label className="flex flex-1 flex-col gap-1">
                <span className="text-xs">Color:</span>
                <input
                  type="color"
                  className="input input-bordered input-sm h-10"
                  value={borderColor}
                  onChange={(e) => setBorderColor(e.target.value)}
                />
              </label>
            </div>
            <button
              className="btn btn-primary btn-sm"
              disabled={loading}
              onClick={() =>
                processImage((ctx, img) => {
                  const bw = borderWidth;
                  ctx.canvas.width = img.width + bw * 2;
                  ctx.canvas.height = img.height + bw * 2;
                  ctx.fillStyle = borderColor;
                  ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);
                  ctx.drawImage(img, bw, bw);
                })
              }>
              {loading ? (
                <span className="loading loading-spinner" />
              ) : (
                'Add Border'
              )}
            </button>
          </>
        )}
      </div>
    </ModalWrapper>
  );
};
ImageBorderModal.displayName = 'ImageBorderModal';
