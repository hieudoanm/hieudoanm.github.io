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

export const ImageCombinerStackedModal: FC<{ onClose: () => void }> = ({
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

    const maxW = Math.max(...imgs.map((img) => img.width));
    const totalH =
      imgs.reduce((s, img) => s + img.height, 0) + gap * (imgs.length - 1);
    canvas.width = maxW;
    canvas.height = totalH;
    ctx.fillStyle = bgColor;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    let y = 0;
    for (const img of imgs) {
      const x = (maxW - img.width) / 2;
      ctx.drawImage(img, x, y, img.width, img.height);
      y += img.height + gap;
    }

    canvas.toBlob((blob) => {
      if (blob) downloadBlob(blob, 'combined.vertical.png');
      setLoading(false);
    });
  }, [files, gap, bgColor]);

  return (
    <ModalWrapper onClose={onClose} title="Stack Vertically">
      <div className="flex flex-col gap-4">
        <input
          type="file"
          accept="image/*"
          multiple
          className="file-input file-input-bordered"
          onChange={(e) => setFiles(Array.from(e.target.files ?? []))}
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
            'Stack Vertically'
          )}
        </button>
        <canvas ref={canvasRef} className="hidden" />
      </div>
    </ModalWrapper>
  );
};
ImageCombinerStackedModal.displayName = 'ImageCombinerStackedModal';
