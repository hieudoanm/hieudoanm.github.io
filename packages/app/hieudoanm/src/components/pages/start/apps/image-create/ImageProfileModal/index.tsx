'use client';

import { FC, useState, useRef, useCallback } from 'react';
import { Dropzone, FullScreen } from '@hieudoanm.github.io/components/atoms';
import { Platform, PLATFORMS, downloadBlob } from './utils';

export const ImageProfileModal: FC<{ onClose: () => void }> = ({ onClose }) => {
  const [file, setFile] = useState<File | null>(null);
  const [platform, setPlatform] = useState<Platform>('linkedin');
  const [loading, setLoading] = useState(false);
  const [offsetX, setOffsetX] = useState(0);
  const [offsetY, setOffsetY] = useState(0);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const current = PLATFORMS.find((p) => p.id === platform)!;

  const process = useCallback(async () => {
    if (!file) return;
    setLoading(true);
    const img = await new Promise<HTMLImageElement>((res, rej) => {
      const i = new Image();
      i.onload = () => res(i);
      i.onerror = rej;
      i.src = URL.createObjectURL(file);
    });
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext('2d')!;
    const size = current.size;
    canvas.width = size;
    canvas.height = size;

    const scale = Math.max(size / img.width, size / img.height);
    const sw = img.width * scale;
    const sh = img.height * scale;
    const sx = (size - sw) / 2 + offsetX;
    const sy = (size - sh) / 2 + offsetY;

    ctx.beginPath();
    ctx.arc(size / 2, size / 2, size / 2, 0, Math.PI * 2);
    ctx.clip();
    ctx.drawImage(img, sx, sy, sw, sh);

    canvas.toBlob((blob) => {
      if (blob) downloadBlob(blob, `${platform}_profile_${file!.name}`);
      setLoading(false);
    });
  }, [file, platform, offsetX, offsetY, current]);

  return (
    <FullScreen onClose={onClose} title="Profile Photo Maker">
      <div className="flex flex-col gap-4">
        <Dropzone accept="image/*" onFile={(f) => setFile(f)} />
        <div className="flex flex-wrap gap-2">
          {PLATFORMS.map((p) => (
            <button
              key={p.id}
              className={`btn btn-sm ${platform === p.id ? 'btn-primary' : 'btn-ghost'}`}
              onClick={() => setPlatform(p.id)}>
              {p.label} <span className="text-xs opacity-60">{p.desc}</span>
            </button>
          ))}
        </div>
        <div className="flex gap-4">
          <label className="flex flex-1 flex-col gap-1 text-sm">
            Offset X: {offsetX}
            <input
              type="range"
              min={-100}
              max={100}
              value={offsetX}
              onChange={(e) => setOffsetX(Number(e.target.value))}
            />
          </label>
          <label className="flex flex-1 flex-col gap-1 text-sm">
            Offset Y: {offsetY}
            <input
              type="range"
              min={-100}
              max={100}
              value={offsetY}
              onChange={(e) => setOffsetY(Number(e.target.value))}
            />
          </label>
        </div>
        <button
          className="btn btn-primary btn-sm"
          disabled={!file || loading}
          onClick={process}>
          {loading ? (
            <span className="loading loading-spinner" />
          ) : (
            `Generate ${current.label} Photo`
          )}
        </button>
        <canvas ref={canvasRef} className="hidden" />
      </div>
    </FullScreen>
  );
};
ImageProfileModal.displayName = 'ImageProfileModal';
