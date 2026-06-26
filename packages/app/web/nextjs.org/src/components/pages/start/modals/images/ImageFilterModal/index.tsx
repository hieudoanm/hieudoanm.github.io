'use client';

import { FC, useState, useCallback, useRef } from 'react';
import { ModalWrapper } from '@hieudoanm.github.io/components/atoms/ModalWrapper';

type Tab =
  | 'colorize'
  | 'transparent'
  | 'filters'
  | 'adjust'
  | 'rotate'
  | 'vignette';

const TAB_LABELS: Record<Tab, string> = {
  colorize: 'Colorize',
  transparent: 'Transparent BG',
  filters: 'Photo Filters',
  adjust: 'Adjust',
  rotate: 'Rotate',
  vignette: 'Vignette',
};

const FILTERS = [
  'sepia',
  'vintage',
  'invert',
  'grayscale',
  'warm',
  'cool',
] as const;

const downloadBlob = (blob: Blob, name: string) => {
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = name;
  a.click();
  URL.revokeObjectURL(url);
};

function applyFilter(
  ctx: CanvasRenderingContext2D,
  w: number,
  h: number,
  filter: string
) {
  const data = ctx.getImageData(0, 0, w, h);
  const d = data.data;
  for (let i = 0; i < d.length; i += 4) {
    const r = d[i],
      g = d[i + 1],
      b = d[i + 2];
    switch (filter) {
      case 'sepia': {
        d[i] = Math.min(255, r * 0.393 + g * 0.769 + b * 0.189);
        d[i + 1] = Math.min(255, r * 0.349 + g * 0.686 + b * 0.168);
        d[i + 2] = Math.min(255, r * 0.272 + g * 0.534 + b * 0.131);
        break;
      }
      case 'vintage': {
        d[i] = Math.min(255, r * 0.55 + g * 0.55 + b * 0.15);
        d[i + 1] = Math.min(255, r * 0.35 + g * 0.6 + b * 0.1);
        d[i + 2] = Math.min(255, r * 0.2 + g * 0.4 + b * 0.3);
        break;
      }
      case 'invert': {
        d[i] = 255 - r;
        d[i + 1] = 255 - g;
        d[i + 2] = 255 - b;
        break;
      }
      case 'grayscale': {
        const gray = 0.299 * r + 0.587 * g + 0.114 * b;
        d[i] = gray;
        d[i + 1] = gray;
        d[i + 2] = gray;
        break;
      }
      case 'warm': {
        d[i] = Math.min(255, r * 1.2);
        d[i + 2] = Math.max(0, b * 0.8);
        break;
      }
      case 'cool': {
        d[i + 2] = Math.min(255, b * 1.2);
        d[i] = Math.max(0, r * 0.8);
        break;
      }
    }
  }
  ctx.putImageData(data, 0, 0);
}

function colorize(
  ctx: CanvasRenderingContext2D,
  w: number,
  h: number,
  color: string,
  intensity: number
) {
  ctx.fillStyle = color;
  ctx.globalAlpha = intensity;
  ctx.fillRect(0, 0, w, h);
  ctx.globalAlpha = 1;
}

function chromaKey(
  ctx: CanvasRenderingContext2D,
  w: number,
  h: number,
  target: string,
  threshold: number
) {
  const imgData = ctx.getImageData(0, 0, w, h);
  const d = imgData.data;
  const tR = parseInt(target.slice(1, 3), 16);
  const tG = parseInt(target.slice(3, 5), 16);
  const tB = parseInt(target.slice(5, 7), 16);
  for (let i = 0; i < d.length; i += 4) {
    const dist = Math.sqrt(
      (d[i] - tR) ** 2 + (d[i + 1] - tG) ** 2 + (d[i + 2] - tB) ** 2
    );
    if (dist < threshold) d[i + 3] = 0;
  }
  ctx.putImageData(imgData, 0, 0);
}

