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

export const ImageCropModal: FC<{ onClose: () => void }> = ({ onClose }) => {
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [cropX, setCropX] = useState(0);
  const [cropY, setCropY] = useState(0);
  const [cropW, setCropW] = useState(100);
  const [cropH, setCropH] = useState(100);

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
    <ModalWrapper onClose={onClose} title="Crop Image" size="max-w-lg">
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
            <div className="grid grid-cols-2 gap-2">
              <label className="flex flex-col gap-1">
                <span className="text-xs">X:</span>
                <input
                  type="number"
                  className="input input-bordered input-sm"
                  value={cropX}
                  onChange={(e) => setCropX(Number(e.target.value))}
                />
              </label>
              <label className="flex flex-col gap-1">
                <span className="text-xs">Y:</span>
                <input
                  type="number"
                  className="input input-bordered input-sm"
                  value={cropY}
                  onChange={(e) => setCropY(Number(e.target.value))}
                />
              </label>
              <label className="flex flex-col gap-1">
                <span className="text-xs">Width:</span>
                <input
                  type="number"
                  className="input input-bordered input-sm"
                  value={cropW}
                  onChange={(e) => setCropW(Number(e.target.value))}
                />
              </label>
              <label className="flex flex-col gap-1">
                <span className="text-xs">Height:</span>
                <input
                  type="number"
                  className="input input-bordered input-sm"
                  value={cropH}
                  onChange={(e) => setCropH(Number(e.target.value))}
                />
              </label>
            </div>
            <button
              className="btn btn-primary btn-sm"
              disabled={loading}
              onClick={() =>
                processImage((ctx, img) => {
                  ctx.drawImage(
                    img,
                    cropX,
                    cropY,
                    cropW,
                    cropH,
                    0,
                    0,
                    cropW,
                    cropH
                  );
                })
              }>
              {loading ? (
                <span className="loading loading-spinner" />
              ) : (
                'Crop & Download'
              )}
            </button>
          </>
        )}
      </div>
    </ModalWrapper>
  );
};
ImageCropModal.displayName = 'ImageCropModal';
