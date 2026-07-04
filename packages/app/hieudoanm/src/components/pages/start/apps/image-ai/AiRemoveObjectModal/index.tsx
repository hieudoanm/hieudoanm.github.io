'use client';

import { FC, useState, useCallback, useRef } from 'react';
import { Dropzone, FullScreen } from '@hieudoanm.github.io/components/atoms';
import { downloadBlob, medianPatch, floodFill } from './utils';

export const AiRemoveObjectModal: FC<{ onClose: () => void }> = ({
  onClose,
}) => {
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [mode, setMode] = useState<'flood' | 'patch'>('flood');
  const [tolerance, setTolerance] = useState(30);
  const [patchSize, setPatchSize] = useState(5);
  const [clickPos, setClickPos] = useState<{ x: number; y: number } | null>(
    null
  );
  const imageRef = useRef<HTMLImageElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const displayCanvasRef = useRef<HTMLCanvasElement>(null);

  const handleImageClick = useCallback(
    (e: React.MouseEvent<HTMLCanvasElement>) => {
      const canvas = displayCanvasRef.current;
      if (!canvas) return;
      const rect = canvas.getBoundingClientRect();
      const x = Math.floor(
        (e.clientX - rect.left) * (canvas.width / rect.width)
      );
      const y = Math.floor(
        (e.clientY - rect.top) * (canvas.height / rect.height)
      );
      setClickPos({ x, y });
    },
    []
  );

  const process = useCallback(async () => {
    if (!file) return;
    if (mode === 'flood' && !clickPos) return;
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

    if (mode === 'flood' && clickPos) {
      floodFill(
        data.data,
        canvas.width,
        canvas.height,
        clickPos.x,
        clickPos.y,
        tolerance
      );
    } else if (mode === 'patch') {
      medianPatch(data.data, canvas.width, canvas.height, patchSize);
    }

    ctx.putImageData(data, 0, 0);
    canvas.toBlob((blob) => {
      if (blob) downloadBlob(blob, `cleaned_${file.name}`);
      setLoading(false);
    });
  }, [file, mode, tolerance, patchSize, clickPos]);

  return (
    <FullScreen onClose={onClose} title="Remove Object">
      <div className="flex flex-col gap-4">
        <Dropzone
          accept="image/*"
          onFile={(f) => {
            setFile(f);
            setClickPos(null);
          }}
        />

        <div className="flex gap-2">
          <button
            className={`btn btn-sm flex-1 ${mode === 'flood' ? 'btn-primary' : 'btn-ghost'}`}
            onClick={() => setMode('flood')}>
            Flood Fill
          </button>
          <button
            className={`btn btn-sm flex-1 ${mode === 'patch' ? 'btn-primary' : 'btn-ghost'}`}
            onClick={() => setMode('patch')}>
            Median Patch
          </button>
        </div>

        {mode === 'flood' && (
          <>
            <p className="text-base-content/40 text-center text-xs">
              {clickPos
                ? `Selected pixel at (${clickPos.x}, ${clickPos.y})`
                : 'Click on the preview below to select an object'}
            </p>
            {file && (
              <canvas
                ref={displayCanvasRef}
                className="max-h-48 w-full cursor-crosshair rounded object-contain"
                onClick={handleImageClick}
              />
            )}
          </>
        )}

        <label className="flex flex-col gap-1 text-sm">
          <span>Tolerance: {tolerance}</span>
          <input
            type="range"
            min={5}
            max={100}
            value={tolerance}
            onChange={(e) => setTolerance(Number(e.target.value))}
          />
        </label>

        {mode === 'patch' && (
          <label className="flex flex-col gap-1 text-sm">
            <span>Patch Size: {patchSize}px</span>
            <input
              type="range"
              min={3}
              max={15}
              step={2}
              value={patchSize}
              onChange={(e) => setPatchSize(Number(e.target.value))}
            />
          </label>
        )}

        <button
          className="btn btn-primary btn-sm"
          disabled={!file || loading || (mode === 'flood' && !clickPos)}
          onClick={process}>
          {loading ? (
            <span className="loading loading-spinner" />
          ) : (
            'Remove Object'
          )}
        </button>

        {file && mode === 'flood' && displayCanvasRef.current && (
          <img
            ref={imageRef}
            src={URL.createObjectURL(file)}
            className="hidden"
            onLoad={() => {
              const dc = displayCanvasRef.current!;
              const img = imageRef.current!;
              dc.width = img.naturalWidth;
              dc.height = img.naturalHeight;
              const ctx = dc.getContext('2d')!;
              ctx.drawImage(img, 0, 0);
            }}
            alt=""
          />
        )}

        <canvas ref={canvasRef} className="hidden" />
      </div>
    </FullScreen>
  );
};
AiRemoveObjectModal.displayName = 'AiRemoveObjectModal';
