import JSZip from 'jszip';
import type { GeneratedIcon } from '@/types';
import { svgToCanvas } from './svgToCanvas';

export const generateIcons = async (
  svgText: string,
  sizes: number[]
): Promise<GeneratedIcon[]> =>
  Promise.all(
    sizes.map(async (size) => {
      const canvas = await svgToCanvas(svgText, size);
      return { size, dataUrl: canvas.toDataURL('image/png'), canvas };
    })
  );

export type SvgFileResult =
  { ok: true; text: string } | { ok: false; reason: 'type' | 'content' };

export const readSvgFile = async (file: File): Promise<SvgFileResult> => {
  if (
    file.type !== 'image/svg+xml' &&
    !file.name.toLowerCase().endsWith('.svg')
  ) {
    return { ok: false, reason: 'type' };
  }
  const text = await file.text();
  if (!text.trim().startsWith('<svg') && !text.includes('<svg')) {
    return { ok: false, reason: 'content' };
  }
  return { ok: true, text };
};

const canvasToBlob = (canvas: HTMLCanvasElement): Promise<Blob> =>
  new Promise((resolve, reject) => {
    canvas.toBlob((blob) => {
      if (blob) resolve(blob);
      else reject(new Error('Failed to convert canvas to blob'));
    }, 'image/png');
  });

export const downloadIconsZip = async (
  icons: GeneratedIcon[],
  filename = 'icons.zip'
): Promise<void> => {
  const zip = new JSZip();
  const folder = zip.folder('icons');
  if (!folder) return;
  for (const icon of icons) {
    folder.file(
      `icon-${icon.size}x${icon.size}.png`,
      await canvasToBlob(icon.canvas)
    );
  }
  const content = await zip.generateAsync({ type: 'blob' });
  const url = URL.createObjectURL(content);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  a.click();
  setTimeout(() => URL.revokeObjectURL(url), 0);
};
