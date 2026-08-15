import html2canvas from 'html2canvas-pro';
import type { RefObject } from 'react';

export const downloadLineupPng = async (
  ref: RefObject<HTMLDivElement | null>,
  filename: string
): Promise<void> => {
  if (!ref.current) return;
  const canvas = await html2canvas(ref.current, {
    scale: 2,
    useCORS: true,
    backgroundColor: '#14532d',
  });
  const dataURL = canvas.toDataURL('image/png');
  const link = document.createElement('a');
  link.href = dataURL;
  link.download = `${filename}.png`;
  link.click();
  link.remove();
};
