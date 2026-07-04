import { FC, useCallback, useEffect, useRef, useState } from 'react';
import { Dropzone, FullScreen } from '@hieudoanm.github.io/components/atoms';

import { FilterDef } from './types';
import { FILTERS } from './constants';
import { renderToCanvas } from './utils/render';

export const InstaSizeModal: FC<{ onClose: () => void }> = ({ onClose }) => {
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [padding, setPadding] = useState(10);
  const [selectedFilter, setSelectedFilter] = useState<FilterDef>(FILTERS[0]);
  const [outputUrl, setOutputUrl] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const processImage = useCallback(
    (src: string, pad: number, filter: FilterDef) => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      renderToCanvas(canvas, src, pad, filter.css, (url) => {
        setOutputUrl(url);
        setIsProcessing(false);
      });
    },
    []
  );

  useEffect(() => {
    if (imageSrc) {
      setIsProcessing(true);
      processImage(imageSrc, padding, selectedFilter);
    }
  }, [imageSrc, padding, selectedFilter, processImage]);

  const handleFile = (file: File) => {
    if (!file.type.startsWith('image/')) return;
    const reader = new FileReader();
    reader.onload = (e) => {
      setImageSrc(e.target?.result as string);
      setOutputUrl(null);
    };
    reader.readAsDataURL(file);
  };

  const filterColor = (label: string) => {
    const map: Record<string, string> = {
      None: '#aaa',
      Grayscale: '#888',
      Radio: '#888',
      Obsidian: '#888',
      Twenties: '#888',
      Sepia: '#c9a86c',
      Vintage: '#c9a86c',
      Golden: '#c9a86c',
      Firenze: '#c9a86c',
      Marine: '#3b82f6',
      Oceanic: '#3b82f6',
      Liquid: '#3b82f6',
      Rosetint: '#c084fc',
      Mauve: '#c084fc',
      Pastel: '#f9a8d4',
      Lofi: '#374151',
    };
    return map[label] ?? '#6b7280';
  };

  return (
    <FullScreen onClose={onClose} title="InstaSize">
      <div className="min-h-[400px]">
        {!imageSrc ? (
          <Dropzone accept="image/*" onFile={handleFile} />
        ) : (
          <div className="grid grid-cols-1 items-start gap-8 lg:grid-cols-[1fr_260px_220px]">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-base-content/60 text-xs font-normal tracking-widest uppercase">
                  Preview
                </h2>
                <button
                  className="btn btn-ghost btn-xs text-base-content/40 hover:text-base-content"
                  onClick={() => {
                    setImageSrc(null);
                    setOutputUrl(null);
                    setPadding(10);
                    setSelectedFilter(FILTERS[0]);
                  }}>
                  ✕ Clear
                </button>
              </div>
              <div className="bg-base-200 relative flex aspect-square items-center justify-center overflow-hidden rounded-2xl shadow-inner">
                {isProcessing && (
                  <div className="bg-base-100/60 absolute inset-0 z-10 flex items-center justify-center rounded-2xl backdrop-blur-sm">
                    <span className="loading loading-spinner loading-md text-primary" />
                  </div>
                )}
                {outputUrl ? (
                  <img
                    src={outputUrl}
                    alt="Preview"
                    loading="lazy"
                    className="h-full w-full rounded-xl object-contain"
                  />
                ) : (
                  <span className="loading loading-spinner loading-md text-primary" />
                )}
              </div>
              <p className="text-base-content/40 text-center text-[10px]">
                White fill shown — your download will be pure white
              </p>
            </div>
            <div className="space-y-5">
              <h2 className="text-base-content/60 text-xs font-normal tracking-widest uppercase">
                Padding
              </h2>
              <div className="card bg-base-200/60 space-y-5 rounded-2xl p-5">
                <div className="flex items-end justify-between">
                  <div>
                    <p className="text-base-content text-4xl font-normal tabular-nums">
                      {padding}
                      <span className="text-base-content/40 ml-1 text-xl font-normal">
                        %
                      </span>
                    </p>
                    <p className="text-base-content/40 mt-1 text-xs">
                      white border
                    </p>
                  </div>
                  <div className="text-base-content/40 space-y-0.5 text-right text-xs">
                    <p>0% → tight</p>
                    <p>50% → max</p>
                  </div>
                </div>
                <div className="space-y-2">
                  <input
                    type="range"
                    min={0}
                    max={50}
                    value={padding}
                    onChange={(e) => setPadding(Number(e.target.value))}
                    className="range range-primary range-sm w-full"
                  />
                  <div className="text-base-content/30 flex justify-between px-0.5 text-xs">
                    {[0, 10, 20, 30, 40, 50].map((n) => (
                      <span key={n}>{n}</span>
                    ))}
                  </div>
                </div>
                <div className="flex flex-wrap gap-2">
                  {[0, 5, 10, 20, 30].map((p) => (
                    <button
                      key={p}
                      onClick={() => setPadding(p)}
                      className={`btn btn-xs rounded-full px-3 transition-all ${padding === p ? 'btn-primary' : 'btn-ghost border-base-300 border'}`}>
                      {p}%
                    </button>
                  ))}
                </div>
              </div>
              <div className="space-y-2 pt-2">
                <button
                  onClick={() => {
                    if (!outputUrl) return;
                    const a = document.createElement('a');
                    a.href = outputUrl;
                    a.download = 'instasize.png';
                    a.click();
                  }}
                  disabled={!outputUrl || isProcessing}
                  className="btn btn-neutral h-12 w-full gap-2 rounded-xl text-sm font-normal">
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8">
                    <path d="M8 2v8M5 7l3 3 3-3M2 12v1a1 1 0 001 1h10a1 1 0 001-1v-1" />
                  </svg>
                  Download PNG
                </button>
                <button
                  onClick={() => setImageSrc(null)}
                  className="btn btn-ghost text-base-content/50 h-10 w-full rounded-xl text-sm">
                  Upload different image
                </button>
              </div>
              <div className="bg-base-200/40 border-base-300/50 space-y-1.5 rounded-xl border p-4">
                <p className="text-base-content/50 text-[10px] font-normal tracking-wider uppercase">
                  Output
                </p>
                <div className="text-base-content/40 space-y-0.5 text-[10px]">
                  <p>Format: PNG (lossless)</p>
                  <p>Background: #FFFFFF</p>
                  <p>Aspect: 1:1 square</p>
                  <p>Filter: {selectedFilter.label}</p>
                </div>
              </div>
            </div>
            <div className="space-y-5">
              <h2 className="text-base-content/60 text-xs font-normal tracking-widest uppercase">
                Filter
              </h2>
              <div className="card bg-base-200/60 rounded-2xl p-4">
                <div className="flex max-h-[400px] flex-col gap-1.5 overflow-y-auto pr-1">
                  {FILTERS.map((f) => (
                    <button
                      key={f.label}
                      onClick={() => setSelectedFilter(f)}
                      className={`flex items-center gap-3 rounded-xl px-3 py-2.5 text-left text-sm transition-all ${selectedFilter.label === f.label ? 'bg-primary text-primary-content font-normal' : 'hover:bg-base-300 text-base-content/70'}`}>
                      <span
                        className="h-5 w-5 shrink-0 rounded-md border border-white/10"
                        style={{ background: filterColor(f.label) }}
                      />
                      {f.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
      <canvas ref={canvasRef} className="hidden" />
    </FullScreen>
  );
};
InstaSizeModal.displayName = 'InstaSizeModal';
