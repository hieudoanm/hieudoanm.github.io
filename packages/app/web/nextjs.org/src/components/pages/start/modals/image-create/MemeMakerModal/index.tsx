'use client';
import { FC, useState, useCallback, useRef } from 'react';
import { ModalWrapper } from '@hieudoanm.github.io/components/atoms/ModalWrapper';
import { downloadBlob } from './utils';

export const MemeMakerModal: FC<{ onClose: () => void }> = ({ onClose }) => {
  const [loading, setLoading] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [file, setFile] = useState<File | null>(null);
  const [text, setText] = useState('');

  const handleGenerate = useCallback(async () => {
    if (!file) return;
    setLoading(true);
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
    ctx.fillStyle = '#000';
    ctx.fillRect(0, 0, canvas.width, 60);
    ctx.fillRect(0, canvas.height - 60, canvas.width, 60);
    ctx.fillStyle = '#fff';
    ctx.font = `bold ${canvas.width / 25}px Impact, sans-serif`;
    ctx.textAlign = 'center';
    ctx.strokeStyle = '#000';
    ctx.lineWidth = 3;

    const lines = text.split('\n');
    if (lines[0]) {
      ctx.textBaseline = 'top';
      ctx.strokeText(lines[0], canvas.width / 2, 10);
      ctx.fillText(lines[0], canvas.width / 2, 10);
    }
    if (lines[1]) {
      ctx.textBaseline = 'bottom';
      ctx.strokeText(lines[1], canvas.width / 2, canvas.height - 10);
      ctx.fillText(lines[1], canvas.width / 2, canvas.height - 10);
    }

    canvas.toBlob((blob) => {
      if (blob) downloadBlob(blob, 'meme.png');
      setLoading(false);
    });
  }, [file, text]);

  return (
    <ModalWrapper onClose={onClose} title="Meme Maker">
      <div className="flex flex-col gap-4">
        <input
          type="file"
          accept="image/*"
          className="file-input file-input-bordered"
          onChange={(e) => setFile(e.target.files?.[0] || null)}
        />
        <input
          type="text"
          className="input input-bordered"
          placeholder="Top text (leave blank for none)"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <p className="text-xs">Use a newline (Enter) for top/bottom text</p>
        <button
          className="btn btn-primary btn-sm"
          disabled={!file || loading}
          onClick={handleGenerate}>
          {loading ? (
            <span className="loading loading-spinner" />
          ) : (
            'Generate Meme'
          )}
        </button>
        <canvas ref={canvasRef} className="hidden" />
      </div>
    </ModalWrapper>
  );
};
MemeMakerModal.displayName = 'MemeMakerModal';
