'use client';

import { FC, useState, useCallback, useRef } from 'react';
import { ModalWrapper } from '@hieudoanm.github.io/components/atoms/ModalWrapper';
import { FILTERS, downloadBlob, applyFilter } from './utils';

export const ImagePhotoFiltersModal: FC<{ onClose: () => void }> = ({
  onClose,
}) => {
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState<string>('sepia');
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
    canvas.width = img.width;
    canvas.height = img.height;
    ctx.drawImage(img, 0, 0);
    applyFilter(ctx, canvas.width, canvas.height, selectedFilter);
    canvas.toBlob((blob) => {
      if (blob) downloadBlob(blob, `filter_${file.name}`);
      setLoading(false);
    });
  }, [file, selectedFilter]);

  return (
    <ModalWrapper onClose={onClose} title="Photo Filters">
      <div className="flex flex-col gap-4">
        <input
          type="file"
          accept="image/*"
          className="file-input file-input-bordered"
          onChange={(e) => setFile(e.target.files?.[0] || null)}
        />
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
        <button
          className="btn btn-primary btn-sm"
          disabled={!file || loading}
          onClick={process}>
          {loading ? (
            <span className="loading loading-spinner" />
          ) : (
            'Apply Filter'
          )}
        </button>
        <canvas ref={canvasRef} className="hidden" />
      </div>
    </ModalWrapper>
  );
};
ImagePhotoFiltersModal.displayName = 'ImagePhotoFiltersModal';
