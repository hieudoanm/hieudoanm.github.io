export interface PaperSize {
  id: string;
  label: string;
  widthMm: number;
  heightMm: number;
}

export const PAPER_SIZES: PaperSize[] = [
  { id: 'a3', label: 'A3', widthMm: 297, heightMm: 420 },
  { id: 'a4', label: 'A4', widthMm: 210, heightMm: 297 },
  { id: 'a5', label: 'A5', widthMm: 148, heightMm: 210 },
  { id: 'a6', label: 'A6', widthMm: 105, heightMm: 148 },
  { id: 'b5', label: 'B5', widthMm: 176, heightMm: 250 },
];

export const DEFAULT_PAPER_ID = 'a4';

export const getPaperSize = (id: string): PaperSize =>
  PAPER_SIZES.find((size) => size.id === id) ?? PAPER_SIZES[1];

export const MM_TO_PX = 96 / 25.4;

export const mmToPx = (mm: number): number => Math.round(mm * MM_TO_PX);
