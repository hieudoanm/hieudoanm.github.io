'use client';

import { FC, useCallback, useEffect, useRef, useState } from 'react';
import { Dropzone } from '@hieudoanm.github.io/components/atoms';
import { ImageToolConfig } from '../config';
import { downloadBlob, loadImage } from '../lib/canvas';

export const ImageMorphingTool: FC<{ config: ImageToolConfig }> = () => {
  const [srcFile, setSrcFile] = useState<File | null>(null);
  const [tgtFile, setTgtFile] = useState<File | null>(null);
  const [t, setT] = useState(0.5);
  const [loading, setLoading] = useState(false);
  const srcImgRef = useRef<HTMLImageElement | null>(null);
  const tgtImgRef = useRef<HTMLImageElement | null>(null);
  const previewCanvasRef = useRef<HTMLCanvasElement>(null);

  const redraw = useCallback(() => {
    const src = srcImgRef.current;
    const tgt = tgtImgRef.current;
    const canvas = previewCanvasRef.current;
    if (!src || !tgt || !canvas) return;
    const w = Math.max(src.naturalWidth, tgt.naturalWidth);
    const h = Math.max(src.naturalHeight, tgt.naturalHeight);
    canvas.width = w;
    canvas.height = h;
    const ctx = canvas.getContext('2d')!;
    const c1 = document.createElement('canvas');
    c1.width = w;
    c1.height = h;
    const ctx1 = c1.getContext('2d')!;
    ctx1.drawImage(src, 0, 0);
    const srcData = ctx1.getImageData(0, 0, w, h);
    const c2 = document.createElement('canvas');
    c2.width = w;
    c2.height = h;
    const ctx2 = c2.getContext('2d')!;
    ctx2.drawImage(tgt, 0, 0);
    const tgtData = ctx2.getImageData(0, 0, w, h);
    const out = ctx.createImageData(w, h);
    for (let i = 0; i < out.data.length; i += 4) {
      out.data[i] = srcData.data[i] * (1 - t) + tgtData.data[i] * t;
      out.data[i + 1] = srcData.data[i + 1] * (1 - t) + tgtData.data[i + 1] * t;
      out.data[i + 2] = srcData.data[i + 2] * (1 - t) + tgtData.data[i + 2] * t;
      out.data[i + 3] = 255;
    }
    ctx.putImageData(out, 0, 0);
  }, [t]);

  useEffect(() => {
    if (srcImgRef.current && tgtImgRef.current) redraw();
  }, [t, redraw]);

  const handleSrcFile = useCallback(async (f: File) => {
    if (!f) return;
    setSrcFile(f);
    const img = await loadImage(f);
    srcImgRef.current = img;
  }, []);

  const handleTgtFile = useCallback(async (f: File) => {
    if (!f) return;
    setTgtFile(f);
    const img = await loadImage(f);
    tgtImgRef.current = img;
  }, []);

  const exportFrame = useCallback(async () => {
    const canvas = previewCanvasRef.current;
    if (!canvas) return;
    setLoading(true);
    canvas.toBlob((blob) => {
      if (blob) downloadBlob(blob, `morph_${t.toFixed(2)}.png`);
      setLoading(false);
    });
  }, [t]);

  return (
    <div className="flex flex-col gap-4">
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
          <label className="flex flex-col gap-1 text-sm">
            Morph Progress: {(t * 100).toFixed(0)}%
            <input
              type="range"
              min={0}
              max={1}
              step={0.01}
              value={t}
              onChange={(e) => setT(Number(e.target.value))}
            />
          </label>
          <div className="flex justify-center">
            <canvas
              ref={previewCanvasRef}
              className="border-base-300 max-w-full rounded border"
              style={{ maxHeight: 320 }}
            />
          </div>
          <button
            className="btn btn-primary btn-sm"
            disabled={loading}
            onClick={exportFrame}>
            {loading ? (
              <span className="loading loading-spinner" />
            ) : (
              'Export Frame'
            )}
          </button>
        </>
      )}
    </div>
  );
};
ImageMorphingTool.displayName = 'ImageMorphingTool';
