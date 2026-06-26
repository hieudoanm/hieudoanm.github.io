'use client';

import { FC, useState, useCallback, useRef } from 'react';
import { ModalWrapper } from '@hieudoanm.github.io/components/atoms/ModalWrapper';

type Tab = 'shadow' | 'watermark' | 'dominant-color';

const TAB_LABELS: Record<Tab, string> = {
  shadow: 'Drop Shadow',
  watermark: 'Watermark',
  'dominant-color': 'Dominant Color',
};

const downloadBlob = (blob: Blob, name: string) => {
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = name;
  a.click();
  URL.revokeObjectURL(url);
};

function getDominantColor(
  ctx: CanvasRenderingContext2D,
  w: number,
  h: number
): string {
  const data = ctx.getImageData(0, 0, w, h).data;
  let r = 0,
    g = 0,
    b = 0,
    count = 0;
  for (let i = 0; i < data.length; i += 16) {
    r += data[i];
    g += data[i + 1];
    b += data[i + 2];
    count++;
  }
  r = Math.round(r / count);
  g = Math.round(g / count);
  b = Math.round(b / count);
  return `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`;
}

function getColorPalette(
  ctx: CanvasRenderingContext2D,
  w: number,
  h: number,
  count: number
): string[] {
  const data = ctx.getImageData(0, 0, w, h).data;
  const colorMap = new Map<string, number>();
  for (let i = 0; i < data.length; i += 12) {
    const r = Math.round(data[i] / 32) * 32;
    const g = Math.round(data[i + 1] / 32) * 32;
    const b = Math.round(data[i + 2] / 32) * 32;
    const key = `${r},${g},${b}`;
    colorMap.set(key, (colorMap.get(key) || 0) + 1);
  }
  return [...colorMap.entries()]
    .sort((a, b) => b[1] - a[1])
    .slice(0, count)
    .map(([key]) => {
      const [r, g, b] = key.split(',').map(Number);
      return `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`;
    });
}

