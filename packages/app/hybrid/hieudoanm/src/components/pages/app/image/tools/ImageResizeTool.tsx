'use client';

import { FC, useCallback, useRef, useState } from 'react';
import { Dropzone } from '@hieudoanm.github.io/components/atoms';
import { ImageToolConfig } from '../config';
import { downloadBlob, loadImage } from '../lib/canvas';

export const ImageResizeTool: FC<{ config: ImageToolConfig }> = ({
  config,
}) => {
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [width, setWidth] = useState(0);
  const [height, setHeight] = useState(0);
  const [maintainAspect, setMaintainAspect] = useState(true);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const handleFile = useCallback((f: File) => {
    setFile(f);
    const img = new Image();
    img.onload = () => {
      setWidth(img.width);
      setHeight(img.height);
    };
    img.src = URL.createObjectURL(f);
  }, []);

  const processImage = useCallback(async () => {
    if (!file) return;
    setLoading(true);
    const img = await loadImage(file);
    const canvas = document.createElement('canvas');
    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext('2d')!;
    ctx.drawImage(img, 0, 0, width, height);
    canvas.toBlob((blob) => {
      if (blob) downloadBlob(blob, `resized_${file.name}`);
      setLoading(false);
    }, file.type || 'image/png');
  }, [file, width, height]);

  return (
    <div className="flex flex-col gap-4">
      <div className="rounded-box border-base-300 bg-base-200 border p-4">
        <div className="flex flex-col gap-4">
          <Dropzone accept="image/*" onFile={(f) => handleFile(f)} />
          {file && (
            <>
              <div className="flex gap-2">
                <label className="flex flex-1 flex-col gap-1">
                  <span className="text-xs">Width:</span>
                  <input
                    type="number"
                    className="input input-bordered input-sm"
                    value={width}
                    onChange={(e) => {
                      const w = Number(e.target.value);
                      setWidth(w);
                      if (maintainAspect && height)
                        setHeight(Math.round(w * (height / width)));
                    }}
                  />
                </label>
                <label className="flex flex-1 flex-col gap-1">
                  <span className="text-xs">Height:</span>
                  <input
                    type="number"
                    className="input input-bordered input-sm"
                    value={height}
                    onChange={(e) => {
                      const h = Number(e.target.value);
                      setHeight(h);
                      if (maintainAspect && width)
                        setWidth(Math.round(h * (width / height)));
                    }}
                  />
                </label>
              </div>
              <label className="flex items-center gap-2 text-sm">
                <input
                  type="checkbox"
                  checked={maintainAspect}
                  onChange={(e) => setMaintainAspect(e.target.checked)}
                />
                Maintain aspect ratio
              </label>
              <button
                className="btn btn-primary btn-sm"
                disabled={loading}
                onClick={processImage}>
                {loading ? (
                  <span className="loading loading-spinner" />
                ) : (
                  'Resize & Download'
                )}
              </button>
            </>
          )}
        </div>
        <canvas ref={canvasRef} className="hidden" />
      </div>
    </div>
  );
};
ImageResizeTool.displayName = 'ImageResizeTool';
