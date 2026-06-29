'use client';
import { FC, useState, useCallback } from 'react';
import { ModalWrapper } from '@hieudoanm.github.io/components/atoms/ModalWrapper';
import { downloadBlob } from './utils';

export const ImageSplitModal: FC<{ onClose: () => void }> = ({ onClose }) => {
  const [loading, setLoading] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [rows, setRows] = useState(2);
  const [cols, setCols] = useState(2);

  const handleSplit = useCallback(async () => {
    if (!file) return;
    setLoading(true);
    const img = await new Promise<HTMLImageElement>((res, rej) => {
      const i = new Image();
      i.onload = () => res(i);
      i.onerror = rej;
      i.src = URL.createObjectURL(file);
    });
    const cw = Math.floor(img.width / cols);
    const rh = Math.floor(img.height / rows);

    for (let row = 0; row < rows; row++) {
      for (let col = 0; col < cols; col++) {
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
  }, [file, rows, cols]);

  return (
    <ModalWrapper onClose={onClose} title="Image Splitter">
      <div className="flex flex-col gap-4">
        <input
          type="file"
          accept="image/*"
          className="file-input file-input-bordered"
          onChange={(e) => setFile(e.target.files?.[0] || null)}
        />
        <div className="flex items-center gap-2">
          <label className="text-sm">Rows:</label>
          <input
            type="number"
            className="input input-bordered input-sm w-20"
            min={1}
            max={10}
            value={rows}
            onChange={(e) => setRows(Number(e.target.value))}
          />
          <label className="text-sm">Cols:</label>
          <input
            type="number"
            className="input input-bordered input-sm w-20"
            min={1}
            max={10}
            value={cols}
            onChange={(e) => setCols(Number(e.target.value))}
          />
        </div>
        <button
          className="btn btn-primary btn-sm"
          disabled={!file || loading}
          onClick={handleSplit}>
          {loading ? (
            <span className="loading loading-spinner" />
          ) : (
            'Split Image'
          )}
        </button>
      </div>
    </ModalWrapper>
  );
};
ImageSplitModal.displayName = 'ImageSplitModal';
