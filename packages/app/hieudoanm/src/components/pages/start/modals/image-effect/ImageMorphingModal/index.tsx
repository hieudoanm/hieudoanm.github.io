'use client';

import { FC, useCallback, useEffect, useRef, useState } from 'react';
import { Dropzone, ModalWrapper } from '@hieudoanm.github.io/components/atoms';
import {
  Grid2D,
  createUniformGrid,
  copyGrid,
  findNearestPoint,
  morphFrame,
  downloadBlob,
  loadImage,
} from './logic';

const DISPLAY_W = 280;
const GRID_RADIUS = 8;
const POINT_RADIUS = 5;

export const ImageMorphingModal: FC<{ onClose: () => void }> = ({
  onClose,
}) => {
  const [srcFile, setSrcFile] = useState<File | null>(null);
  const [tgtFile, setTgtFile] = useState<File | null>(null);
  const [gridRows, setGridRows] = useState(6);
  const [gridCols, setGridCols] = useState(6);
  const [t, setT] = useState(0.5);
  const [playing, setPlaying] = useState(false);
  const [speed, setSpeed] = useState(2);
  const [outSize, setOutSize] = useState({ w: 0, h: 0 });

  const srcImgRef = useRef<HTMLImageElement | null>(null);
  const tgtImgRef = useRef<HTMLImageElement | null>(null);
  const srcCanvasRef = useRef<HTMLCanvasElement>(null);
  const tgtCanvasRef = useRef<HTMLCanvasElement>(null);
  const previewCanvasRef = useRef<HTMLCanvasElement>(null);
  const srcGridRef = useRef(copyGrid(createUniformGrid(6, 6)));
  const tgtGridRef = useRef(copyGrid(createUniformGrid(6, 6)));
  const dragRef = useRef<{ row: number; col: number; source: boolean } | null>(
    null
  );
  const animRef = useRef(0);
  const startTimeRef = useRef(0);
  const srcSizeRef = useRef({ w: DISPLAY_W, h: DISPLAY_W });
  const tgtSizeRef = useRef({ w: DISPLAY_W, h: DISPLAY_W });

  const drawCanvas = useCallback(
    (
      canvas: HTMLCanvasElement,
      img: HTMLImageElement,
      grid: Grid2D,
      displayW: number,
      displayH: number,
      highlight: { row: number; col: number } | null
    ) => {
      const ctx = canvas.getContext('2d');
      if (!ctx) return;
      canvas.width = displayW;
      canvas.height = displayH;
      ctx.drawImage(img, 0, 0, displayW, displayH);
      ctx.strokeStyle = 'rgba(255,255,0,0.6)';
      ctx.lineWidth = 1;
      for (let r = 0; r < grid.rows; r++) {
        for (let c = 0; c < grid.cols; c++) {
          const p = grid.points[r][c];
          const px = p.x * displayW;
          const py = p.y * displayH;
          if (r < grid.rows - 1) {
            const b = grid.points[r + 1][c];
            ctx.beginPath();
            ctx.moveTo(px, py);
            ctx.lineTo(b.x * displayW, b.y * displayH);
            ctx.stroke();
          }
          if (c < grid.cols - 1) {
            const ri = grid.points[r][c + 1];
            ctx.beginPath();
            ctx.moveTo(px, py);
            ctx.lineTo(ri.x * displayW, ri.y * displayH);
            ctx.stroke();
          }
        }
      }
      for (let r = 0; r < grid.rows; r++) {
        for (let c = 0; c < grid.cols; c++) {
          const p = grid.points[r][c];
          const px = p.x * displayW;
          const py = p.y * displayH;
          ctx.beginPath();
          ctx.arc(px, py, POINT_RADIUS, 0, Math.PI * 2);
          const hl = highlight && highlight.row === r && highlight.col === c;
          ctx.fillStyle = hl ? '#ff4444' : 'rgba(255,255,0,0.9)';
          ctx.fill();
          if (hl) {
            ctx.strokeStyle = '#ffffff';
            ctx.lineWidth = 2;
            ctx.stroke();
          }
        }
      }
    },
    []
  );

  const redrawAll = useCallback(() => {
    const srcImg = srcImgRef.current;
    const tgtImg = tgtImgRef.current;
    const srcCanvas = srcCanvasRef.current;
    const tgtCanvas = tgtCanvasRef.current;
    const previewCanvas = previewCanvasRef.current;
    if (!srcImg || !tgtImg || !srcCanvas || !tgtCanvas || !previewCanvas)
      return;

    drawCanvas(
      srcCanvas,
      srcImg,
      srcGridRef.current,
      srcSizeRef.current.w,
      srcSizeRef.current.h,
      null
    );
    drawCanvas(
      tgtCanvas,
      tgtImg,
      tgtGridRef.current,
      tgtSizeRef.current.w,
      tgtSizeRef.current.h,
      null
    );

    const sw = srcImg.naturalWidth;
    const sh = srcImg.naturalHeight;
    const tw = tgtImg.naturalWidth;
    const th = tgtImg.naturalHeight;
    const ow = Math.max(sw, tw);
    const oh = Math.max(sh, th);
    const srcData = getImageData(srcImg, sw, sh);
    const tgtData = getImageData(tgtImg, tw, th);
    if (!srcData || !tgtData) return;

    setOutSize({ w: ow, h: oh });
    const result = morphFrame(
      srcData,
      tgtData,
      srcGridRef.current,
      tgtGridRef.current,
      ow,
      oh,
      t
    );
    const pctx = previewCanvas.getContext('2d');
    if (pctx) {
      previewCanvas.width = ow;
      previewCanvas.height = oh;
      pctx.putImageData(result, 0, 0);
    }
  }, [t, drawCanvas]);

  const getImageData = useCallback(
    (img: HTMLImageElement, w: number, h: number) => {
      const c = document.createElement('canvas');
      c.width = w;
      c.height = h;
      const ctx = c.getContext('2d');
      if (!ctx) return null;
      ctx.drawImage(img, 0, 0, w, h);
      return ctx.getImageData(0, 0, w, h);
    },
    []
  );

  const resetGrids = useCallback(() => {
    srcGridRef.current = copyGrid(createUniformGrid(gridRows, gridCols));
    tgtGridRef.current = copyGrid(createUniformGrid(gridRows, gridCols));
    redrawAll();
  }, [gridRows, gridCols, redrawAll]);

  useEffect(() => {
    resetGrids();
  }, [gridRows, gridCols, resetGrids]);

  useEffect(() => {
    if (srcImgRef.current && tgtImgRef.current) redrawAll();
  }, [t, redrawAll]);

  const handleSrcFile = useCallback(
    async (f: File) => {
      if (!f) return;
      setSrcFile(f);
      const img = await loadImage(f);
      srcImgRef.current = img;
      const h = Math.round(DISPLAY_W * (img.naturalHeight / img.naturalWidth));
      srcSizeRef.current = { w: DISPLAY_W, h };
      resetGrids();
    },
    [resetGrids]
  );

  const handleTgtFile = useCallback(
    async (f: File) => {
      if (!f) return;
      setTgtFile(f);
      const img = await loadImage(f);
      tgtImgRef.current = img;
      const h = Math.round(DISPLAY_W * (img.naturalHeight / img.naturalWidth));
      tgtSizeRef.current = { w: DISPLAY_W, h };
      resetGrids();
    },
    [resetGrids]
  );

  const getCanvasPoint = (
    canvas: HTMLCanvasElement,
    e: React.MouseEvent
  ): { x: number; y: number } => {
    const rect = canvas.getBoundingClientRect();
    return {
      x: (e.clientX - rect.left) / rect.width,
      y: (e.clientY - rect.top) / rect.height,
    };
  };

  const handleMouseDown = useCallback(
    (source: boolean) => (e: React.MouseEvent) => {
      const canvas = source ? srcCanvasRef.current : tgtCanvasRef.current;
      if (!canvas) return;
      const pt = getCanvasPoint(canvas, e);
      const grid = source ? srcGridRef.current : tgtGridRef.current;
      const found = findNearestPoint(grid, pt.x, pt.y, GRID_RADIUS / DISPLAY_W);
      if (found) dragRef.current = { ...found, source };
    },
    []
  );

  const handleMouseMove = useCallback(
    (source: boolean) => (e: React.MouseEvent) => {
      const drag = dragRef.current;
      if (!drag || drag.source !== source) return;
      const canvas = source ? srcCanvasRef.current : tgtCanvasRef.current;
      if (!canvas) return;
      const pt = getCanvasPoint(canvas, e);
      const grid = source ? srcGridRef.current : tgtGridRef.current;
      grid.points[drag.row][drag.col] = {
        x: Math.max(0, Math.min(1, pt.x)),
        y: Math.max(0, Math.min(1, pt.y)),
      };
      redrawAll();
    },
    [redrawAll]
  );

  const handleMouseUp = useCallback(() => {
    dragRef.current = null;
  }, []);

  const play = useCallback(() => {
    if (playing) {
      cancelAnimationFrame(animRef.current);
      setPlaying(false);
      return;
    }
    setT(0);
    setPlaying(true);
    startTimeRef.current = performance.now();
    const animate = (now: number) => {
      const elapsed = (now - startTimeRef.current) / (speed * 1000);
      if (elapsed >= 1) {
        setT(1);
        setPlaying(false);
        return;
      }
      setT(elapsed);
      animRef.current = requestAnimationFrame(animate);
    };
    animRef.current = requestAnimationFrame(animate);
  }, [playing, speed]);

  useEffect(() => {
    return () => cancelAnimationFrame(animRef.current);
  }, []);

  const exportFrame = useCallback(() => {
    const canvas = previewCanvasRef.current;
    if (!canvas) return;
    canvas.toBlob((blob) => {
      if (blob) downloadBlob(blob, `morph_${t.toFixed(2)}.png`);
    });
  }, [t]);

  return (
    <ModalWrapper onClose={onClose} title="Image Morphing" size="max-w-2xl">
      <div className="flex max-h-[70vh] flex-col gap-4 overflow-y-auto pr-1">
        <div className="flex gap-4">
          <div className="flex-1">
            <p className="mb-1 text-xs opacity-60">Source</p>
            <Dropzone accept="image/*" onFile={handleSrcFile} />
          </div>
          <div className="flex-1">
            <p className="mb-1 text-xs opacity-60">Target</p>
            <Dropzone accept="image/*" onFile={handleTgtFile} />
          </div>
        </div>

        {srcFile && tgtFile && (
          <>
            <div className="flex justify-center gap-2">
              <canvas
                ref={srcCanvasRef}
                className="border-base-300 cursor-crosshair rounded border"
                onMouseDown={handleMouseDown(true)}
                onMouseMove={handleMouseMove(true)}
                onMouseUp={handleMouseUp}
                onMouseLeave={handleMouseUp}
              />
              <canvas
                ref={tgtCanvasRef}
                className="border-base-300 cursor-crosshair rounded border"
                onMouseDown={handleMouseDown(false)}
                onMouseMove={handleMouseMove(false)}
                onMouseUp={handleMouseUp}
                onMouseLeave={handleMouseUp}
              />
            </div>

            <div className="flex items-center gap-3 text-sm">
              <span>Grid:</span>
              <input
                type="number"
                min={2}
                max={16}
                value={gridRows}
                onChange={(e) =>
                  setGridRows(Math.max(2, Math.min(16, Number(e.target.value))))
                }
                className="input input-bordered input-xs w-14 text-center"
              />
              <span>×</span>
              <input
                type="number"
                min={2}
                max={16}
                value={gridCols}
                onChange={(e) =>
                  setGridCols(Math.max(2, Math.min(16, Number(e.target.value))))
                }
                className="input input-bordered input-xs w-14 text-center"
              />
              <button className="btn btn-ghost btn-xs" onClick={resetGrids}>
                Reset
              </button>
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-xs opacity-60">
                Morph: {t.toFixed(2)}
              </label>
              <div className="flex items-center gap-2">
                <input
                  type="range"
                  min={0}
                  max={1}
                  step={0.01}
                  value={t}
                  onChange={(e) => {
                    cancelAnimationFrame(animRef.current);
                    setPlaying(false);
                    setT(Number(e.target.value));
                  }}
                  className="range range-sm flex-1"
                />
                <button
                  className={`btn btn-sm ${playing ? 'btn-error' : 'btn-primary'}`}
                  onClick={play}>
                  {playing ? '■' : '▶'}
                </button>
                <select
                  className="select select-bordered select-xs w-18"
                  value={speed}
                  onChange={(e) => setSpeed(Number(e.target.value))}>
                  <option value={1}>1s</option>
                  <option value={2}>2s</option>
                  <option value={3}>3s</option>
                  <option value={5}>5s</option>
                </select>
              </div>
            </div>

            <div className="flex justify-center">
              <canvas
                ref={previewCanvasRef}
                className="border-base-300 max-w-full rounded border"
                style={{
                  maxHeight: 320,
                  aspectRatio:
                    outSize.w > 0 ? `${outSize.w}/${outSize.h}` : 'auto',
                }}
              />
            </div>

            <button className="btn btn-primary btn-sm" onClick={exportFrame}>
              Export Frame
            </button>
          </>
        )}

        <p className="text-center text-xs opacity-40">
          Drag yellow grid points on source/target to align features
        </p>
      </div>
    </ModalWrapper>
  );
};
ImageMorphingModal.displayName = 'ImageMorphingModal';
