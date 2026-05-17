'use client';

import { FC, useState, useCallback, useRef } from 'react';
import { Dropzone, ModalWrapper } from '@hieudoanm.github.io/components/atoms';
import { downloadBlob } from './utils';

export const ImageConvertJpgToSvgModal: FC<{ onClose: () => void }> = ({
  onClose,
}) => {
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const process = useCallback(async () => {
    if (!file) return;
    setLoading(true);
    try {
      const img = await new Promise<HTMLImageElement>((res, rej) => {
        const i = new Image();
        i.onload = () => res(i);
        i.onerror = rej;
        i.src = URL.createObjectURL(file);
      });
      const canvas = canvasRef.current!;
      const ctx = canvas.getContext('2d')!;
      canvas.width = img.width;
      canvas.height = img.height;
      ctx.drawImage(img, 0, 0);
      const dataUrl = canvas.toDataURL('image/png');
      const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${img.width}" height="${img.height}"><image width="${img.width}" height="${img.height}" href="${dataUrl}"/></svg>`;
      const blob = new Blob([svg], { type: 'image/svg+xml' });
      downloadBlob(blob, file.name.replace(/\.[^.]+$/, '.svg'));
    } catch (err) {
      console.error(err);
    }
    setLoading(false);
  }, [file]);

  return (
    <ModalWrapper onClose={onClose} title="JPG to SVG" size="max-w-lg">
      <div className="flex flex-col gap-4">
        <p className="text-sm">Convert JPG images to SVG vector format.</p>
        <Dropzone accept=".jpg,.jpeg" onFile={(f) => setFile(f)} />
        <canvas ref={canvasRef} className="hidden" />
        <button
          className="btn btn-primary"
          disabled={!file || loading}
          onClick={process}>
          {loading ? (
            <span className="loading loading-spinner" />
          ) : (
            'Convert to SVG'
          )}
        </button>
        <p className="text-base-content/60 text-xs">
          JPG to SVG creates an SVG wrapper with embedded image data.
        </p>
      </div>
    </ModalWrapper>
  );
};
ImageConvertJpgToSvgModal.displayName = 'ImageConvertJpgToSvgModal';
