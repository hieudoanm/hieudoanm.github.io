'use client';

import { FC, useState, useCallback, useRef } from 'react';
import { ModalWrapper } from '@hieudoanm.github.io/components/atoms/ModalWrapper';

type Tab = 'side-by-side' | 'stacked';

const TAB_LABELS: Record<Tab, string> = {
  'side-by-side': 'Side by Side',
  stacked: 'Stack Vertically',
};

const downloadBlob = (blob: Blob, name: string) => {
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = name;
  a.click();
  URL.revokeObjectURL(url);
};

export const ImageCombinerModal: FC<{ onClose: () => void }> = ({
  onClose,
}) => {
  const [tab, setTab] = useState<Tab>('side-by-side');
  const [files, setFiles] = useState<File[]>([]);
  const [loading, setLoading] = useState(false);
  const [gap, setGap] = useState(10);
  const [bgColor, setBgColor] = useState('#ffffff');
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const handleCombine = useCallback(async () => {
    if (files.length < 2) return;
    setLoading(true);
    const imgs = await Promise.all(
      files.map(
        (f) =>
          new Promise<HTMLImageElement>((res, rej) => {
            const i = new Image();
            i.onload = () => res(i);
            i.onerror = rej;
            i.src = URL.createObjectURL(f);
          })
      )
    );
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext('2d')!;

    if (tab === 'side-by-side') {
      const totalW =
        imgs.reduce((s, img) => s + img.width, 0) + gap * (imgs.length - 1);
      const maxH = Math.max(...imgs.map((img) => img.height));
      canvas.width = totalW;
      canvas.height = maxH;
      ctx.fillStyle = bgColor;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      let x = 0;
      for (const img of imgs) {
        const y = (maxH - img.height) / 2;
        ctx.drawImage(img, x, y, img.width, img.height);
        x += img.width + gap;
      }
    } else {
      const maxW = Math.max(...imgs.map((img) => img.width));
      const totalH =
        imgs.reduce((s, img) => s + img.height, 0) + gap * (imgs.length - 1);
      canvas.width = maxW;
      canvas.height = totalH;
      ctx.fillStyle = bgColor;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      let y = 0;
      for (const img of imgs) {
        const x = (maxW - img.width) / 2;
        ctx.drawImage(img, x, y, img.width, img.height);
        y += img.height + gap;
      }
    }

    canvas.toBlob((blob) => {
      if (blob)
        downloadBlob(
          blob,
          `combined.${tab === 'side-by-side' ? 'horizontal' : 'vertical'}.png`
        );
      setLoading(false);
    });
  }, [files, tab, gap, bgColor]);

  return (
    <ModalWrapper onClose={onClose} title="Image Combiner">
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
        <input
          type="file"
          accept="image/*"
          multiple
          className="file-input file-input-bordered"
          onChange={(e) => setFiles(Array.from(e.target.files ?? []))}
        />
        {files.length > 0 && (
          <p className="text-sm">{files.length} image(s) selected (min 2)</p>
        )}
        <div className="flex items-center gap-4 text-sm">
          <label>
            Gap:{' '}
            <input
              type="number"
              className="input input-bordered input-sm w-16"
              min={0}
              max={100}
              value={gap}
              onChange={(e) => setGap(Number(e.target.value))}
            />
          </label>
          <label>
            BG:{' '}
            <input
              type="color"
              className="h-8 w-8 cursor-pointer rounded"
              value={bgColor}
              onChange={(e) => setBgColor(e.target.value)}
            />
          </label>
        </div>
        <button
          className="btn btn-primary btn-sm"
          disabled={files.length < 2 || loading}
          onClick={handleCombine}>
          {loading ? (
            <span className="loading loading-spinner" />
          ) : (
            'Combine Images'
          )}
        </button>
        <canvas ref={canvasRef} className="hidden" />
      </div>
    </ModalWrapper>
  );
};