function applyVignette(
  ctx: CanvasRenderingContext2D,
  w: number,
  h: number,
  strength: number
) {
  const imgData = ctx.getImageData(0, 0, w, h);
  const d = imgData.data;
  const cx = w / 2,
    cy = h / 2;
  const maxDist = Math.sqrt(cx * cx + cy * cy);
  for (let y = 0; y < h; y++) {
    for (let x = 0; x < w; x++) {
      const dist = Math.sqrt((x - cx) ** 2 + (y - cy) ** 2);
      const factor = 1 - (dist / maxDist) * strength;
      const idx = (y * w + x) * 4;
      d[idx] *= factor;
      d[idx + 1] *= factor;
      d[idx + 2] *= factor;
    }
  }
  ctx.putImageData(imgData, 0, 0);
}

export const ImageFilterModal: FC<{ onClose: () => void }> = ({ onClose }) => {
  const [tab, setTab] = useState<Tab>('colorize');
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [tintColor, setTintColor] = useState('#ff6b6b');
  const [intensity, setIntensity] = useState(0.3);
  const [keyColor, setKeyColor] = useState('#00ff00');
  const [threshold, setThreshold] = useState(100);
  const [selectedFilter, setSelectedFilter] = useState<string>('sepia');
  const [brightness, setBrightness] = useState(0);
  const [contrast, setContrast] = useState(0);
  const [saturation, setSaturation] = useState(0);
  const [rotateAngle, setRotateAngle] = useState(90);
  const [vignetteStrength, setVignetteStrength] = useState(0.5);
  const canvasRef = useRef<HTMLCanvasElement>(null);

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

    if (tab === 'rotate') {
      const angle = (rotateAngle * Math.PI) / 180;
      const cos = Math.abs(Math.cos(angle));
      const sin = Math.abs(Math.sin(angle));
      canvas.width = img.width * cos + img.height * sin;
      canvas.height = img.width * sin + img.height * cos;
      ctx.translate(canvas.width / 2, canvas.height / 2);
      ctx.rotate(angle);
      ctx.drawImage(img, -img.width / 2, -img.height / 2);
      ctx.setTransform(1, 0, 0, 1, 0, 0);
    } else if (tab === 'adjust') {
      canvas.width = img.width;
      canvas.height = img.height;
      ctx.drawImage(img, 0, 0);
      const data = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const d = data.data;
      for (let i = 0; i < d.length; i += 4) {
        let r = d[i] + brightness * 255;
        let g = d[i + 1] + brightness * 255;
        let b = d[i + 2] + brightness * 255;
        const cf =
          (259 * (contrast * 255 + 255)) / (255 * (259 - contrast * 255));
        r = cf * (r - 128) + 128;
        g = cf * (g - 128) + 128;
        b = cf * (b - 128) + 128;
        const gray = 0.299 * r + 0.587 * g + 0.114 * b;
        d[i] = Math.min(255, Math.max(0, gray + (r - gray) * (1 + saturation)));
        d[i + 1] = Math.min(
          255,
          Math.max(0, gray + (g - gray) * (1 + saturation))
        );
        d[i + 2] = Math.min(
          255,
          Math.max(0, gray + (b - gray) * (1 + saturation))
        );
      }
      ctx.putImageData(data, 0, 0);
    } else {
      canvas.width = img.width;
      canvas.height = img.height;
      ctx.drawImage(img, 0, 0);

      switch (tab) {
        case 'colorize':
          colorize(ctx, canvas.width, canvas.height, tintColor, intensity);
          break;
        case 'transparent':
          chromaKey(ctx, canvas.width, canvas.height, keyColor, threshold);
          break;
        case 'filters':
          applyFilter(ctx, canvas.width, canvas.height, selectedFilter);
          break;
        case 'vignette':
          applyVignette(ctx, canvas.width, canvas.height, vignetteStrength);
          break;
      }
    }

    canvas.toBlob((blob) => {
      if (blob) downloadBlob(blob, `${tab}_${file!.name}`);
      setLoading(false);
    });
  }, [
    file,
    tab,
    tintColor,
    intensity,
    keyColor,
    threshold,
    selectedFilter,
    brightness,
    contrast,
    saturation,
    rotateAngle,
    vignetteStrength,
  ]);

  return (
    <ModalWrapper onClose={onClose} title="Image Filters">
      <div role="tablist" className="tabs tabs-boxed mb-4 w-full flex-wrap">
        {(Object.keys(TAB_LABELS) as Tab[]).map((t) => (
          <button
            key={t}
            role="tab"
            className={`tab ${tab === t ? 'tab-active' : ''}`}
            onClick={() => setTab(t)}>
            {TAB_LABELS[t]}
          </button>
        ))}
      </div>
      <div className="flex flex-col gap-4">
        <input
          type="file"
          accept="image/*"
          className="file-input file-input-bordered"
          onChange={(e) => setFile(e.target.files?.[0] || null)}
        />

        {tab === 'colorize' && (
          <>
            <label className="flex items-center gap-2 text-sm">
              Color:{' '}
              <input
                type="color"
                value={tintColor}
                onChange={(e) => setTintColor(e.target.value)}
              />
            </label>
            <label className="flex flex-col gap-1 text-sm">
              Intensity: {Math.round(intensity * 100)}%
              <input
                type="range"
                min={0}
                max={1}
                step={0.05}
                value={intensity}
                onChange={(e) => setIntensity(Number(e.target.value))}
              />
            </label>
          </>
        )}

        {tab === 'transparent' && (
          <>
            <label className="flex items-center gap-2 text-sm">
              Key Color:{' '}
              <input
                type="color"
                value={keyColor}
                onChange={(e) => setKeyColor(e.target.value)}
              />
            </label>
            <label className="flex flex-col gap-1 text-sm">
              Threshold: {threshold}
              <input
                type="range"
                min={10}
                max={200}
                value={threshold}
                onChange={(e) => setThreshold(Number(e.target.value))}
              />
            </label>
          </>
        )}

        {tab === 'filters' && (
          <div className="flex flex-wrap gap-2">
            {FILTERS.map((f) => (
              <button
                key={f}
                className={`btn btn-sm ${selectedFilter === f ? 'btn-primary' : 'btn-ghost'}`}
                onClick={() => setSelectedFilter(f)}>
                {f}
              </button>
            ))}
          </div>
        )}

        {tab === 'adjust' && (
          <>
            {['brightness', 'contrast', 'saturation'].map((name) => {
              const val =
                name === 'brightness'
                  ? brightness
                  : name === 'contrast'
                    ? contrast
                    : saturation;
              const set =
                name === 'brightness'
                  ? setBrightness
                  : name === 'contrast'
                    ? setContrast
                    : setSaturation;
              return (
                <label key={name} className="flex flex-col gap-1 text-sm">
                  {name.charAt(0).toUpperCase() + name.slice(1)}:{' '}
                  {val > 0 ? '+' : ''}
                  {(val * 100).toFixed(0)}
                  <input
                    type="range"
                    min={-1}
                    max={1}
                    step={0.05}
                    value={val}
                    onChange={(e) => set(Number(e.target.value))}
                  />
                </label>
              );
            })}
          </>
        )}

        {tab === 'rotate' && (
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
        )}

        {tab === 'vignette' && (
          <label className="flex flex-col gap-1 text-sm">
            Strength: {Math.round(vignetteStrength * 100)}%
            <input
              type="range"
              min={0}
              max={1}
              step={0.05}
              value={vignetteStrength}
              onChange={(e) => setVignetteStrength(Number(e.target.value))}
            />
          </label>
        )}

        <button
          className="btn btn-primary btn-sm"
          disabled={!file || loading}
          onClick={process}>
          {loading ? (
            <span className="loading loading-spinner" />
          ) : (
            `Apply ${TAB_LABELS[tab]}`
          )}
        </button>
        <canvas ref={canvasRef} className="hidden" />
      </div>
    </ModalWrapper>
  );
};
