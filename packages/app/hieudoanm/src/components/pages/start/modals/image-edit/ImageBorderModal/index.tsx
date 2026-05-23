'use client';

import { FC, useCallback, useRef, useState } from 'react';
import { Dropzone, ModalWrapper } from '@hieudoanm.github.io/components/atoms';
import { downloadBlob } from './utils';

export const ImageBorderModal: FC<{ onClose: () => void }> = ({ onClose }) => {
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [borderWidth, setBorderWidth] = useState(5);
  const [borderColor, setBorderColor] = useState('#000000');
  const canvasRef = useRef<HTMLCanvasElement>(null);

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
    const bw = borderWidth;
    canvas.width = img.width + bw * 2;
    canvas.height = img.height + bw * 2;
    const ctx = canvas.getContext('2d')!;
    ctx.fillStyle = borderColor;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(img, bw, bw);
    canvas.toBlob((blob) => {
      if (blob) downloadBlob(blob, `bordered_${file.name}`);
      setLoading(false);
    });
  }, [file, borderWidth, borderColor]);

  return (
    <ModalWrapper onClose={onClose} title="Add Border">
      <div className="flex flex-col gap-4">
        <Dropzone accept="image/*" onFile={(f) => setFile(f)} />
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
              onClick={processImage}>
              {loading ? (
                <span className="loading loading-spinner" />
              ) : (
                'Add Border'
              )}
            </button>
          </>
        )}
      </div>
      <canvas ref={canvasRef} className="hidden" />
    </ModalWrapper>
  );
};
ImageBorderModal.displayName = 'ImageBorderModal';
