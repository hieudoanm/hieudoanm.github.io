'use client';

import { FC, useState, useCallback, useRef } from 'react';
import { ModalWrapper } from '@hieudoanm.github.io/components/atoms/ModalWrapper';
import { downloadBlob, colorDistance, chromaKey, edgeDetectBg } from './utils';

export const AiRemoveBgModal: FC<{ onClose: () => void }> = ({ onClose }) => {
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [mode, setMode] = useState<'auto' | 'pick'>('auto');
  const [tolerance, setTolerance] = useState(40);
  const [feather, setFeather] = useState(10);
  const [pickedColor, setPickedColor] = useState('#00ff00');
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
    const data = ctx.getImageData(0, 0, canvas.width, canvas.height);

    if (mode === 'pick') {
      const hex = pickedColor.replace('#', '');
      const kr = parseInt(hex.substring(0, 2), 16);
      const kg = parseInt(hex.substring(2, 4), 16);
      const kb = parseInt(hex.substring(4, 6), 16);
      chromaKey(
        data.data,
        canvas.width,
        canvas.height,
        kr,
        kg,
        kb,
        tolerance,
        feather
      );
    } else {
      edgeDetectBg(data.data, canvas.width, canvas.height, tolerance);
    }

    ctx.putImageData(data, 0, 0);
    canvas.toBlob((blob) => {
      if (blob) downloadBlob(blob, `nobg_${file.name}`);
      setLoading(false);
    });
  }, [file, mode, tolerance, feather, pickedColor]);

  return (
    <ModalWrapper onClose={onClose} title="Remove BG" size="max-w-lg">
      <div className="flex flex-col gap-4">
        <input
          type="file"
          accept="image/*"
          className="file-input file-input-bordered"
          onChange={(e) => setFile(e.target.files?.[0] || null)}
        />

        <div className="flex gap-2">
          <button
            className={`btn btn-sm flex-1 ${mode === 'auto' ? 'btn-primary' : 'btn-ghost'}`}
            onClick={() => setMode('auto')}>
            Auto Detect
          </button>
          <button
            className={`btn btn-sm flex-1 ${mode === 'pick' ? 'btn-primary' : 'btn-ghost'}`}
            onClick={() => setMode('pick')}>
            Pick Color
          </button>
        </div>

        <label className="flex flex-col gap-1 text-sm">
          <span>Tolerance: {tolerance}%</span>
          <input
            type="range"
            min={5}
            max={100}
            value={tolerance}
            onChange={(e) => setTolerance(Number(e.target.value))}
          />
        </label>

        {mode === 'pick' && (
          <>
            <label className="flex items-center gap-2 text-sm">
              <span>Key Color:</span>
              <input
                type="color"
                value={pickedColor}
                onChange={(e) => setPickedColor(e.target.value)}
                className="h-8 w-12"
              />
            </label>
            <label className="flex flex-col gap-1 text-sm">
              <span>Feather: {feather}px</span>
              <input
                type="range"
                min={0}
                max={50}
                value={feather}
                onChange={(e) => setFeather(Number(e.target.value))}
              />
            </label>
          </>
        )}

        <button
          className="btn btn-primary btn-sm"
          disabled={!file || loading}
          onClick={process}>
          {loading ? (
            <span className="loading loading-spinner" />
          ) : (
            'Remove Background'
          )}
        </button>
        <canvas ref={canvasRef} className="hidden" />
      </div>
    </ModalWrapper>
  );
};
AiRemoveBgModal.displayName = 'AiRemoveBgModal';
