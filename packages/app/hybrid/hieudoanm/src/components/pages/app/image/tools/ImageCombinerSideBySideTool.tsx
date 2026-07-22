'use client';

import { FC, useCallback, useRef, useState } from 'react';
import { Dropzone } from '@hieudoanm.github.io/components/atoms';
import { ImageToolConfig } from '../config';
import { downloadBlob, loadImage } from '../lib/canvas';

export const ImageCombinerSideBySideTool: FC<{
  config: ImageToolConfig;
}> = () => {
  const [file1, setFile1] = useState<File | null>(null);
  const [file2, setFile2] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const handleCombine = useCallback(async () => {
    if (!file1 || !file2) return;
    setLoading(true);
    const [img1, img2] = await Promise.all([
      loadImage(file1),
      loadImage(file2),
    ]);
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext('2d')!;
    const gap = 10;
    const totalW = img1.width + gap + img2.width;
    const maxH = Math.max(img1.height, img2.height);
    canvas.width = totalW;
    canvas.height = maxH;
    ctx.drawImage(img1, 0, 0);
    ctx.drawImage(img2, img1.width + gap, 0);
    canvas.toBlob((blob) => {
      if (blob) downloadBlob(blob, 'combined.side-by-side.png');
      setLoading(false);
    });
  }, [file1, file2]);

  return (
    <div className="flex flex-col gap-4">
      <div className="flex gap-4">
        <div className="flex-1">
          <p className="mb-1 text-xs opacity-60">Image 1</p>
          <Dropzone accept="image/*" onFile={(f) => setFile1(f)} />
        </div>
        <div className="flex-1">
          <p className="mb-1 text-xs opacity-60">Image 2</p>
          <Dropzone accept="image/*" onFile={(f) => setFile2(f)} />
        </div>
      </div>
      <button
        className="btn btn-primary btn-sm"
        disabled={!file1 || !file2 || loading}
        onClick={handleCombine}>
        {loading ? (
          <span className="loading loading-spinner" />
        ) : (
          'Combine Side by Side'
        )}
      </button>
      <canvas ref={canvasRef} className="hidden" />
    </div>
  );
};
ImageCombinerSideBySideTool.displayName = 'ImageCombinerSideBySideTool';
