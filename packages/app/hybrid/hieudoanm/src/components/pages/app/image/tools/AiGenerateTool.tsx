'use client';

import { FC, useState, useCallback, useRef } from 'react';
import { ImageToolConfig } from '../config';
import { downloadBlob, loadImage } from '../lib/canvas';

const STYLES = [
  'Realistic',
  'Anime',
  'Oil Painting',
  'Watercolor',
  'Pixel Art',
  'Sketch',
  '3D Render',
  'Cyberpunk',
];

const SIZES = ['256×256', '512×512', '1024×1024'];

const generatePattern = (
  ctx: CanvasRenderingContext2D,
  w: number,
  h: number,
  prompt: string
) => {
  const seed = prompt.split('').reduce((s, c) => s + c.charCodeAt(0), 0);
  const rng = (max: number) =>
    (((seed * 9301 + 49297) % 233280) / 233280) * max;

  ctx.fillStyle = `hsl(${seed % 360}, 30%, 15%)`;
  ctx.fillRect(0, 0, w, h);

  const count = 20 + (seed % 30);
  for (let i = 0; i < count; i++) {
    const cx = rng(w);
    const cy = rng(h);
    const radius = 20 + rng(Math.min(w, h) * 0.3);
    const hue = (seed + i * 37) % 360;
    const sat = 50 + rng(50);
    const lig = 40 + rng(30);
    const grad = ctx.createRadialGradient(cx, cy, 0, cx, cy, radius);
    grad.addColorStop(0, `hsla(${hue}, ${sat}%, ${lig}%, 0.4)`);
    grad.addColorStop(1, 'transparent');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, w, h);
  }

  for (let i = 0; i < count * 2; i++) {
    const x = rng(w);
    const y = rng(h);
    const size = 1 + rng(3);
    ctx.fillStyle = `hsla(${(seed + i * 53) % 360}, 70%, 60%, 0.3)`;
    ctx.beginPath();
    ctx.arc(x, y, size, 0, Math.PI * 2);
    ctx.fill();
  }
};

export const AiGenerateTool: FC<{ config: ImageToolConfig }> = ({ config }) => {
  const [prompt, setPrompt] = useState('');
  const [style, setStyle] = useState('Realistic');
  const [size, setSize] = useState('512×512');
  const [loading, setLoading] = useState(false);
  const [generated, setGenerated] = useState(false);
  const [negativePrompt, setNegativePrompt] = useState('');
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const handleGenerate = useCallback(async () => {
    if (!prompt.trim()) return;
    setLoading(true);
    setGenerated(false);
    await new Promise((r) => setTimeout(r, 800));
    const [sw, sh] = size.split('×').map(Number);
    const canvas = canvasRef.current!;
    canvas.width = sw;
    canvas.height = sh;
    const ctx = canvas.getContext('2d')!;

    const styleSeed = STYLES.indexOf(style);
    ctx.filter =
      styleSeed === 2
        ? 'blur(1px)'
        : styleSeed === 4
          ? 'contrast(200%) brightness(80%)'
          : styleSeed === 5
            ? 'grayscale(100%) contrast(150%)'
            : styleSeed === 0
              ? 'saturate(120%) contrast(110%)'
              : 'none';

    generatePattern(ctx, sw, sh, prompt + style);

    ctx.filter = 'none';
    setGenerated(true);
    setLoading(false);
  }, [prompt, style, size]);

  const handleDownload = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    canvas.toBlob((blob) => {
      if (blob)
        downloadBlob(
          blob,
          `generated_${prompt.slice(0, 20).replace(/\s+/g, '_')}.png`
        );
    });
  }, [prompt]);

  return (
    <div className="flex flex-col gap-4">
      <textarea
        placeholder="Describe the image you want to generate..."
        className="textarea textarea-bordered h-20 text-sm"
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
      />

      <div>
        <p className="text-base-content/40 mb-1 text-[10px] font-normal tracking-widest uppercase">
          Style
        </p>
        <div className="flex flex-wrap gap-1">
          {STYLES.map((s) => (
            <button
              key={s}
              className={`btn btn-xs ${style === s ? 'btn-primary' : 'btn-ghost'}`}
              onClick={() => setStyle(s)}>
              {s}
            </button>
          ))}
        </div>
      </div>

      <div className="flex gap-4">
        <div className="flex-1">
          <p className="text-base-content/40 mb-1 text-[10px] font-normal tracking-widest uppercase">
            Size
          </p>
          <div className="flex gap-1">
            {SIZES.map((s) => (
              <button
                key={s}
                className={`btn btn-xs flex-1 ${size === s ? 'btn-primary' : 'btn-ghost'}`}
                onClick={() => setSize(s)}>
                {s}
              </button>
            ))}
          </div>
        </div>
      </div>

      <textarea
        placeholder="Negative prompt (optional) — things to avoid..."
        className="textarea textarea-bordered h-12 text-xs"
        value={negativePrompt}
        onChange={(e) => setNegativePrompt(e.target.value)}
      />

      <button
        className="btn btn-primary btn-sm"
        disabled={!prompt.trim() || loading}
        onClick={handleGenerate}>
        {loading ? <span className="loading loading-spinner" /> : 'Generate'}
      </button>

      {generated && (
        <div className="flex flex-col items-center gap-2">
          <canvas
            ref={canvasRef}
            className="max-h-64 w-full rounded object-contain"
          />
          <button className="btn btn-outline btn-sm" onClick={handleDownload}>
            Download
          </button>
        </div>
      )}

      {!generated && <canvas ref={canvasRef} className="hidden" />}
    </div>
  );
};
AiGenerateTool.displayName = 'AiGenerateTool';
