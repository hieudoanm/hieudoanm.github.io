'use client';

import { FC, useState, useCallback, useRef } from 'react';
import { ModalWrapper } from '@hieudoanm.github.io/components/atoms/ModalWrapper';

type Tab = 'chart' | 'meme' | 'collage' | 'split';

const TAB_LABELS: Record<Tab, string> = {
  chart: 'Chart Maker',
  meme: 'Meme Maker',
  collage: 'Collage Maker',
  split: 'Image Splitter',
};

const COLORS = [
  '#3b82f6',
  '#ef4444',
  '#10b981',
  '#f59e0b',
  '#8b5cf6',
  '#ec4899',
  '#06b6d4',
  '#84cc16',
];

const downloadBlob = (blob: Blob, name: string) => {
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = name;
  a.click();
  URL.revokeObjectURL(url);
};

export const ImageCreateModal: FC<{ onClose: () => void }> = ({ onClose }) => {
  const [tab, setTab] = useState<Tab>('chart');
  const [loading, setLoading] = useState(false);
  const [imageFiles, setImageFiles] = useState<File[]>([]);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [chartLabels, setChartLabels] = useState('A,B,C,D');
  const [chartValues, setChartValues] = useState('10,25,15,30');
  const [chartTitle, setChartTitle] = useState('My Chart');
  const [memeText, setMemeText] = useState('');
  const [memeFile, setMemeFile] = useState<File | null>(null);
  const [splitRows, setSplitRows] = useState(2);
  const [splitCols, setSplitCols] = useState(2);

  const handleChart = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    setLoading(true);
    const ctx = canvas.getContext('2d')!;
    canvas.width = 600;
    canvas.height = 400;
    const labels = chartLabels.split(',').map((s) => s.trim());
    const values = chartValues.split(',').map(Number);
    const maxVal = Math.max(...values, 1);

    ctx.fillStyle = '#fff';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = '#000';
    ctx.font = 'bold 18px sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText(chartTitle, canvas.width / 2, 30);

    const barWidth = (canvas.width - 100) / labels.length;
    values.forEach((v, i) => {
      const barHeight = (v / maxVal) * 250;
      const x = 50 + i * barWidth;
      const y = canvas.height - 60 - barHeight;
      ctx.fillStyle = COLORS[i % COLORS.length];
      ctx.fillRect(x + 5, y, barWidth - 10, barHeight);
      ctx.fillStyle = '#000';
      ctx.font = '12px sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText(labels[i] || '', x + barWidth / 2, canvas.height - 40);
      ctx.fillText(String(v), x + barWidth / 2, y - 5);
    });

    canvas.toBlob((blob) => {
      if (blob) downloadBlob(blob, 'chart.png');
      setLoading(false);
    });
  }, [chartLabels, chartValues, chartTitle]);

  const handleMeme = useCallback(async () => {
    if (!memeFile) return;
    setLoading(true);
    const img = await new Promise<HTMLImageElement>((res, rej) => {
      const i = new Image();
      i.onload = () => res(i);
      i.onerror = rej;
      i.src = URL.createObjectURL(memeFile);
    });
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext('2d')!;
    canvas.width = img.width;
    canvas.height = img.height;

    ctx.drawImage(img, 0, 0);
    ctx.fillStyle = '#000';
    ctx.fillRect(0, 0, canvas.width, 60);
    ctx.fillRect(0, canvas.height - 60, canvas.width, 60);
    ctx.fillStyle = '#fff';
    ctx.font = `bold ${canvas.width / 25}px Impact, sans-serif`;
    ctx.textAlign = 'center';
    ctx.strokeStyle = '#000';
    ctx.lineWidth = 3;

    const lines = memeText.split('\n');
    if (lines[0]) {
      ctx.textBaseline = 'top';
      ctx.strokeText(lines[0], canvas.width / 2, 10);
      ctx.fillText(lines[0], canvas.width / 2, 10);
    }
    if (lines[1]) {
      ctx.textBaseline = 'bottom';
      ctx.strokeText(lines[1], canvas.width / 2, canvas.height - 10);
      ctx.fillText(lines[1], canvas.width / 2, canvas.height - 10);
    }

    canvas.toBlob((blob) => {
      if (blob) downloadBlob(blob, 'meme.png');
      setLoading(false);
    });
  }, [memeFile, memeText]);

  const handleCollage = useCallback(async () => {
    if (imageFiles.length === 0) return;
    setLoading(true);
    const imgs = await Promise.all(
      imageFiles.map(
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
    const cols = Math.ceil(Math.sqrt(imgs.length));
    const rows = Math.ceil(imgs.length / cols);
    const cellW = 300;
    const cellH = 300;
    canvas.width = cols * cellW;
    canvas.height = rows * cellH;

    ctx.fillStyle = '#fff';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    imgs.forEach((img, i) => {
      const col = i % cols;
      const row = Math.floor(i / cols);
      const x = col * cellW;
      const y = row * cellH;
      const scale = Math.min(cellW / img.width, cellH / img.height);
      const dw = img.width * scale;
      const dh = img.height * scale;
      ctx.drawImage(img, x + (cellW - dw) / 2, y + (cellH - dh) / 2, dw, dh);
    });

    canvas.toBlob((blob) => {
      if (blob) downloadBlob(blob, 'collage.png');
      setLoading(false);
    });
  }, [imageFiles]);

  const handleSplit = useCallback(async () => {
    const file = imageFiles[0];
    if (!file) return;
    setLoading(true);
    const img = await new Promise<HTMLImageElement>((res, rej) => {
      const i = new Image();
      i.onload = () => res(i);
      i.onerror = rej;
      i.src = URL.createObjectURL(file);
    });
    const cw = Math.floor(img.width / splitCols);
    const rh = Math.floor(img.height / splitRows);

    for (let row = 0; row < splitRows; row++) {
      for (let col = 0; col < splitCols; col++) {
        const canvas = document.createElement('canvas');
        canvas.width = cw;
        canvas.height = rh;
        const ctx = canvas.getContext('2d')!;
        ctx.drawImage(img, col * cw, row * rh, cw, rh, 0, 0, cw, rh);
        const blob = await new Promise<Blob | null>((res) =>
          canvas.toBlob(res)
        );
        if (blob) downloadBlob(blob, `split_${row + 1}_${col + 1}.png`);
      }
    }
    setLoading(false);
  }, [imageFiles, splitRows, splitCols]);

  return (
    <ModalWrapper onClose={onClose} title="Image Create">
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
        {tab === 'chart' && (
          <>
            <input
              type="text"
              className="input input-bordered"
              placeholder="Title"
              value={chartTitle}
              onChange={(e) => setChartTitle(e.target.value)}
            />
            <input
              type="text"
              className="input input-bordered"
              placeholder="Labels (comma-separated)"
              value={chartLabels}
              onChange={(e) => setChartLabels(e.target.value)}
            />
            <input
              type="text"
              className="input input-bordered"
              placeholder="Values (comma-separated)"
              value={chartValues}
              onChange={(e) => setChartValues(e.target.value)}
            />
            <button
              className="btn btn-primary btn-sm"
              disabled={loading}
              onClick={handleChart}>
              {loading ? (
                <span className="loading loading-spinner" />
              ) : (
                'Generate Chart'
              )}
            </button>
          </>
        )}

        {tab === 'meme' && (
          <>
            <input
              type="file"
              accept="image/*"
              className="file-input file-input-bordered"
              onChange={(e) => setMemeFile(e.target.files?.[0] || null)}
            />
            <input
              type="text"
              className="input input-bordered"
              placeholder="Top text (leave blank for none)"
              value={memeText}
              onChange={(e) => setMemeText(e.target.value)}
            />
            <p className="text-xs">Use a newline (Enter) for top/bottom text</p>
            <button
              className="btn btn-primary btn-sm"
              disabled={!memeFile || loading}
              onClick={handleMeme}>
              {loading ? (
                <span className="loading loading-spinner" />
              ) : (
                'Generate Meme'
              )}
            </button>
          </>
        )}

        {tab === 'collage' && (
          <>
            <input
              type="file"
              accept="image/*"
              multiple
              className="file-input file-input-bordered"
              onChange={(e) => setImageFiles(Array.from(e.target.files ?? []))}
            />
            {imageFiles.length > 0 && (
              <p className="text-sm">{imageFiles.length} image(s)</p>
            )}
            <button
              className="btn btn-primary btn-sm"
              disabled={imageFiles.length === 0 || loading}
              onClick={handleCollage}>
              {loading ? (
                <span className="loading loading-spinner" />
              ) : (
                'Create Collage'
              )}
            </button>
          </>
        )}

        {tab === 'split' && (
          <>
            <input
              type="file"
              accept="image/*"
              className="file-input file-input-bordered"
              onChange={(e) =>
                setImageFiles(e.target.files ? [e.target.files[0]] : [])
              }
            />
            <div className="flex items-center gap-2">
              <label className="text-sm">Rows:</label>
              <input
                type="number"
                className="input input-bordered input-sm w-20"
                min={1}
                max={10}
                value={splitRows}
                onChange={(e) => setSplitRows(Number(e.target.value))}
              />
              <label className="text-sm">Cols:</label>
              <input
                type="number"
                className="input input-bordered input-sm w-20"
                min={1}
                max={10}
                value={splitCols}
                onChange={(e) => setSplitCols(Number(e.target.value))}
              />
            </div>
            <button
              className="btn btn-primary btn-sm"
              disabled={!imageFiles[0] || loading}
              onClick={handleSplit}>
              {loading ? (
                <span className="loading loading-spinner" />
              ) : (
                'Split Image'
              )}
            </button>
          </>
        )}

        <canvas ref={canvasRef} className="hidden" />
      </div>
    </ModalWrapper>
  );
};
