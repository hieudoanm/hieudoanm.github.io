'use client';

import { FC, useState, useCallback, useRef, useEffect } from 'react';
import { Dropzone, FullScreen } from '@hieudoanm.github.io/components/atoms';

export const PdfAnnotateModal: FC<{ onClose: () => void }> = ({ onClose }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [file, setFile] = useState<File | null>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [tool, setTool] = useState<'pen' | 'highlight' | 'underline'>('pen');
  const [color, setColor] = useState('#ff0000');

  const handleFile = useCallback((f: File) => {
    setFile(f);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    canvas.width = canvas.offsetWidth * 2;
    canvas.height = canvas.offsetHeight * 2;
    const ctx = canvas.getContext('2d');
    if (ctx) {
      ctx.scale(2, 2);
      ctx.fillStyle = '#fff';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
    }
  }, []);

  const getPos = (e: React.MouseEvent) => {
    const canvas = canvasRef.current;
    if (!canvas) return { x: 0, y: 0 };
    const rect = canvas.getBoundingClientRect();
    return { x: e.clientX - rect.left, y: e.clientY - rect.top };
  };

  const startDraw = useCallback((e: React.MouseEvent) => {
    const ctx = canvasRef.current?.getContext('2d');
    if (!ctx) return;
    const { x, y } = getPos(e);
    ctx.beginPath();
    ctx.moveTo(x, y);
    setIsDrawing(true);
  }, []);

  const draw = useCallback(
    (e: React.MouseEvent) => {
      if (!isDrawing) return;
      const ctx = canvasRef.current?.getContext('2d');
      if (!ctx) return;
      const { x, y } = getPos(e);
      ctx.strokeStyle = color;
      ctx.lineWidth = tool === 'highlight' ? 16 : tool === 'underline' ? 3 : 2;
      ctx.globalAlpha = tool === 'highlight' ? 0.3 : 1;
      ctx.lineCap = 'round';
      ctx.lineTo(x, y);
      ctx.stroke();
      ctx.globalAlpha = 1;
    },
    [isDrawing, color, tool]
  );

  const stopDraw = useCallback(() => {
    setIsDrawing(false);
    const ctx = canvasRef.current?.getContext('2d');
    if (ctx) ctx.beginPath();
  }, []);

  const clear = useCallback(() => {
    const ctx = canvasRef.current?.getContext('2d');
    if (!ctx || !canvasRef.current) return;
    ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
    ctx.fillStyle = '#fff';
    ctx.fillRect(0, 0, canvasRef.current.width, canvasRef.current.height);
  }, []);

  const download = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    canvas.toBlob((blob) => {
      if (!blob) return;
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'annotated.png';
      a.click();
      URL.revokeObjectURL(url);
    });
  }, []);

  return (
    <FullScreen onClose={onClose} title="Annotate PDF">
      <div className="flex flex-col gap-4">
        <p className="text-sm">Draw annotations on a canvas overlay.</p>
        <Dropzone accept=".pdf" onFile={handleFile} />
        {file && <p className="text-base-content/60 text-xs">{file.name}</p>}
        <div className="flex items-center gap-3 text-xs">
          <div className="btn-group">
            {(['pen', 'highlight', 'underline'] as const).map((t) => (
              <button
                key={t}
                onClick={() => setTool(t)}
                className={`btn btn-xs ${tool === t ? 'btn-active' : ''}`}>
                {t.charAt(0).toUpperCase() + t.slice(1)}
              </button>
            ))}
          </div>
          <input
            type="color"
            value={color}
            onChange={(e) => setColor(e.target.value)}
            className="h-8 w-8 cursor-pointer border-0 p-0"
          />
        </div>
        <canvas
          ref={canvasRef}
          className="border-base-300 h-64 w-full touch-none rounded border bg-white"
          onMouseDown={startDraw}
          onMouseMove={draw}
          onMouseUp={stopDraw}
          onMouseLeave={stopDraw}
        />
        <div className="flex gap-2">
          <button onClick={clear} className="btn btn-ghost btn-sm">
            Clear
          </button>
          <button onClick={download} className="btn btn-primary btn-sm">
            Download PNG
          </button>
        </div>
        <p className="text-base-content/40 text-[10px]">
          Full PDF annotation requires pdfjs. Canvas shows freehand drawing
          preview.
        </p>
      </div>
    </FullScreen>
  );
};
PdfAnnotateModal.displayName = 'PdfAnnotateModal';
