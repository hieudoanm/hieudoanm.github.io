export const FORMATS = [
  'CODE128',
  'EAN-13',
  'UPC-A',
  'CODE39',
  'ITF',
  'Codabar',
  'Pharmacode',
] as const;

export type Format = (typeof FORMATS)[number];
