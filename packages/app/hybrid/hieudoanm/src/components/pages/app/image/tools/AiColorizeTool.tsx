'use client';

import { FC, useState, useCallback, useRef } from 'react';
import { Dropzone } from '@hieudoanm.github.io/components/atoms';
import { ImageToolConfig } from '../config';
import { downloadBlob, loadImage } from '../lib/canvas';

export const AiColorizeTool: FC<{ config: ImageToolConfig }> = ({ config }) => {
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [hue, setHue] = useState(0);
  const [saturation, setSaturation] = useState(0.5);
  const [lightness, setLightness] = useState(0);
  const [colorizeMode, setColorizeMode] = useState<'solid' | 'gradient'>(
    'solid'
  );
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const process = useCallback(async () => {
    if (!file) return;
    setLoading(true);
    const img = await loadImage(file);
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext('2d')!;
    canvas.width = img.width;
    canvas.height = img.height;
    ctx.drawImage(img, 0, 0);
    const data = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const d = data.data;
    for (let i = 0; i < d.length; i += 4) {
      const gray = 0.299 * d[i] + 0.587 * d[i + 1] + 0.114 * d[i + 2];
      const h = colorizeMode === 'gradient' ? (i / d.length) * 360 : hue;
      const hr = ((h % 360) / 360) * 6;
      const c = (1 - Math.abs(2 * lightness - 1)) * saturation;
      const x = c * (1 - Math.abs((hr % 2) - 1));
      let r1 = 0,
        g1 = 0,
        b1 = 0;
      if (hr < 1) {
        r1 = c;
        g1 = x;
      } else if (hr < 2) {
        r1 = x;
        g1 = c;
      } else if (hr < 3) {
        g1 = c;
        b1 = x;
      } else if (hr < 4) {
        g1 = x;
        b1 = c;
      } else if (hr < 5) {
        r1 = x;
        b1 = c;
      } else {
        r1 = c;
        b1 = x;
      }
      const m = lightness - c / 2;
      d[i] = Math.min(255, Math.max(0, (gray + (r1 + m) * 255) / 2));
      d[i + 1] = Math.min(255, Math.max(0, (gray + (g1 + m) * 255) / 2));
      d[i + 2] = Math.min(255, Math.max(0, (gray + (b1 + m) * 255) / 2));
    }
    ctx.putImageData(data, 0, 0);
    canvas.toBlob((blob) => {
      if (blob) downloadBlob(blob, `colorized_${file.name}`);
      setLoading(false);
    });
  }, [file, hue, saturation, lightness, colorizeMode]);

  return (
    <div className="flex flex-col gap-4">
      <Dropzone accept="image/*" onFile={(f) => setFile(f)} />

      <div className="flex gap-2">
        <button
          className={`btn btn-sm flex-1 ${colorizeMode === 'solid' ? 'btn-primary' : 'btn-ghost'}`}
          onClick={() => setColorizeMode('solid')}>
          Solid Color
        </button>
        <button
          className={`btn btn-sm flex-1 ${colorizeMode === 'gradient' ? 'btn-primary' : 'btn-ghost'}`}
          onClick={() => setColorizeMode('gradient')}>
          Gradient
        </button>
      </div>

      {colorizeMode === 'solid' && (
        <label className="flex items-center gap-3 text-sm">
          <span className="w-16">Hue:</span>
          <input
            type="range"
            min={0}
            max={360}
            value={hue}
            onChange={(e) => setHue(Number(e.target.value))}
            className="range range-xs flex-1"
          />
          <span className="font-mono text-xs">{hue}°</span>
        </label>
      )}

      <label className="flex items-center gap-3 text-sm">
        <span className="w-16">Saturation:</span>
        <input
          type="range"
          min={0}
          max={1}
          step={0.05}
          value={saturation}
          onChange={(e) => setSaturation(Number(e.target.value))}
          className="range range-xs flex-1"
        />
        <span className="font-mono text-xs">
          {Math.round(saturation * 100)}%
        </span>
      </label>

      <label className="flex items-center gap-3 text-sm">
        <span className="w-16">Lightness:</span>
        <input
          type="range"
          min={0}
          max={1}
          step={0.05}
          value={lightness}
          onChange={(e) => setLightness(Number(e.target.value))}
          className="range range-xs flex-1"
        />
        <span className="font-mono text-xs">
          {Math.round(lightness * 100)}%
        </span>
      </label>

      <div className="flex items-center gap-2 text-sm">
        <span className="w-16">Preview:</span>
        <span
          className="inline-block h-6 w-full rounded border"
          style={{
            backgroundColor:
              colorizeMode === 'solid'
                ? `hsl(${hue}, ${saturation * 100}%, ${lightness * 50 + 25}%)`
                : 'linear-gradient(to right, hsl(0,100%,50%), hsl(360,100%,50%))',
          }}
        />
      </div>

      <button
        className="btn btn-primary btn-sm"
        disabled={!file || loading}
        onClick={process}>
        {loading ? (
          <span className="loading loading-spinner" />
        ) : (
          'Apply Colorize'
        )}
      </button>
      <canvas ref={canvasRef} className="hidden" />
    </div>
  );
};
AiColorizeTool.displayName = 'AiColorizeTool';
