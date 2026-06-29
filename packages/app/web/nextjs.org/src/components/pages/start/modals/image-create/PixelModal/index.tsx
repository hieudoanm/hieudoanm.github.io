'use client';

import { ModalWrapper } from '@hieudoanm.github.io/components/atoms/ModalWrapper';
import { FC, useRef, useState } from 'react';
import { GridSize, Mode, Tab, CELL, GAP, sample } from './utils';

export const PixelModal: FC<{ onClose: () => void }> = ({ onClose }) => {
  const [uploaded, setUploaded] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [fileName, setFileName] = useState<string | null>(null);
  const [gridSize, setGridSize] = useState<GridSize>(32);
  const [mode, setMode] = useState<Mode>('square');
  const [tab, setTab] = useState<Tab>('pixel');
  const [dragging, setDragging] = useState(false);
  const [pixelData, setPixelData] = useState<{
    colors: string[];
    cols: number;
    rows: number;
  } | null>(null);
  const imgRef = useRef<HTMLImageElement | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

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

  const loadImage = (file: File) => {
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
    <ModalWrapper
      onClose={onClose}
      title="Pixel Art Grid"
      subtitle={`${gridSize}×${gridSize}`}>
      <div className="flex flex-col items-center gap-4">
        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (file) loadImage(file);
          }}
        />

        {!uploaded && (
          <div
            role="button"
            tabIndex={0}
            onDragOver={(e) => {
              e.preventDefault();
              setDragging(true);
            }}
            onDragLeave={() => setDragging(false)}
            onDrop={(e) => {
              e.preventDefault();
              setDragging(false);
              loadImage(e.dataTransfer.files[0]);
            }}
            onClick={() => inputRef.current?.click()}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') inputRef.current?.click();
            }}
            className={`flex h-32 w-full cursor-pointer flex-col items-center justify-center gap-2 rounded-xl border-2 border-dashed text-sm transition-colors ${
              dragging
                ? 'border-primary bg-primary/10'
                : 'border-base-300 hover:border-base-content/50'
            }`}>
            <svg
              className="h-6 w-6 opacity-60"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5"
              />
            </svg>
            <span className="opacity-60">
              Drop an image here or click to browse
            </span>
            {fileName && <span className="text-xs opacity-40">{fileName}</span>}
          </div>
        )}

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
                  {pixelData.cols}×{pixelData.rows} pixels • {cell}×{cell}px
                  each • {fileName}
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
    </ModalWrapper>
  );
};

PixelModal.displayName = 'PixelModal';
