'use client';

import { FC, useState, useRef, useCallback } from 'react';
import { ModalWrapper } from '@hieudoanm.github.io/components/atoms/ModalWrapper';

type Tab =
  | 'resize'
  | 'crop'
  | 'compress'
  | 'flip'
  | 'grayscale'
  | 'pixelate'
  | 'sharpen'
  | 'border'
  | 'round'
  | 'text';

const TAB_LABELS: Record<Tab, string> = {
  resize: 'Resize',
  crop: 'Crop',
  compress: 'Compress',
  flip: 'Flip',
  grayscale: 'B&W',
  pixelate: 'Pixelate',
  sharpen: 'Sharpen',
  border: 'Border',
  round: 'Round',
  text: 'Text',
};

const downloadBlob = (blob: Blob, name: string) => {
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = name;
  a.click();
  URL.revokeObjectURL(url);
};

function applyConvolution(
  ctx: CanvasRenderingContext2D,
  w: number,
  h: number,
  kernel: number[]
) {
  const imgData = ctx.getImageData(0, 0, w, h);
  const out = ctx.createImageData(w, h);
  const k = kernel;
  for (let y = 1; y < h - 1; y++) {
    for (let x = 1; x < w - 1; x++) {
      let r = 0,
        g = 0,
        b = 0,
        idx = 0;
      for (let ky = -1; ky <= 1; ky++) {
        for (let kx = -1; kx <= 1; kx++) {
          const px = (y + ky) * w + (x + kx);
          const ki = idx++;
          r += imgData.data[px * 4] * k[ki];
          g += imgData.data[px * 4 + 1] * k[ki];
          b += imgData.data[px * 4 + 2] * k[ki];
        }
      }
      const oi = (y * w + x) * 4;
      out.data[oi] = Math.min(255, Math.max(0, r));
      out.data[oi + 1] = Math.min(255, Math.max(0, g));
      out.data[oi + 2] = Math.min(255, Math.max(0, b));
      out.data[oi + 3] = 255;
    }
  }
  ctx.putImageData(out, 0, 0);
}

