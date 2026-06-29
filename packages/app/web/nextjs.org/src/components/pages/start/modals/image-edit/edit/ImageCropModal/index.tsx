'use client';

import { FC, useCallback, useRef, useState } from 'react';
import { ModalWrapper } from '@hieudoanm.github.io/components/atoms/ModalWrapper';
import { downloadBlob } from './utils';

export const ImageCropModal: FC<{ onClose: () => void }> = ({ onClose }) => {
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [cropX, setCropX] = useState(0);
  const [cropY, setCropY] = useState(0);
  const [cropW, setCropW] = useState(100);
  const [cropH, setCropH] = useState(100);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const loadImage = useCallback((f: File) => {
    setFile(f);
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
    canvas.width = cropW;
    canvas.height = cropH;
    const ctx = canvas.getContext('2d')!;
    ctx.drawImage(img, cropX, cropY, cropW, cropH, 0, 0, cropW, cropH);
    canvas.toBlob((blob) => {
      if (blob) downloadBlob(blob, `cropped_${file.name}`);
      setLoading(false);
    });
  }, [file, cropX, cropY, cropW, cropH]);

  return (
    <ModalWrapper onClose={onClose} title="Crop Image">
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
              onClick={processImage}>
              {loading ? (
                <span className="loading loading-spinner" />
              ) : (
                'Crop & Download'
              )}
            </button>
          </>
        )}
      </div>
      <canvas ref={canvasRef} className="hidden" />
    </ModalWrapper>
  );
};
ImageCropModal.displayName = 'ImageCropModal';
