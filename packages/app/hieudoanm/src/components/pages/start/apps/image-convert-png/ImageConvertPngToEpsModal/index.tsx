'use client';

import { FC, useState, useCallback, useRef } from 'react';
import { Dropzone, FullScreen } from '@hieudoanm.github.io/components/atoms';
import { downloadBlob } from './utils';

export const ImageConvertPngToEpsModal: FC<{ onClose: () => void }> = ({
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
      const b64 = dataUrl.split(',')[1];
      const eps = `%!PS-Adobe-3.0 EPSF-3.0\n%%BoundingBox: 0 0 ${img.width} ${img.height}\n/currentdict /known known{/currentdict /SBDF load known{/setpagedevice{pop}bind 1 index where{1 index 3 1 roll 1 index 3 1 roll exch pop pop}if}if}if\nsave\n${img.width} ${img.height} scale\n${b64} <~${b64}~> /ASCII85Decode filter /LZWDecode filter false 1 colorimage\nrestore\n`;
      const blob = new Blob([eps], { type: 'image/eps' });
      downloadBlob(blob, file.name.replace(/\.[^.]+$/, '.eps'));
    } catch (err) {
      console.error(err);
    }
    setLoading(false);
  }, [file]);

  return (
    <FullScreen centered onClose={onClose} title="PNG to EPS">
      <div className="rounded-box border-base-300 bg-base-200 border p-4">
        <div className="flex flex-col gap-4">
          <p className="text-sm">Convert PNG images to EPS vector format.</p>
          <Dropzone accept=".png" onFile={(f) => setFile(f)} />
          <canvas ref={canvasRef} className="hidden" />
          <button
            className="btn btn-primary"
            disabled={!file || loading}
            onClick={process}>
            {loading ? (
              <span className="loading loading-spinner" />
            ) : (
              'Convert to EPS'
            )}
          </button>
          <p className="text-base-content/60 text-xs">
            EPS is created with an embedded PNG raster. Vector output requires a
            desktop tool.
          </p>
        </div>
      </div>
    </FullScreen>
  );
};
ImageConvertPngToEpsModal.displayName = 'ImageConvertPngToEpsModal';
