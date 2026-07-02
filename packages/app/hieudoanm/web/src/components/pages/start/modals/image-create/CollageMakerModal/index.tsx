'use client';
import { FC, useState, useCallback, useRef } from 'react';
import { Dropzone, ModalWrapper } from '@hieudoanm.github.io/components/atoms';
import { downloadBlob } from './utils';

export const CollageMakerModal: FC<{ onClose: () => void }> = ({ onClose }) => {
  const [loading, setLoading] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [files, setFiles] = useState<File[]>([]);

  const handleCreate = useCallback(async () => {
    if (files.length === 0) return;
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
    const cols = Math.ceil(Math.sqrt(imgs.length));
    const rows = Math.ceil(imgs.length / cols);
    const cellW = 300;
    const cellH = 300;
    canvas.width = cols * cellW;
    canvas.height = rows * cellH;

    ctx.fillStyle = '#fff';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    imgs.forEach((img, i) => {
      const col = i % cols;
      const row = Math.floor(i / cols);
      const x = col * cellW;
      const y = row * cellH;
      const scale = Math.min(cellW / img.width, cellH / img.height);
      const dw = img.width * scale;
      const dh = img.height * scale;
      ctx.drawImage(img, x + (cellW - dw) / 2, y + (cellH - dh) / 2, dw, dh);
    });

    canvas.toBlob((blob) => {
      if (blob) downloadBlob(blob, 'collage.png');
      setLoading(false);
    });
  }, [files]);

  return (
    <ModalWrapper onClose={onClose} title="Collage Maker">
      <div className="flex flex-col gap-4">
        <Dropzone
          accept="image/*"
          multiple
          onFile={(f) => setFiles((prev) => [...prev, f])}
        />
        {files.length > 0 && <p className="text-sm">{files.length} image(s)</p>}
        <button
          className="btn btn-primary btn-sm"
          disabled={files.length === 0 || loading}
          onClick={handleCreate}>
          {loading ? (
            <span className="loading loading-spinner" />
          ) : (
            'Create Collage'
          )}
        </button>
        <canvas ref={canvasRef} className="hidden" />
      </div>
    </ModalWrapper>
  );
};
CollageMakerModal.displayName = 'CollageMakerModal';