export const ImageEditModal: FC<{ onClose: () => void }> = ({ onClose }) => {
  const [tab, setTab] = useState<Tab>('resize');
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [previewUrl, setPreviewUrl] = useState('');
  const [quality, setQuality] = useState(0.7);
  const [originalSize, setOriginalSize] = useState(0);
  const [compressedSize, setCompressedSize] = useState(0);
  const [width, setWidth] = useState(0);
  const [height, setHeight] = useState(0);
  const [maintainAspect, setMaintainAspect] = useState(true);
  const [cropX, setCropX] = useState(0);
  const [cropY, setCropY] = useState(0);
  const [cropW, setCropW] = useState(100);
  const [cropH, setCropH] = useState(100);
  const [pixelSize, setPixelSize] = useState(5);
  const [borderWidth, setBorderWidth] = useState(5);
  const [borderColor, setBorderColor] = useState('#000000');
  const [textContent, setTextContent] = useState('');
  const [textSize, setTextSize] = useState(24);
  const [textColor, setTextColor] = useState('#ffffff');
  const [textX, setTextX] = useState(10);
  const [textY, setTextY] = useState(50);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const loadImage = useCallback((f: File) => {
    setFile(f);
    setOriginalSize(f.size);
    setPreviewUrl(URL.createObjectURL(f));
    const img = new Image();
    img.onload = () => {
      setWidth(img.width);
      setHeight(img.height);
    };
    img.src = URL.createObjectURL(f);
  }, []);

  const processImage = useCallback(
    async (
      transform: (ctx: CanvasRenderingContext2D, img: HTMLImageElement) => void,
      mime = 'image/png',
      q?: number
    ) => {
      if (!file) return;
      setLoading(true);
      const img = await new Promise<HTMLImageElement>((res, rej) => {
        const i = new Image();
        i.onload = () => res(i);
        i.onerror = rej;
        i.src = URL.createObjectURL(file);
      });
      const canvas = document.createElement('canvas');
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext('2d')!;
      transform(ctx, img);
      canvas.toBlob(
        (blob) => {
          if (blob) {
            downloadBlob(blob, `edited_${file.name}`);
            setCompressedSize(blob.size);
          }
          setLoading(false);
        },
        mime,
        q
      );
    },
    [file]
  );

  return (
    <ModalWrapper onClose={onClose} title="Image Edit" size="max-w-lg">
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
        {tab !== 'compress' && (
          <input
            type="file"
            accept="image/*"
            className="file-input file-input-bordered"
            onChange={(e) => {
              const f = e.target.files?.[0];
              if (f) loadImage(f);
            }}
          />
        )}

        {tab === 'resize' && file && (
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
              onClick={() =>
                processImage((ctx, img) => {
                  ctx.drawImage(img, 0, 0, width, height);
                }, file.type || 'image/png')
              }>
              {loading ? (
                <span className="loading loading-spinner" />
              ) : (
                'Resize & Download'
              )}
            </button>
          </>
        )}

        {tab === 'crop' && file && (
          <>
            <div className="grid grid-cols-2 gap-2">
              <label className="flex flex-col gap-1">
                <span className="text-xs">X:</span>
                <input
                  type="number"
                  className="input input-bordered input-sm"
                  value={cropX}
                  onChange={(e) => setCropX(Number(e.target.value))}
                />
              </label>
              <label className="flex flex-col gap-1">
                <span className="text-xs">Y:</span>
                <input
                  type="number"
                  className="input input-bordered input-sm"
                  value={cropY}
                  onChange={(e) => setCropY(Number(e.target.value))}
                />
              </label>
              <label className="flex flex-col gap-1">
                <span className="text-xs">Width:</span>
                <input
                  type="number"
                  className="input input-bordered input-sm"
                  value={cropW}
                  onChange={(e) => setCropW(Number(e.target.value))}
                />
              </label>
              <label className="flex flex-col gap-1">
                <span className="text-xs">Height:</span>
                <input
                  type="number"
                  className="input input-bordered input-sm"
                  value={cropH}
                  onChange={(e) => setCropH(Number(e.target.value))}
                />
              </label>
            </div>
            <button
              className="btn btn-primary btn-sm"
              disabled={loading}
              onClick={() =>
                processImage((ctx, img) => {
                  ctx.drawImage(
                    img,
                    cropX,
                    cropY,
                    cropW,
                    cropH,
                    0,
                    0,
                    cropW,
                    cropH
                  );
                })
              }>
              {loading ? (
                <span className="loading loading-spinner" />
              ) : (
                'Crop & Download'
              )}
            </button>
          </>
        )}

        {tab === 'compress' && (
          <>
            <input
              type="file"
              accept="image/*"
              className="file-input file-input-bordered"
              onChange={(e) => {
                const f = e.target.files?.[0];
                if (f) {
                  loadImage(f);
                  setCompressedSize(0);
                }
              }}
            />
            <label className="flex flex-col gap-1">
              <span className="text-sm">Quality: {quality.toFixed(1)}</span>
              <input
                type="range"
                min={0.1}
                max={1}
                step={0.1}
                value={quality}
                onChange={(e) => setQuality(Number(e.target.value))}
                className="range range-sm"
              />
            </label>
            <button
              className="btn btn-primary btn-sm"
              disabled={!file || loading}
              onClick={() =>
                processImage(
                  (ctx, img) => {
                    ctx.drawImage(img, 0, 0);
                  },
                  'image/jpeg',
                  quality
                )
              }>
              {loading ? (
                <span className="loading loading-spinner" />
              ) : (
                'Compress & Download'
              )}
            </button>
            {compressedSize > 0 && (
              <div className="bg-base-200 rounded p-3 text-sm">
                <p>Original: {(originalSize / 1024).toFixed(1)} KB</p>
                <p>Compressed: {(compressedSize / 1024).toFixed(1)} KB</p>
                <p>
                  Reduction:{' '}
                  {((1 - compressedSize / originalSize) * 100).toFixed(1)}%
                </p>
              </div>
            )}
          </>
        )}

        {tab === 'flip' && file && (
          <div className="flex gap-2">
            <button
              className="btn btn-primary btn-sm"
              disabled={loading}
              onClick={() =>
                processImage((ctx, img) => {
                  ctx.scale(-1, 1);
                  ctx.drawImage(img, -img.width, 0);
                })
              }>
              {loading ? (
                <span className="loading loading-spinner" />
              ) : (
                'Flip Horizontal'
              )}
            </button>
            <button
              className="btn btn-primary btn-sm"
              disabled={loading}
              onClick={() =>
                processImage((ctx, img) => {
                  ctx.scale(1, -1);
                  ctx.drawImage(img, 0, -img.height);
                })
              }>
              {loading ? (
                <span className="loading loading-spinner" />
              ) : (
                'Flip Vertical'
              )}
            </button>
          </div>
        )}

        {tab === 'grayscale' && file && (
          <button
            className="btn btn-primary btn-sm"
            disabled={loading}
            onClick={() =>
              processImage((ctx, img) => {
                ctx.filter = 'grayscale(100%)';
                ctx.drawImage(img, 0, 0);
              })
            }>
            {loading ? (
              <span className="loading loading-spinner" />
            ) : (
              'Convert to B&W'
            )}
          </button>
        )}

        {tab === 'pixelate' && file && (
          <>
            <label className="flex flex-col gap-1">
              <span className="text-sm">Pixel size: {pixelSize}</span>
              <input
                type="range"
                min={2}
                max={20}
                value={pixelSize}
                onChange={(e) => setPixelSize(Number(e.target.value))}
                className="range range-sm"
              />
            </label>
            <button
              className="btn btn-primary btn-sm"
              disabled={loading}
              onClick={() =>
                processImage((ctx, img) => {
                  const w = img.width,
                    h = img.height;
                  ctx.imageSmoothingEnabled = false;
                  ctx.drawImage(img, 0, 0, w / pixelSize, h / pixelSize);
                  ctx.drawImage(
                    ctx.canvas,
                    0,
                    0,
                    w / pixelSize,
                    h / pixelSize,
                    0,
                    0,
                    w,
                    h
                  );
                })
              }>
              {loading ? (
                <span className="loading loading-spinner" />
              ) : (
                'Pixelate & Download'
              )}
            </button>
          </>
        )}

        {tab === 'sharpen' && file && (
          <button
            className="btn btn-primary btn-sm"
            disabled={loading}
            onClick={() =>
              processImage((ctx, img) => {
                ctx.drawImage(img, 0, 0);
                applyConvolution(
                  ctx,
                  img.width,
                  img.height,
                  [0, -1, 0, -1, 5, -1, 0, -1, 0]
                );
              })
            }>
            {loading ? (
              <span className="loading loading-spinner" />
            ) : (
              'Sharpen & Download'
            )}
          </button>
        )}

        {tab === 'border' && file && (
          <>
            <div className="flex gap-2">
              <label className="flex flex-1 flex-col gap-1">
                <span className="text-xs">Border width:</span>
                <input
                  type="number"
                  className="input input-bordered input-sm"
                  min={1}
                  value={borderWidth}
                  onChange={(e) => setBorderWidth(Number(e.target.value))}
                />
              </label>
              <label className="flex flex-1 flex-col gap-1">
                <span className="text-xs">Color:</span>
                <input
                  type="color"
                  className="input input-bordered input-sm h-10"
                  value={borderColor}
                  onChange={(e) => setBorderColor(e.target.value)}
                />
              </label>
            </div>
            <button
              className="btn btn-primary btn-sm"
              disabled={loading}
              onClick={() =>
                processImage((ctx, img) => {
                  const bw = borderWidth;
                  ctx.canvas.width = img.width + bw * 2;
                  ctx.canvas.height = img.height + bw * 2;
                  ctx.fillStyle = borderColor;
                  ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);
                  ctx.drawImage(img, bw, bw);
                })
              }>
              {loading ? (
                <span className="loading loading-spinner" />
              ) : (
                'Add Border'
              )}
            </button>
          </>
        )}

        {tab === 'round' && file && (
          <button
            className="btn btn-primary btn-sm"
            disabled={loading}
            onClick={() =>
              processImage((ctx, img) => {
                const cx = img.width / 2,
                  cy = img.height / 2,
                  r = Math.min(cx, cy);
                ctx.beginPath();
                ctx.arc(cx, cy, r, 0, Math.PI * 2);
                ctx.closePath();
                ctx.clip();
                ctx.drawImage(img, 0, 0);
              })
            }>
            {loading ? (
              <span className="loading loading-spinner" />
            ) : (
              'Make Round'
            )}
          </button>
        )}

        {tab === 'text' && file && (
          <>
            <input
              type="text"
              className="input input-bordered input-sm"
              placeholder="Text to overlay"
              value={textContent}
              onChange={(e) => setTextContent(e.target.value)}
            />
            <div className="flex gap-2">
              <label className="flex flex-1 flex-col gap-1">
                <span className="text-xs">Size:</span>
                <input
                  type="number"
                  className="input input-bordered input-sm"
                  min={8}
                  value={textSize}
                  onChange={(e) => setTextSize(Number(e.target.value))}
                />
              </label>
              <label className="flex flex-1 flex-col gap-1">
                <span className="text-xs">Color:</span>
                <input
                  type="color"
                  className="input input-bordered input-sm h-10"
                  value={textColor}
                  onChange={(e) => setTextColor(e.target.value)}
                />
              </label>
            </div>
            <div className="flex gap-2">
              <label className="flex flex-1 flex-col gap-1">
                <span className="text-xs">X:</span>
                <input
                  type="number"
                  className="input input-bordered input-sm"
                  value={textX}
                  onChange={(e) => setTextX(Number(e.target.value))}
                />
              </label>
              <label className="flex flex-1 flex-col gap-1">
                <span className="text-xs">Y:</span>
                <input
                  type="number"
                  className="input input-bordered input-sm"
                  value={textY}
                  onChange={(e) => setTextY(Number(e.target.value))}
                />
              </label>
            </div>
            <button
              className="btn btn-primary btn-sm"
              disabled={!textContent || loading}
              onClick={() =>
                processImage((ctx, img) => {
                  ctx.drawImage(img, 0, 0);
                  ctx.fillStyle = textColor;
                  ctx.font = `${textSize}px sans-serif`;
                  ctx.fillText(textContent, textX, textY);
                })
              }>
              {loading ? (
                <span className="loading loading-spinner" />
              ) : (
                'Add Text'
              )}
            </button>
          </>
        )}
      </div>
    </ModalWrapper>
  );
};
