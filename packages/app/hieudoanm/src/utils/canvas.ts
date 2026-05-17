import html2canvas from 'html2canvas-pro';
import type { RefObject } from 'react';

const GRADIENT_RE =
  /\bbg-gradient-to-[a-z]+\s+(?:from-[^\s]+(?:\/\d+)?\s+)?(?:via-[^\s]+(?:\/\d+)?\s+)?to-[^\s]+(?:\/\d+)?\b/g;

const fixGradients = (root: HTMLElement) => {
  const els = root.querySelectorAll<HTMLElement>(
    '.bg-clip-text.text-transparent'
  );
  els.forEach((el) => {
    el.dataset.opencodeOrigClass = el.className;
    el.classList.remove('bg-clip-text', 'text-transparent');
    el.classList.add('text-white');
    el.className = el.className.replace(GRADIENT_RE, '');
  });
  return els;
};

const restoreGradients = (els: NodeListOf<HTMLElement>) => {
  els.forEach((el) => {
    const orig = el.dataset.opencodeOrigClass;
    if (orig) {
      el.className = orig;
      delete el.dataset.opencodeOrigClass;
    }
  });
};

export const download = async ({
  ref,
  output = '',
  square = false,
  backgroundColor = '#ffffff',
}: {
  ref: RefObject<HTMLDivElement | null>;
  output: string;
  square?: boolean;
  backgroundColor?: string;
}) => {
  if (!ref.current) return;

  const fixed = fixGradients(ref.current);
  await new Promise((resolve) => requestAnimationFrame(resolve));
  const canvas = await html2canvas(ref.current, {
    scale: 2,
    useCORS: true,
    backgroundColor,
  });

  restoreGradients(fixed);

  let finalCanvas = canvas;

  if (square && canvas.width !== canvas.height) {
    const size = Math.max(canvas.width, canvas.height);
    finalCanvas = document.createElement('canvas');
    finalCanvas.width = size;
    finalCanvas.height = size;
    const ctx = finalCanvas.getContext('2d')!;
    ctx.fillStyle = backgroundColor;
    ctx.fillRect(0, 0, size, size);
    ctx.drawImage(
      canvas,
      (size - canvas.width) / 2,
      (size - canvas.height) / 2
    );
  }

  const dataURL = finalCanvas.toDataURL('image/png');
  const link = document.createElement('a');
  link.href = dataURL;
  link.download = `${output}.png`;
  link.click();
  link.remove();
};
