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
    <ModalWrapper onClose={onClose} title="PNG to EPS" size="max-w-lg">
      <div className="flex flex-col gap-4">
        <p className="text-sm">Convert PNG images to EPS vector format.</p>
        <input
          type="file"
          accept=".png"
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
            'Convert to EPS'
          )}
        </button>
        <p className="text-base-content/60 text-xs">
          EPS is created with an embedded PNG raster. Vector output requires a
          desktop tool.
        </p>
      </div>
    </ModalWrapper>
  );
};
ImageConvertPngToEpsModal.displayName = 'ImageConvertPngToEpsModal';
