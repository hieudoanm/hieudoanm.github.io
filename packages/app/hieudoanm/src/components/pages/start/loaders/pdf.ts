import { ComponentType } from 'react';

const ALL_PDF_IDS = [
  'pdf',
  'pdf-to-epub',
  'pdf-to-excel',
  'pdf-to-images',
  'pdf-to-ppt',
  'pdf-to-word',
  'create-text-to-pdf',
  'create-url-to-pdf',
  'epub-to-pdf',
  'images-to-pdf',
  'ppt-to-pdf',
  'url-to-pdf',
  'word-to-pdf',
  'azw3-to-epub',
  'azw3-to-mobi',
  'epub-to-azw3',
  'epub-to-mobi',
  'mobi-to-azw3',
  'mobi-to-epub',
  'pdf-annotate',
  'pdf-compress',
  'pdf-crop',
  'pdf-delete-pages',
  'pdf-merge',
  'pdf-page-numbers',
  'pdf-rearrange',
  'pdf-redact',
  'pdf-rotate',
  'pdf-split',
  'pdf-watermark',
  'pdf-extract-images',
  'pdf-extract-text',
  'pdf-info',
  'pdf-metadata',
  'pdf-ocr',
  'pdf-repair',
  'pdf-esign',
  'pdf-security',
  'pdf-translate',
];

const loadPdf = () =>
  import('@hieudoanm.github.io/components/pages/start/apps/pdf').then((m) => ({
    default: m.PdfModal,
  }));

export const loaders: Record<
  string,
  () => Promise<{ default: ComponentType<{ onClose: () => void }> }>
> = Object.fromEntries(ALL_PDF_IDS.map((id) => [id, loadPdf]));
