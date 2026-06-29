'use client';

import { FC, useCallback, useRef, useState } from 'react';
import { ModalWrapper } from '@hieudoanm.github.io/components/atoms/ModalWrapper';
import { downloadBlob } from './utils';

export const ImageFlipModal: FC<{ onClose: () => void }> = ({ onClose }) => {
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const loadImage = useCallback((f: File) => {
    setFile(f);
  }, []);

  const flip = useCallback(
    async (horizontal: boolean) => {
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
      if (horizontal) {
        ctx.scale(-1, 1);
        ctx.drawImage(img, -img.width, 0);
      } else {
        ctx.scale(1, -1);
        ctx.drawImage(img, 0, -img.height);
      }
      canvas.toBlob((blob) => {
        if (blob)
          downloadBlob(
            blob,
            `${horizontal ? 'horizontal' : 'vertical'}_${file.name}`
          );
        setLoading(false);
      });
    },
    [file]
  );

  return (
    <ModalWrapper onClose={onClose} title="Flip Image">
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
          <div className="flex gap-2">
            <button
              className="btn btn-primary btn-sm"
              disabled={loading}
              onClick={() => flip(true)}>
              {loading ? (
                <span className="loading loading-spinner" />
              ) : (
                'Flip Horizontal'
              )}
            </button>
            <button
              className="btn btn-primary btn-sm"
              disabled={loading}
              onClick={() => flip(false)}>
              {loading ? (
                <span className="loading loading-spinner" />
              ) : (
                'Flip Vertical'
              )}
            </button>
          </div>
        )}
      </div>
      <canvas ref={canvasRef} className="hidden" />
    </ModalWrapper>
  );
};
ImageFlipModal.displayName = 'ImageFlipModal';
