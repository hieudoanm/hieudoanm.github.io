'use client';

import { Dropzone } from '@hieudoanm.github.io/components/atoms';
import { FC, useRef, useState } from 'react';
import { ImageToolConfig } from '../config';
import { downloadBlob, loadImage } from '../lib/canvas';

type GridSize = 32 | 64;
type Mode = 'square' | 'scale';
type Tab = 'original' | 'pixel';
const CELL: Record<GridSize, number> = { 32: 8, 64: 4 };
const GAP = 1;

const sample = (img: HTMLImageElement, mode: Mode, gridSize: GridSize) => {
  const c = document.createElement('canvas');
  const ctx = c.getContext('2d');
  if (!ctx) return { colors: [], cols: 0, rows: 0 };

  const w = mode === 'square' ? Math.min(img.width, img.height) : img.width;
  const h = mode === 'square' ? w : img.height;

  c.width = gridSize;
  c.height = Math.round(gridSize * (h / w));

  if (mode === 'square') {
    const size = Math.min(img.width, img.height);
    const sx = (img.width - size) / 2;
    const sy = (img.height - size) / 2;
    ctx.drawImage(img, sx, sy, size, size, 0, 0, c.width, c.height);
  } else {
    ctx.drawImage(img, 0, 0, c.width, c.height);
  }

  const imageData = ctx.getImageData(0, 0, c.width, c.height);
  const data = imageData.data;
  const colors: string[] = [];

  for (let y = 0; y < c.height; y++) {
    for (let x = 0; x < c.width; x++) {
      const idx = (y * c.width + x) * 4;
      const r = data[idx];
      const g = data[idx + 1];
      const b = data[idx + 2];
      colors.push(`rgb(${r},${g},${b})`);
    }
  }

  return { colors, cols: c.width, rows: c.height };
};

