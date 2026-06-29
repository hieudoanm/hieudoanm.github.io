'use client';

import { FC, useState, useCallback, useEffect, useRef } from 'react';
import { ModalWrapper } from '@hieudoanm.github.io/components/atoms/ModalWrapper';

export const PdfPageNumbersModal: FC<{ onClose: () => void }> = ({
  onClose,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [position, setPosition] = useState('bottom-right');
  const [startNum, setStartNum] = useState(1);
  const [format, setFormat] = useState('{n}');
  const [file, setFile] = useState<File | null>(null);

  const handleFile = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0];
    if (f) setFile(f);
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
    ctx.strokeStyle = '#ccc';
    ctx.strokeRect(10, 10, canvas.width - 20, canvas.height - 20);
    ctx.fillStyle = '#999';
    ctx.font = '11px sans-serif';
    const text = format
      .replace('{n}', String(startNum))
      .replace('{total}', '1');
    const m = ctx.measureText(text);
    let x = 20,
      y = 20;
    if (position.includes('center')) x = (canvas.width - m.width) / 2;
    else if (position.includes('right')) x = canvas.width - m.width - 20;
    if (position.includes('bottom')) y = canvas.height - 20;
    else y = 24;
    ctx.fillStyle = '#333';
    ctx.fillText(text, x, y);
  }, [position, startNum, format]);

  const download = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    canvas.toBlob((blob) => {
      if (!blob) return;
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'page-numbers-preview.png';
      a.click();
      URL.revokeObjectURL(url);
    });
  }, []);

  return (
    <ModalWrapper onClose={onClose} title="Page Numbers" size="max-w-md">
      <div className="flex flex-col gap-4">
        <p className="text-sm">Add page numbers to your PDF.</p>
        <input
          type="file"
          accept=".pdf"
          onChange={handleFile}
          className="file-input file-input-bordered file-input-sm w-full"
        />
        {file && <p className="text-base-content/60 text-xs">{file.name}</p>}
        <div className="grid grid-cols-2 gap-3 text-xs">
          <div className="flex flex-col gap-1">
            <label>Position</label>
            <select
              value={position}
              onChange={(e) => setPosition(e.target.value)}
              className="select select-bordered select-xs">
              <option value="top-left">Top Left</option>
              <option value="top-center">Top Center</option>
              <option value="top-right">Top Right</option>
              <option value="bottom-left">Bottom Left</option>
              <option value="bottom-center">Bottom Center</option>
              <option value="bottom-right">Bottom Right</option>
            </select>
          </div>
          <div className="flex flex-col gap-1">
            <label>Starting #</label>
            <input
              type="number"
              min={1}
              value={startNum}
              onChange={(e) => setStartNum(Number(e.target.value))}
              className="input input-bordered input-xs"
            />
          </div>
          <div className="col-span-2 flex flex-col gap-1">
            <label>
              Format ({'{n}'} = number, {'{total}'} = total pages)
            </label>
            <input
              type="text"
              value={format}
              onChange={(e) => setFormat(e.target.value)}
              className="input input-bordered input-xs"
            />
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
          Full PDF processing requires pdf-lib or server-side tool. Preview
          shows page number placement.
        </p>
      </div>
    </ModalWrapper>
  );
};
PdfPageNumbersModal.displayName = 'PdfPageNumbersModal';
