import createDOMPurify from 'dompurify';
import html2canvas from 'html2canvas-pro';
import { FC, useEffect, useMemo, useRef, useState } from 'react';
import { scrambleText } from './utils/typoglycemia';

const DOMPurify =
  typeof window !== 'undefined' ? createDOMPurify(window) : null;

export const ViewTab: FC<{ html: string; intervalMs?: number }> = ({
  html = '',
  intervalMs = 1000,
}) => {
  const imageRef = useRef<HTMLDivElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [tick, setTick] = useState(0);
  const [running, setRunning] = useState(true);

  const sanitizedHTML = useMemo(() => DOMPurify?.sanitize(html), [html]);

  useEffect(() => {
    if (!running) return;
    const id = setInterval(() => setTick((t) => t + 1), intervalMs);
    return () => clearInterval(id);
  }, [intervalMs, running]);

  useEffect(() => {
    const root = containerRef.current;
    if (!root) return;
    const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, null);
    let node: Text | null;
    while ((node = walker.nextNode() as Text | null)) {
      if (!node.parentElement) continue;
      if (node.parentElement.closest('code, pre, textarea')) continue;
      node.textContent = scrambleText(node.textContent ?? '');
    }
  }, [tick, sanitizedHTML]);

  const handleSaveAsImage = async () => {
    if (!imageRef.current) return;
    const canvas = await html2canvas(imageRef.current, {
      backgroundColor: null,
      scale: 2,
    });
    canvas.toBlob((blob) => {
      if (!blob) return;
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'typoglycemia.png';
      a.click();
      URL.revokeObjectURL(url);
    });
  };

  return (
    <div className="flex h-full flex-col">
      <div ref={imageRef} className="min-h-0 flex-1 overflow-auto p-4">
        <div
          ref={containerRef}
          dangerouslySetInnerHTML={{ __html: sanitizedHTML ?? '' }}
          className="markdown-body !text-base-content prose max-w-none !bg-transparent"
        />
      </div>
      <div className="border-base-300 flex justify-end gap-2 border-t px-4 py-2">
        <button
          className="btn btn-ghost btn-xs"
          onClick={() => setRunning((p) => !p)}>
          {running ? 'Stop' : 'Shuffle'}
        </button>
        <button className="btn btn-ghost btn-xs" onClick={handleSaveAsImage}>
          Save
        </button>
      </div>
    </div>
  );
};