export const ImageEffectModal: FC<{ onClose: () => void }> = ({ onClose }) => {
  const [tab, setTab] = useState<Tab>('shadow');
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [shadowColor, setShadowColor] = useState('#000000');
  const [shadowBlur, setShadowBlur] = useState(10);
  const [shadowOffset, setShadowOffset] = useState(5);
  const [watermarkText, setWatermarkText] = useState('');
  const [watermarkOpacity, setWatermarkOpacity] = useState(0.5);
  const [watermarkPos, setWatermarkPos] = useState<
    'bottom-right' | 'bottom-left' | 'top-right' | 'top-left' | 'center'
  >('bottom-right');
  const [dominantResult, setDominantResult] = useState('');
  const [palette, setPalette] = useState<string[]>([]);
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

    if (tab === 'dominant-color') {
      canvas.width = img.width;
      canvas.height = img.height;
      ctx.drawImage(img, 0, 0);
      const dominant = getDominantColor(ctx, canvas.width, canvas.height);
      const pal = getColorPalette(ctx, canvas.width, canvas.height, 8);
      setDominantResult(dominant);
      setPalette(pal);
      canvas.toBlob((blob) => {
        if (blob) downloadBlob(blob, `dominant_${file.name}`);
        setLoading(false);
      });
      return;
    }

    if (tab === 'shadow') {
      canvas.width = img.width + shadowBlur * 2 + Math.abs(shadowOffset);
      canvas.height = img.height + shadowBlur * 2 + Math.abs(shadowOffset);
      ctx.shadowColor = shadowColor;
      ctx.shadowBlur = shadowBlur;
      ctx.shadowOffsetX = shadowOffset;
      ctx.shadowOffsetY = shadowOffset;
      ctx.drawImage(img, shadowBlur, shadowBlur);
    }

    if (tab === 'watermark') {
      canvas.width = img.width;
      canvas.height = img.height;
      ctx.drawImage(img, 0, 0);
      ctx.globalAlpha = watermarkOpacity;
      ctx.fillStyle = '#fff';
      ctx.font = `bold ${Math.max(16, canvas.width / 20)}px sans-serif`;
      ctx.textAlign = 'center';
      ctx.strokeStyle = '#000';
      ctx.lineWidth = 2;
      const positions: Record<string, [number, number]> = {
        'bottom-right': [canvas.width - 20, canvas.height - 20],
        'bottom-left': [20, canvas.height - 20],
        'top-right': [canvas.width - 20, 30],
        'top-left': [20, 30],
        center: [canvas.width / 2, canvas.height / 2],
      };
      const [px, py] = positions[watermarkPos] || positions['bottom-right'];
      ctx.textBaseline = watermarkPos.includes('top') ? 'top' : 'bottom';
      const align = watermarkPos.includes('left')
        ? 'left'
        : watermarkPos.includes('right')
          ? 'right'
          : 'center';
      ctx.textAlign = align as CanvasTextAlign;
      ctx.strokeText(watermarkText, px, py);
      ctx.fillText(watermarkText, px, py);
      ctx.globalAlpha = 1;
    }

    canvas.toBlob((blob) => {
      if (blob) downloadBlob(blob, `${tab}_${file!.name}`);
      setLoading(false);
    });
  }, [
    file,
    tab,
    shadowColor,
    shadowBlur,
    shadowOffset,
    watermarkText,
    watermarkOpacity,
    watermarkPos,
  ]);

  return (
    <ModalWrapper onClose={onClose} title="Image Effects">
      <div role="tablist" className="tabs tabs-boxed mb-4 w-full">
        {(Object.keys(TAB_LABELS) as Tab[]).map((t) => (
          <button
            key={t}
            role="tab"
            className={`tab flex-1 ${tab === t ? 'tab-active' : ''}`}
            onClick={() => setTab(t)}>
            {TAB_LABELS[t]}
          </button>
        ))}
      </div>
      <div className="flex flex-col gap-4">
        {tab !== 'dominant-color' && (
          <input
            type="file"
            accept="image/*"
            className="file-input file-input-bordered"
            onChange={(e) => setFile(e.target.files?.[0] || null)}
          />
        )}

        {tab === 'shadow' && (
          <>
            <label className="flex items-center gap-2 text-sm">
              Color:{' '}
              <input
                type="color"
                value={shadowColor}
                onChange={(e) => setShadowColor(e.target.value)}
              />
            </label>
            <label className="flex flex-col gap-1 text-sm">
              Blur: {shadowBlur}
              <input
                type="range"
                min={0}
                max={40}
                value={shadowBlur}
                onChange={(e) => setShadowBlur(Number(e.target.value))}
              />
            </label>
            <label className="flex flex-col gap-1 text-sm">
              Offset: {shadowOffset}
              <input
                type="range"
                min={0}
                max={30}
                value={shadowOffset}
                onChange={(e) => setShadowOffset(Number(e.target.value))}
              />
            </label>
          </>
        )}

        {tab === 'watermark' && (
          <>
            <input
              type="text"
              className="input input-bordered"
              placeholder="Watermark text"
              value={watermarkText}
              onChange={(e) => setWatermarkText(e.target.value)}
            />
            <label className="flex flex-col gap-1 text-sm">
              Opacity: {Math.round(watermarkOpacity * 100)}%
              <input
                type="range"
                min={0.1}
                max={1}
                step={0.05}
                value={watermarkOpacity}
                onChange={(e) => setWatermarkOpacity(Number(e.target.value))}
              />
            </label>
            <select
              className="select select-bordered select-sm"
              value={watermarkPos}
              onChange={(e) =>
                setWatermarkPos(e.target.value as typeof watermarkPos)
              }>
              <option value="bottom-right">Bottom Right</option>
              <option value="bottom-left">Bottom Left</option>
              <option value="top-right">Top Right</option>
              <option value="top-left">Top Left</option>
              <option value="center">Center</option>
            </select>
          </>
        )}

        {tab === 'dominant-color' && (
          <>
            <input
              type="file"
              accept="image/*"
              className="file-input file-input-bordered"
              onChange={async (e) => {
                const f = e.target.files?.[0];
                if (f) {
                  setFile(f);
                }
              }}
            />
            {dominantResult && (
              <div className="bg-base-200 space-y-2 rounded p-4 text-sm">
                <div className="flex items-center gap-2">
                  <span className="font-bold">Dominant:</span>
                  <span
                    className="h-6 w-6 rounded border"
                    style={{ backgroundColor: dominantResult }}
                  />
                  <span>{dominantResult}</span>
                </div>
                <div>
                  <span className="font-bold">Palette:</span>
                </div>
                <div className="flex flex-wrap gap-1">
                  {palette.map((c, i) => (
                    <span
                      key={i}
                      className="h-8 w-8 rounded border"
                      style={{ backgroundColor: c }}
                      title={c}
                    />
                  ))}
                </div>
              </div>
            )}
          </>
        )}

        {tab !== 'dominant-color' && (
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
        )}

        <canvas ref={canvasRef} className="hidden" />
      </div>
    </ModalWrapper>
  );
};
ImageEffectModal.displayName = 'ImageEffectModal';
