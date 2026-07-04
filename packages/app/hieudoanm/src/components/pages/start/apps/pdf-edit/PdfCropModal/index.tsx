'use client';

import { FC, useState, useCallback, useEffect, useRef } from 'react';
import { Dropzone, FullScreen } from '@hieudoanm.github.io/components/atoms';

export const PdfCropModal: FC<{ onClose: () => void }> = ({ onClose }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [file, setFile] = useState<File | null>(null);
  const [top, setTop] = useState(10);
  const [bottom, setBottom] = useState(10);
  const [left, setLeft] = useState(10);
  const [right, setRight] = useState(10);
  const [unit, setUnit] = useState<'mm' | 'percent'>('mm');

  const handleFile = useCallback((f: File) => {
    setFile(f);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    canvas.width = 320;
    canvas.height = 240;
    ctx.fillStyle = '#f3f3f3';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    const mTop = (top / 100) * canvas.height;
    const mBottom = (bottom / 100) * canvas.height;
    const mLeft = (left / 100) * canvas.width;
    const mRight = (right / 100) * canvas.width;
    ctx.fillStyle = 'rgba(255,0,0,0.15)';
    ctx.fillRect(0, 0, canvas.width, mTop);
    ctx.fillRect(0, canvas.height - mBottom, canvas.width, mBottom);
    ctx.fillRect(0, 0, mLeft, canvas.height);
    ctx.fillRect(canvas.width - mRight, 0, mRight, canvas.height);
    ctx.strokeStyle = '#f00';
    ctx.lineWidth = 1;
    ctx.setLineDash([4, 4]);
    ctx.strokeRect(
      mLeft,
      mTop,
      canvas.width - mLeft - mRight,
      canvas.height - mTop - mBottom
    );
    ctx.setLineDash([]);
    ctx.fillStyle = '#333';
    ctx.font = '10px sans-serif';
    ctx.fillText(
      `Crop: ${Math.round(canvas.width - mLeft - mRight)}×${Math.round(canvas.height - mTop - mBottom)}px`,
      10,
      20
    );
  }, [top, bottom, left, right]);

  const download = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    canvas.toBlob((blob) => {
      if (!blob) return;
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'crop-preview.png';
      a.click();
      URL.revokeObjectURL(url);
    });
  }, []);

  return (
    <FullScreen onClose={onClose} title="Crop PDF">
      <div className="flex flex-col gap-4">
        <p className="text-sm">Set crop margins for your PDF pages.</p>
        <Dropzone accept=".pdf" onFile={handleFile} />
        {file && (
          <p className="text-base-content/60 text-xs">
            {file.name} ({(file.size / 1024).toFixed(0)} KB)
          </p>
        )}
        <div className="grid grid-cols-2 gap-3 text-xs">
          {(['Top', 'Bottom', 'Left', 'Right'] as const).map((label) => {
            const val = { Top: top, Bottom: bottom, Left: left, Right: right }[
              label
            ];
            const set = {
              Top: setTop,
              Bottom: setBottom,
              Left: setLeft,
              Right: setRight,
            }[label];
            return (
              <div key={label} className="flex flex-col gap-1">
                <label>
                  {label} ({unit})
                </label>
                <input
                  type="number"
                  min={0}
                  max={50}
                  value={val}
                  onChange={(e) => set(Number(e.target.value))}
                  className="input input-bordered input-xs"
                />
              </div>
            );
          })}
          <div className="col-span-2 flex flex-col gap-1">
            <label>Unit</label>
            <select
              value={unit}
              onChange={(e) => setUnit(e.target.value as 'mm' | 'percent')}
              className="select select-bordered select-xs">
              <option value="mm">mm</option>
              <option value="percent">%</option>
            </select>
          </div>
        </div>
        <canvas
          ref={canvasRef}
          className="border-base-300 w-full rounded border"
        />
        <div className="flex gap-2">
          <button onClick={download} className="btn btn-primary btn-sm">
            Download Preview
          </button>
        </div>
        <p className="text-base-content/40 text-[10px]">
          Actual PDF cropping requires pdfcpu or pdf-lib. Preview shows margin
          overlay.
        </p>
      </div>
    </FullScreen>
  );
};
PdfCropModal.displayName = 'PdfCropModal';
