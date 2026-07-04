'use client';

import { FC, useState, useCallback, useRef } from 'react';
import { Dropzone, FullScreen } from '@hieudoanm.github.io/components/atoms';
import { downloadBlob } from './utils';

export const ImageWatermarkModal: FC<{ onClose: () => void }> = ({
  onClose,
}) => {
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [watermarkText, setWatermarkText] = useState('');
  const [watermarkOpacity, setWatermarkOpacity] = useState(0.5);
  const [watermarkPos, setWatermarkPos] = useState<
    'bottom-right' | 'bottom-left' | 'top-right' | 'top-left' | 'center'
  >('bottom-right');
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const process = useCallback(async () => {
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
    ctx.globalAlpha = watermarkOpacity;
    ctx.fillStyle = '#fff';
    ctx.font = `bold ${Math.max(16, canvas.width / 20)}px sans-serif`;
    ctx.textAlign = 'center';
    ctx.strokeStyle = '#000';
    ctx.lineWidth = 2;
    const positions: Record<string, [number, number]> = {
      'bottom-right': [canvas.width - 20, canvas.height - 20],
      'bottom-left': [20, canvas.height - 20],
      'top-right': [canvas.width - 20, 30],
      'top-left': [20, 30],
      center: [canvas.width / 2, canvas.height / 2],
    };
    const [px, py] = positions[watermarkPos] || positions['bottom-right'];
    ctx.textBaseline = watermarkPos.includes('top') ? 'top' : 'bottom';
    const align = watermarkPos.includes('left')
      ? 'left'
      : watermarkPos.includes('right')
        ? 'right'
        : 'center';
    ctx.textAlign = align as CanvasTextAlign;
    ctx.strokeText(watermarkText, px, py);
    ctx.fillText(watermarkText, px, py);
    ctx.globalAlpha = 1;
    canvas.toBlob((blob) => {
      if (blob) downloadBlob(blob, `watermark_${file.name}`);
      setLoading(false);
    });
  }, [file, watermarkText, watermarkOpacity, watermarkPos]);

  return (
    <FullScreen centered onClose={onClose} title="Watermark">
      <div className="rounded-box border-base-300 bg-base-200 border p-4">
        <div className="flex flex-col gap-4">
          <Dropzone accept="image/*" onFile={(f) => setFile(f)} />
          <input
            type="text"
            className="input input-bordered"
            placeholder="Watermark text"
            value={watermarkText}
            onChange={(e) => setWatermarkText(e.target.value)}
          />
          <label className="flex flex-col gap-1 text-sm">
            Opacity: {Math.round(watermarkOpacity * 100)}%
            <input
              type="range"
              min={0.1}
              max={1}
              step={0.05}
              value={watermarkOpacity}
              onChange={(e) => setWatermarkOpacity(Number(e.target.value))}
            />
          </label>
          <select
            className="select select-bordered select-sm"
            value={watermarkPos}
            onChange={(e) =>
              setWatermarkPos(e.target.value as typeof watermarkPos)
            }>
            <option value="bottom-right">Bottom Right</option>
            <option value="bottom-left">Bottom Left</option>
            <option value="top-right">Top Right</option>
            <option value="top-left">Top Left</option>
            <option value="center">Center</option>
          </select>
          <button
            className="btn btn-primary btn-sm"
            disabled={!file || loading}
            onClick={process}>
            {loading ? (
              <span className="loading loading-spinner" />
            ) : (
              'Apply Watermark'
            )}
          </button>
          <canvas ref={canvasRef} className="hidden" />
        </div>
      </div>
    </FullScreen>
  );
};
ImageWatermarkModal.displayName = 'ImageWatermarkModal';
