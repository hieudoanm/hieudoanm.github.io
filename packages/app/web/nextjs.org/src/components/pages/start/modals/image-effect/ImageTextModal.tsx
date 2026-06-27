'use client';

import { FC, useCallback, useRef, useState } from 'react';
import { ModalWrapper } from '@hieudoanm.github.io/components/atoms/ModalWrapper';

const downloadBlob = (blob: Blob, name: string) => {
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = name;
  a.click();
  URL.revokeObjectURL(url);
};

export const ImageTextModal: FC<{ onClose: () => void }> = ({ onClose }) => {
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [textContent, setTextContent] = useState('');
  const [textSize, setTextSize] = useState(24);
  const [textColor, setTextColor] = useState('#ffffff');
  const [textX, setTextX] = useState(10);
  const [textY, setTextY] = useState(50);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const processImage = useCallback(async () => {
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
    ctx.drawImage(img, 0, 0);
    ctx.fillStyle = textColor;
    ctx.font = `${textSize}px sans-serif`;
    ctx.fillText(textContent, textX, textY);
    canvas.toBlob((blob) => {
      if (blob) downloadBlob(blob, `text_${file.name}`);
      setLoading(false);
    });
  }, [file, textContent, textSize, textColor, textX, textY]);

  return (
    <ModalWrapper onClose={onClose} title="Add Text">
      <div className="flex flex-col gap-4">
        <input
          type="file"
          accept="image/*"
          className="file-input file-input-bordered"
          onChange={(e) => {
            const f = e.target.files?.[0];
            if (f) setFile(f);
          }}
        />
        {file && (
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
              onClick={processImage}>
              {loading ? (
                <span className="loading loading-spinner" />
              ) : (
                'Add Text'
              )}
            </button>
          </>
        )}
      </div>
      <canvas ref={canvasRef} className="hidden" />
    </ModalWrapper>
  );
};
ImageTextModal.displayName = 'ImageTextModal';