export const PixelTool: FC<{ config: ImageToolConfig }> = ({ config }) => {
  const [uploaded, setUploaded] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [fileName, setFileName] = useState<string | null>(null);
  const [gridSize, setGridSize] = useState<GridSize>(32);
  const [mode, setMode] = useState<Mode>('square');
  const [tab, setTab] = useState<Tab>('pixel');
  const [pixelData, setPixelData] = useState<{
    colors: string[];
    cols: number;
    rows: number;
  } | null>(null);
  const imgRef = useRef<HTMLImageElement | null>(null);

  const cell = CELL[gridSize];
  const pitch = cell + GAP;

  const reset = () => {
    setUploaded(false);
    setPreviewUrl(null);
    setFileName(null);
    setTab('pixel');
    setGridSize(32);
    setMode('square');
    setPixelData(null);
    imgRef.current = null;
    URL.revokeObjectURL(previewUrl ?? '');
  };

  const pixelate = (img: HTMLImageElement, gs: GridSize, m: Mode) => {
    setPixelData(sample(img, m, gs));
    setTab('pixel');
  };

  const loadImage_ = (file: File) => {
    if (!file.type.startsWith('image/')) return;
    reset();
    setFileName(file.name);
    const url = URL.createObjectURL(file);
    setPreviewUrl(url);

    const reader = new FileReader();
    reader.onload = () => {
      const img = new Image();
      img.onload = () => {
        imgRef.current = img;
        setUploaded(true);
        pixelate(img, 32, 'square');
      };
      img.src = reader.result as string;
    };
    reader.readAsDataURL(file);
  };

  const switchGridSize = (gs: GridSize) => {
    setGridSize(gs);
    const img = imgRef.current;
    if (img) pixelate(img, gs, mode);
  };

  const switchMode = (m: Mode) => {
    setMode(m);
    const img = imgRef.current;
    if (img) pixelate(img, gridSize, m);
  };

  const download = () => {
    if (!pixelData) return;
    const c = document.createElement('canvas');
    c.width = pixelData.cols;
    c.height = pixelData.rows;
    const ctx = c.getContext('2d')!;
    pixelData.colors.forEach((color, i) => {
      ctx.fillStyle = color;
      ctx.fillRect(i % pixelData.cols, Math.floor(i / pixelData.cols), 1, 1);
    });
    const s = document.createElement('canvas');
    s.width = 128;
    s.height = 128;
    const sctx = s.getContext('2d')!;
    sctx.imageSmoothingEnabled = false;
    sctx.drawImage(c, 0, 0, 128, 128);
    const a = document.createElement('a');
    a.download = `${(fileName ?? 'pixel').replace(/\.[^.]+$/, '')}-${mode}.png`;
    a.href = s.toDataURL();
    a.click();
  };

  const gridStyle =
    pixelData && mode === 'scale'
      ? {
          gridTemplateColumns: `repeat(${pixelData.cols}, ${cell}px)`,
          width: pixelData.cols * pitch - GAP,
          height: pixelData.rows * pitch - GAP,
        }
      : undefined;

  return (
    <div className="flex flex-col items-center gap-4">
      {!uploaded && <Dropzone accept="image/*" onFile={loadImage_} />}

      {uploaded && (
        <>
          <div className="flex flex-wrap items-center justify-center gap-1">
            <div className="join">
              <button
                type="button"
                className={`join-item btn btn-xs ${gridSize === 32 ? 'btn-active' : 'btn-ghost'}`}
                onClick={() => switchGridSize(32)}>
                32×32
              </button>
              <button
                type="button"
                className={`join-item btn btn-xs ${gridSize === 64 ? 'btn-active' : 'btn-ghost'}`}
                onClick={() => switchGridSize(64)}>
                64×64
              </button>
            </div>
            <div className="join">
              <button
                type="button"
                className={`join-item btn btn-xs ${mode === 'square' ? 'btn-active' : 'btn-ghost'}`}
                onClick={() => switchMode('square')}>
                Square
              </button>
              <button
                type="button"
                className={`join-item btn btn-xs ${mode === 'scale' ? 'btn-active' : 'btn-ghost'}`}
                onClick={() => switchMode('scale')}>
                Scale
              </button>
            </div>
            <div className="join">
              <button
                type="button"
                className={`join-item btn btn-xs ${tab === 'original' ? 'btn-active' : 'btn-ghost'}`}
                onClick={() => setTab('original')}>
                Original
              </button>
              <button
                type="button"
                className={`join-item btn btn-xs ${tab === 'pixel' ? 'btn-active' : 'btn-ghost'}`}
                onClick={() => setTab('pixel')}>
                Pixel
              </button>
            </div>
          </div>
          {tab === 'original' && (
            <>
              {mode === 'square' ? (
                <div className="border-base-300 h-[320px] w-[320px] overflow-hidden rounded border">
                  <img
                    src={previewUrl!}
                    alt="Square crop"
                    className="h-full w-full object-cover"
                    draggable={false}
                  />
                </div>
              ) : (
                <img
                  src={previewUrl!}
                  alt="Original"
                  className="border-base-300 max-h-[320px] max-w-full rounded border object-contain"
                />
              )}
            </>
          )}
          {tab === 'pixel' && pixelData && (
            <div
              className="border-base-300 bg-base-300 grid gap-[1px] border"
              style={
                gridStyle ?? {
                  gridTemplateColumns: `repeat(${gridSize}, ${cell}px)`,
                }
              }>
              {pixelData.colors.map((color, i) => {
                const x = i % pixelData.cols;
                const y = Math.floor(i / pixelData.cols);
                return (
                  <div
                    key={`${x}-${y}`}
                    style={{
                      backgroundColor: color,
                      width: cell,
                      height: cell,
                    }}
                  />
                );
              })}
            </div>
          )}
          {tab === 'pixel' && pixelData && (
            <>
              <p className="text-center text-xs opacity-60">
                {pixelData.cols}×{pixelData.rows} pixels • {cell}×{cell}px each
                • {fileName}
              </p>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  className="btn btn-xs btn-ghost"
                  onClick={reset}>
                  New
                </button>
                <button
                  type="button"
                  className="btn btn-sm btn-primary"
                  onClick={download}>
                  Download
                </button>
              </div>
            </>
          )}
        </>
      )}
    </div>
  );
};
PixelTool.displayName = 'PixelTool';
