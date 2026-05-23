'use client';

import { FC, useState, useCallback, useRef } from 'react';
import { Dropzone, ModalWrapper } from '@hieudoanm.github.io/components/atoms';
import { downloadBlob } from './utils';

export const ImageCombinerSideBySideModal: FC<{ onClose: () => void }> = ({
  onClose,
}) => {
  const [files, setFiles] = useState<File[]>([]);
  const [loading, setLoading] = useState(false);
  const [gap, setGap] = useState(10);
  const [bgColor, setBgColor] = useState('#ffffff');
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const handleCombine = useCallback(async () => {
    if (files.length < 2) return;
    setLoading(true);
    const imgs = await Promise.all(
      files.map(
        (f) =>
          new Promise<HTMLImageElement>((res, rej) => {
            const i = new Image();
            i.onload = () => res(i);
            i.onerror = rej;
            i.src = URL.createObjectURL(f);
          })
      )
    );
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext('2d')!;

    const totalW =
      imgs.reduce((s, img) => s + img.width, 0) + gap * (imgs.length - 1);
    const maxH = Math.max(...imgs.map((img) => img.height));
    canvas.width = totalW;
    canvas.height = maxH;
    ctx.fillStyle = bgColor;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    let x = 0;
    for (const img of imgs) {
      const y = (maxH - img.height) / 2;
      ctx.drawImage(img, x, y, img.width, img.height);
      x += img.width + gap;
    }

    canvas.toBlob((blob) => {
      if (blob) downloadBlob(blob, 'combined.horizontal.png');
      setLoading(false);
    });
  }, [files, gap, bgColor]);

  return (
    <ModalWrapper onClose={onClose} title="Side by Side">
      <div className="flex flex-col gap-4">
        <Dropzone
          accept="image/*"
          multiple
          onFile={(f) => setFiles((prev) => [...prev, f])}
        />
        {files.length > 0 && (
          <p className="text-sm">{files.length} image(s) selected (min 2)</p>
        )}
        <div className="flex items-center gap-4 text-sm">
          <label>
            Gap:{' '}
            <input
              type="number"
              className="input input-bordered input-sm w-16"
              min={0}
              max={100}
              value={gap}
              onChange={(e) => setGap(Number(e.target.value))}
            />
          </label>
          <label>
            BG:{' '}
            <input
              type="color"
              className="h-8 w-8 cursor-pointer rounded"
              value={bgColor}
              onChange={(e) => setBgColor(e.target.value)}
            />
          </label>
        </div>
        <button
          className="btn btn-primary btn-sm"
          disabled={files.length < 2 || loading}
          onClick={handleCombine}>
          {loading ? (
            <span className="loading loading-spinner" />
          ) : (
            'Combine Side by Side'
          )}
        </button>
        <canvas ref={canvasRef} className="hidden" />
      </div>
    </ModalWrapper>
  );
};
ImageCombinerSideBySideModal.displayName = 'ImageCombinerSideBySideModal';
