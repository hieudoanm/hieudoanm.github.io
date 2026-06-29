'use client';

import { FC, useState, useCallback, useRef } from 'react';
import { ModalWrapper } from '@hieudoanm.github.io/components/atoms/ModalWrapper';

const downloadBlob = (blob: Blob, name: string) => {
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = name;
  a.click();
  URL.revokeObjectURL(url);
};

export const ImageConvertSvgToPngModal: FC<{ onClose: () => void }> = ({
  onClose,
}) => {
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const process = useCallback(async () => {
    if (!file) return;
    setLoading(true);
    try {
      const svgText = await file.text();
      const img = await new Promise<HTMLImageElement>((res, rej) => {
        const i = new Image();
        i.onload = () => res(i);
        i.onerror = rej;
        i.src =
          'data:image/svg+xml;base64,' +
          btoa(unescape(encodeURIComponent(svgText)));
      });
      const canvas = canvasRef.current!;
      const ctx = canvas.getContext('2d')!;
      canvas.width = img.width;
      canvas.height = img.height;
      ctx.drawImage(img, 0, 0);
      canvas.toBlob((blob) => {
        if (blob) downloadBlob(blob, file.name.replace(/\.[^.]+$/, '.png'));
        setLoading(false);
      }, 'image/png');
    } catch (err) {
      console.error(err);
      setLoading(false);
    }
  }, [file]);

  return (
    <ModalWrapper onClose={onClose} title="SVG to PNG" size="max-w-lg">
      <div className="flex flex-col gap-4">
        <p className="text-sm">
          Convert SVG vector graphics to PNG raster format.
        </p>
        <input
          type="file"
          accept=".svg"
          className="file-input file-input-bordered"
          onChange={(e) => setFile(e.target.files?.[0] ?? null)}
        />
        <canvas ref={canvasRef} className="hidden" />
        <button
          className="btn btn-primary"
          disabled={!file || loading}
          onClick={process}>
          {loading ? (
            <span className="loading loading-spinner" />
          ) : (
            'Convert to PNG'
          )}
        </button>
        <p className="text-base-content/60 text-xs">
          SVG is rendered at its intrinsic size. Complex SVGs may render
          differently.
        </p>
      </div>
    </ModalWrapper>
  );
};
ImageConvertSvgToPngModal.displayName = 'ImageConvertSvgToPngModal';
