'use client';

import { FC, useState, useCallback, useRef } from 'react';
import { Dropzone } from '@hieudoanm.github.io/components/atoms';
import { ImageToolConfig } from '../config';
import { downloadBlob, loadImage } from '../lib/canvas';

const floodFill = (
  data: Uint8ClampedArray,
  w: number,
  h: number,
  startX: number,
  startY: number,
  tolerance: number
) => {
  const startIdx = (startY * w + startX) * 4;
  const targetR = data[startIdx];
  const targetG = data[startIdx + 1];
  const targetB = data[startIdx + 2];
  const visited = new Uint8Array(w * h);
  const stack = [[startX, startY]];

  while (stack.length > 0) {
    const [cx, cy] = stack.pop()!;
    if (cx < 0 || cx >= w || cy < 0 || cy >= h) continue;
    const idx = cy * w + cx;
    if (visited[idx]) continue;
    visited[idx] = 1;

    const pi = idx * 4;
    const dist = Math.sqrt(
      (data[pi] - targetR) ** 2 +
        (data[pi + 1] - targetG) ** 2 +
        (data[pi + 2] - targetB) ** 2
    );
    if (dist > tolerance) continue;

    data[pi + 3] = 0;
    stack.push([cx + 1, cy], [cx - 1, cy], [cx, cy + 1], [cx, cy - 1]);
  }
};

const medianPatch = (
  data: Uint8ClampedArray,
  w: number,
  h: number,
  patchSize: number
) => {
  const copy = new Uint8ClampedArray(data);
  const half = Math.floor(patchSize / 2);
  for (let y = half; y < h - half; y++) {
    for (let x = half; x < w - half; x++) {
      const idx = (y * w + x) * 4;
      if (copy[idx + 3] < 255) {
        for (let c = 0; c < 3; c++) {
          const neighbors: number[] = [];
          for (let dy = -half; dy <= half; dy++) {
            for (let dx = -half; dx <= half; dx++) {
              const ni = ((y + dy) * w + (x + dx)) * 4 + c;
              if (copy[ni + 3] > 0) neighbors.push(copy[ni]);
            }
          }
          if (neighbors.length > 0) {
            neighbors.sort((a, b) => a - b);
            data[idx + c] = neighbors[Math.floor(neighbors.length / 2)];
          }
        }
        data[idx + 3] = 255;
      }
    }
  }
};

export const AiRemoveObjectTool: FC<{ config: ImageToolConfig }> = ({
  config,
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
    const img = await loadImage(file);
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
  );
};
AiRemoveObjectTool.displayName = 'AiRemoveObjectTool';
