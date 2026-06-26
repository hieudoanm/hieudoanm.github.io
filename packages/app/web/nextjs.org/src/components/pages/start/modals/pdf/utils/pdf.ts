import { PDFDocument, rgb, StandardFonts, degrees } from 'pdf-lib';
import { pdfjs } from 'react-pdf';

export interface PDFInfo {
  pageCount: number;
  title: string;
  author: string;
  subject: string;
  keywords: string[];
  encrypted: boolean;
  fileSize: number;
}

export async function mergePDFs(files: File[]): Promise<Uint8Array> {
  const merged = await PDFDocument.create();
  for (const file of files) {
    const src = await PDFDocument.load(await file.arrayBuffer());
    const pages = await merged.copyPages(src, src.getPageIndices());
    for (const page of pages) merged.addPage(page);
  }
  return merged.save();
}

export async function splitPDF(
  file: File,
  pageRanges?: string
): Promise<Uint8Array[]> {
  const src = await PDFDocument.load(await file.arrayBuffer());
  const total = src.getPageCount();
  const ranges = pageRanges
    ? parsePageRanges(pageRanges, total)
    : Array.from({ length: total }, (_, i) => i);

  const results: Uint8Array[] = [];
  for (const idx of ranges) {
    const doc = await PDFDocument.create();
    const [page] = await doc.copyPages(src, [idx]);
    doc.addPage(page);
    results.push(await doc.save());
  }
  return results;
}

function parsePageRanges(s: string, max: number): number[] {
  const pages: number[] = [];
  for (const part of s.split(',')) {
    const trimmed = part.trim();
    if (trimmed.includes('-')) {
      const [a, b] = trimmed.split('-').map(Number);
      const from = Math.max(0, Math.min(a - 1, max - 1));
      const to = Math.min(b ? b - 1 : from, max - 1);
      for (let i = from; i <= to; i++) pages.push(i);
    } else {
      const n = Number(trimmed) - 1;
      if (n >= 0 && n < max) pages.push(n);
    }
  }
  return [...new Set(pages)].sort((a, b) => a - b);
}

export async function extractText(file: File): Promise<string> {
  const loadingTask = pdfjs.getDocument(await file.arrayBuffer());
  const pdf = await loadingTask.promise;
  const parts: string[] = [];
  for (let i = 1; i <= pdf.numPages; i++) {
    const page = await pdf.getPage(i);
    const content = await page.getTextContent();
    const text = content.items
      .map((item) => ('str' in item ? item.str : ''))
      .join(' ');
    parts.push(text);
  }
  return parts.join('\n\n');
}

export async function extractImages(file: File): Promise<Blob[]> {
  const loadingTask = pdfjs.getDocument(await file.arrayBuffer());
  const pdf = await loadingTask.promise;
  const blobs: Blob[] = [];
  for (let i = 1; i <= pdf.numPages; i++) {
    const page = await pdf.getPage(i);
    const viewport = page.getViewport({ scale: 2 });
    const canvas = new OffscreenCanvas(viewport.width, viewport.height);
    const ctx = canvas.getContext('2d')!;
    await page.render({
      canvasContext: ctx as unknown as CanvasRenderingContext2D,
      viewport,
      canvas: null,
    }).promise;
    const blob = await canvas.convertToBlob({ type: 'image/png' });
    blobs.push(blob);
  }
  return blobs;
}

export async function compressPDF(file: File): Promise<Uint8Array> {
  const pdfDoc = await PDFDocument.load(await file.arrayBuffer());
  return pdfDoc.save({ useObjectStreams: true });
}

export async function rotatePDF(
  file: File,
  angle: 90 | 180 | 270,
  pageNumbers?: number[]
): Promise<Uint8Array> {
  const pdfDoc = await PDFDocument.load(await file.arrayBuffer());
  const pages =
    pageNumbers && pageNumbers.length > 0
      ? pageNumbers.map((n) => pdfDoc.getPage(n - 1))
      : pdfDoc.getPages();
  for (const page of pages) {
    page.setRotation(degrees(angle));
  }
  return pdfDoc.save();
}

export async function addWatermark(
  file: File,
  text: string
): Promise<Uint8Array> {
  const pdfDoc = await PDFDocument.load(await file.arrayBuffer());
  const font = await pdfDoc.embedFont(StandardFonts.Helvetica);
  const pages = pdfDoc.getPages();
  for (const page of pages) {
    const { width, height } = page.getSize();
    page.drawText(text, {
      x: width / 4,
      y: height / 2,
      size: 48,
      font,
      color: rgb(0.8, 0.8, 0.8),
      opacity: 0.4,
      rotate: degrees(-45),
    });
  }
  return pdfDoc.save();
}

export async function getPDFInfo(file: File): Promise<PDFInfo> {
  const pdfDoc = await PDFDocument.load(await file.arrayBuffer());
  return {
    pageCount: pdfDoc.getPageCount(),
    title: pdfDoc.getTitle() ?? '',
    author: pdfDoc.getAuthor() ?? '',
    subject: pdfDoc.getSubject() ?? '',
    keywords:
      pdfDoc
        .getKeywords()
        ?.split(/[,\s]+/)
        .filter(Boolean) ?? [],
    encrypted: false,
    fileSize: file.size,
  };
}

export async function setPDFMetadata(
  file: File,
  metadata: {
    title?: string;
    author?: string;
    subject?: string;
    keywords?: string;
  }
): Promise<Uint8Array> {
  const pdfDoc = await PDFDocument.load(await file.arrayBuffer());
  if (metadata.title !== undefined) pdfDoc.setTitle(metadata.title);
  if (metadata.author !== undefined) pdfDoc.setAuthor(metadata.author);
  if (metadata.subject !== undefined) pdfDoc.setSubject(metadata.subject);
  if (metadata.keywords !== undefined) pdfDoc.setKeywords([metadata.keywords]);
  return pdfDoc.save();
}

export async function ocrPDF(file: File, language: string): Promise<string> {
  const Tesseract = await import('tesseract.js');
  const { data } = await Tesseract.recognize(file, language);
  return data.text;
}

export function downloadBlob(data: Blob | Uint8Array, filename: string) {
  const blob =
    data instanceof Blob
      ? data
      : new Blob([data.buffer as ArrayBuffer], { type: 'application/pdf' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}
