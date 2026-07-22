'use client';

import { FC, useState, useCallback, useRef } from 'react';
import { Dropzone } from '@hieudoanm.github.io/components/atoms';
import { ImageToolConfig } from '../config';
import { downloadBlob, loadImage } from '../lib/canvas';

export const ImageRotateTool: FC<{ config: ImageToolConfig }> = ({
  config,
}) => {
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [rotateAngle, setRotateAngle] = useState(90);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const process = useCallback(async () => {
    if (!file) return;
    setLoading(true);
    const img = await loadImage(file);
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext('2d')!;
    const angle = (rotateAngle * Math.PI) / 180;
    const cos = Math.abs(Math.cos(angle));
    const sin = Math.abs(Math.sin(angle));
    canvas.width = img.width * cos + img.height * sin;
    canvas.height = img.width * sin + img.height * cos;
    ctx.translate(canvas.width / 2, canvas.height / 2);
    ctx.rotate(angle);
    ctx.drawImage(img, -img.width / 2, -img.height / 2);
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    canvas.toBlob((blob) => {
      if (blob) downloadBlob(blob, `rotate_${file.name}`);
      setLoading(false);
    });
  }, [file, rotateAngle]);

  return (
    <div className="flex flex-col gap-4">
      <div className="rounded-box border-base-300 bg-base-200 border p-4">
        <div className="flex flex-col gap-4">
          <Dropzone accept="image/*" onFile={(f) => setFile(f)} />
          <div className="flex items-center gap-2 text-sm">
            <label>Angle°:</label>
            <input
              type="number"
              className="input input-bordered input-sm w-24"
              min={-360}
              max={360}
              value={rotateAngle}
              onChange={(e) => setRotateAngle(Number(e.target.value))}
            />
            <button
              className="btn btn-ghost btn-xs"
              onClick={() => setRotateAngle(90)}>
              90°
            </button>
            <button
              className="btn btn-ghost btn-xs"
              onClick={() => setRotateAngle(180)}>
              180°
            </button>
            <button
              className="btn btn-ghost btn-xs"
              onClick={() => setRotateAngle(270)}>
              270°
            </button>
          </div>
          <button
            className="btn btn-primary btn-sm"
            disabled={!file || loading}
            onClick={process}>
            {loading ? (
              <span className="loading loading-spinner" />
            ) : (
              'Apply Rotate'
            )}
          </button>
          <canvas ref={canvasRef} className="hidden" />
        </div>
      </div>
    </div>
  );
};
ImageRotateTool.displayName = 'ImageRotateTool';
