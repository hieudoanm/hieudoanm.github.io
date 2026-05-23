'use client';

import { FC, useState, useCallback, useRef } from 'react';
import { Dropzone, ModalWrapper } from '@hieudoanm.github.io/components/atoms';
import { downloadBlob, getDominantColor, getColorPalette } from './utils';

export const ImageDominantColorModal: FC<{ onClose: () => void }> = ({
  onClose,
}) => {
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [dominantResult, setDominantResult] = useState('');
  const [palette, setPalette] = useState<string[]>([]);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const handleFile = useCallback(async (f: File) => {
    setFile(f);
    setLoading(true);
    const img = await new Promise<HTMLImageElement>((res, rej) => {
      const i = new Image();
      i.onload = () => res(i);
      i.onerror = rej;
      i.src = URL.createObjectURL(f);
    });
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext('2d')!;
    canvas.width = img.width;
    canvas.height = img.height;
    ctx.drawImage(img, 0, 0);
    const dominant = getDominantColor(ctx, canvas.width, canvas.height);
    const pal = getColorPalette(ctx, canvas.width, canvas.height, 8);
    setDominantResult(dominant);
    setPalette(pal);
    canvas.toBlob((blob) => {
      if (blob) downloadBlob(blob, `dominant_${f.name}`);
      setLoading(false);
    });
  }, []);

  return (
    <ModalWrapper onClose={onClose} title="Dominant Color">
      <div className="flex flex-col gap-4">
        <Dropzone accept="image/*" onFile={handleFile} />
        {loading && <span className="loading loading-spinner" />}
        {dominantResult && (
          <div className="bg-base-200 space-y-2 rounded p-4 text-sm">
            <div className="flex items-center gap-2">
              <span className="font-normal">Dominant:</span>
              <span
                className="h-6 w-6 rounded border"
                style={{ backgroundColor: dominantResult }}
              />
              <span>{dominantResult}</span>
            </div>
            <div>
              <span className="font-normal">Palette:</span>
            </div>
            <div className="flex flex-wrap gap-1">
              {palette.map((c, i) => (
                <span
                  key={i}
                  className="h-8 w-8 rounded border"
                  style={{ backgroundColor: c }}
                  title={c}
                />
              ))}
            </div>
          </div>
        )}
        <canvas ref={canvasRef} className="hidden" />
      </div>
    </ModalWrapper>
  );
};
ImageDominantColorModal.displayName = 'ImageDominantColorModal';
