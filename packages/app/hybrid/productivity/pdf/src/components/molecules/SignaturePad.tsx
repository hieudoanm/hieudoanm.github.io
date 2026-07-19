'use client';

import { useCallback, useEffect, useRef, useState, type FC } from 'react';

const SIGNATURE_FONTS = [
  'Satisfy',
  'Dancing Script',
  'Pacifico',
  'Great Vibes',
  'Brush Script MT',
];

interface SignaturePadProps {
  initialValue: string;
  onSave: (value: string) => void;
  onClose: () => void;
}

export const SignaturePad: FC<SignaturePadProps> = ({
  initialValue,
  onSave,
  onClose,
}) => {
  const [tab, setTab] = useState<'draw' | 'type' | 'upload'>('draw');
  const [typedText, setTypedText] = useState(
    initialValue.startsWith('data:') ? '' : initialValue || ''
  );
  const [font, setFont] = useState(SIGNATURE_FONTS[0]);
  const [imageValue, setImageValue] = useState(
    initialValue.startsWith('data:') ? initialValue : ''
  );
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const drawingRef = useRef(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    ctx.lineWidth = 2.5;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    ctx.strokeStyle = '#1a1a1a';
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    if (initialValue.startsWith('data:')) {
      const img = new Image();
      img.onload = () => ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
      img.src = initialValue;
    }
  }, [initialValue]);

  const handlePointerDown = useCallback(
    (e: React.PointerEvent<HTMLCanvasElement>) => {
      e.preventDefault();
      const canvas = canvasRef.current;
      if (!canvas) return;
      const rect = canvas.getBoundingClientRect();
      const ctx = canvas.getContext('2d');
      if (!ctx) return;
      drawingRef.current = true;
      ctx.beginPath();
      ctx.moveTo(e.clientX - rect.left, e.clientY - rect.top);
    },
    []
  );

  const handlePointerMove = useCallback(
    (e: React.PointerEvent<HTMLCanvasElement>) => {
      if (!drawingRef.current) return;
      const canvas = canvasRef.current;
      if (!canvas) return;
      const rect = canvas.getBoundingClientRect();
      const ctx = canvas.getContext('2d');
      if (!ctx) return;
      ctx.lineTo(e.clientX - rect.left, e.clientY - rect.top);
      ctx.stroke();
    },
    []
  );

  const handlePointerUp = useCallback(() => {
    drawingRef.current = false;
  }, []);

  const handleSave = () => {
    if (tab === 'type') {
      if (!typedText.trim()) return;
      onSave(typedText);
    } else if (tab === 'draw') {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const dataUrl = canvas.toDataURL('image/png');
      onSave(dataUrl);
    } else if (imageValue) {
      onSave(imageValue);
    }
  };

  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      setImageValue(String(reader.result));
      setTab('upload');
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div
        className="bg-base-100 w-full max-w-md rounded-lg p-5 shadow-xl"
        role="dialog"
        aria-label="Signature pad">
        <div className="mb-4 flex items-center justify-between">
          <h3 className="text-base-content text-lg font-semibold">
            Add Signature
          </h3>
          <button
            type="button"
            onClick={onClose}
            className="btn btn-ghost btn-sm btn-circle"
            aria-label="Close signature pad">
            ✕
          </button>
        </div>

        <div className="mb-3 flex gap-1">
          {(['draw', 'type', 'upload'] as const).map((t) => (
            <button
              key={t}
              type="button"
              onClick={() => setTab(t)}
              aria-label={`${t} signature`}
              className={`btn btn-sm btn-xs flex-1 ${tab === t ? 'btn-primary' : 'btn-ghost'}`}>
              {t === 'draw' ? 'Draw' : t === 'type' ? 'Type' : 'Upload'}
            </button>
          ))}
        </div>

        {tab === 'draw' && (
          <canvas
            ref={canvasRef}
            width={480}
            height={180}
            className="border-base-300 w-full rounded border bg-white"
            onPointerDown={handlePointerDown}
            onPointerMove={handlePointerMove}
            onPointerUp={handlePointerUp}
            onPointerLeave={handlePointerUp}
            data-testid="signature-canvas"
          />
        )}

        {tab === 'type' && (
          <div className="space-y-3">
            <div>
              <label className="text-base-content/60 mb-1 block text-xs">
                Type your name
              </label>
              <input
                type="text"
                value={typedText}
                onChange={(e) => setTypedText(e.target.value)}
                className="input input-sm w-full"
                aria-label="Typed signature text"
              />
            </div>
            <div>
              <label className="text-base-content/60 mb-1 block text-xs">
                Font
              </label>
              <select
                value={font}
                onChange={(e) => setFont(e.target.value)}
                className="select select-sm w-full"
                aria-label="Signature font">
                {SIGNATURE_FONTS.map((f) => (
                  <option key={f} value={f}>
                    {f}
                  </option>
                ))}
              </select>
            </div>
            <div className="border-base-300 flex h-24 items-center justify-center rounded border bg-white">
              <span
                className="text-3xl text-slate-800"
                style={{ fontFamily: `'${font}', cursive` }}>
                {typedText || 'Preview'}
              </span>
            </div>
          </div>
        )}

        {tab === 'upload' && (
          <div className="space-y-3">
            <input
              type="file"
              accept="image/*"
              onChange={handleUpload}
              className="file-input file-input-sm w-full"
              aria-label="Upload signature image"
            />
            {imageValue && (
              <img
                src={imageValue}
                alt="Uploaded signature"
                className="border-base-300 w-full rounded border bg-white"
              />
            )}
          </div>
        )}

        <div className="mt-4 flex justify-end gap-2">
          <button
            type="button"
            onClick={onClose}
            className="btn btn-ghost btn-sm">
            Cancel
          </button>
          <button
            type="button"
            onClick={handleSave}
            className="btn btn-primary btn-sm"
            disabled={tab === 'type' && !typedText.trim()}>
            Save Signature
          </button>
        </div>
      </div>
    </div>
  );
};
