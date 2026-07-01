'use client';

import { FC, useState, useCallback, useRef } from 'react';
import { ModalWrapper } from '@hieudoanm.github.io/components/atoms/ModalWrapper';
import { STYLES, SIZES, ASPECTS, downloadBlob, generatePattern } from './utils';

export const AiGenerateModal: FC<{ onClose: () => void }> = ({ onClose }) => {
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
    <ModalWrapper onClose={onClose} title="AI Generate" size="max-w-lg">
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
    </ModalWrapper>
  );
};
AiGenerateModal.displayName = 'AiGenerateModal';
