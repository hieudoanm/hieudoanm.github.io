'use client';

import { FC, useState, useCallback, useRef } from 'react';
import { ModalWrapper } from '@hieudoanm.github.io/components/atoms/ModalWrapper';
import { downloadBlob, floodFill, inpaintRegion } from './utils';

export const AiRemovePersonModal: FC<{ onClose: () => void }> = ({
  onClose,
}) => {
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [tolerance, setTolerance] = useState(25);
  const [inpaintRadius, setInpaintRadius] = useState(5);
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
    if (!file || !clickPos) return;
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

    floodFill(
      data.data,
      canvas.width,
      canvas.height,
      clickPos.x,
      clickPos.y,
      tolerance
    );
    inpaintRegion(data.data, canvas.width, canvas.height, inpaintRadius);

    ctx.putImageData(data, 0, 0);
    canvas.toBlob((blob) => {
      if (blob) downloadBlob(blob, `noperson_${file.name}`);
      setLoading(false);
    });
  }, [file, tolerance, inpaintRadius, clickPos]);

  return (
    <ModalWrapper onClose={onClose} title="Remove Person" size="max-w-lg">
      <div className="flex flex-col gap-4">
        <input
          type="file"
          accept="image/*"
          className="file-input file-input-bordered"
          onChange={(e) => {
            setFile(e.target.files?.[0] || null);
            setClickPos(null);
          }}
        />

        <p className="text-base-content/40 text-center text-xs">
          {clickPos
            ? `Selected pixel at (${clickPos.x}, ${clickPos.y})`
            : 'Click on the person in the preview below'}
        </p>

        {file && (
          <canvas
            ref={displayCanvasRef}
            className="max-h-48 w-full cursor-crosshair rounded object-contain"
            onClick={handleImageClick}
          />
        )}

        <label className="flex flex-col gap-1 text-sm">
          <span>Tolerance: {tolerance}</span>
          <input
            type="range"
            min={5}
            max={80}
            value={tolerance}
            onChange={(e) => setTolerance(Number(e.target.value))}
          />
        </label>

        <label className="flex flex-col gap-1 text-sm">
          <span>Inpaint Radius: {inpaintRadius}px</span>
          <input
            type="range"
            min={1}
            max={15}
            value={inpaintRadius}
            onChange={(e) => setInpaintRadius(Number(e.target.value))}
          />
        </label>

        <button
          className="btn btn-primary btn-sm"
          disabled={!file || loading || !clickPos}
          onClick={process}>
          {loading ? (
            <span className="loading loading-spinner" />
          ) : (
            'Remove Person'
          )}
        </button>

        {file && (
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
    </ModalWrapper>
  );
};
AiRemovePersonModal.displayName = 'AiRemovePersonModal';
