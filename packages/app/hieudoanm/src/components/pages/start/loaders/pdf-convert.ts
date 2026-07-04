import { ComponentType } from 'react';

const loadPdfToEpub = () =>
  import('@hieudoanm.github.io/components/pages/start/apps/pdf-convert/PdfToEpubModal').then(
    (m) => ({ default: m.PdfToEpubModal })
  );

const loadPdfToExcel = () =>
  import('@hieudoanm.github.io/components/pages/start/apps/pdf-convert/PdfToExcelModal').then(
    (m) => ({ default: m.PdfToExcelModal })
  );

const loadPdfToImages = () =>
  import('@hieudoanm.github.io/components/pages/start/apps/pdf-convert/PdfToImagesModal').then(
    (m) => ({ default: m.PdfToImagesModal })
  );

const loadPdfToPpt = () =>
  import('@hieudoanm.github.io/components/pages/start/apps/pdf-convert/PdfToPptModal').then(
    (m) => ({ default: m.PdfToPptModal })
  );

const loadPdfToWord = () =>
  import('@hieudoanm.github.io/components/pages/start/apps/pdf-convert/PdfToWordModal').then(
    (m) => ({ default: m.PdfToWordModal })
  );

export const loaders: Record<
  string,
  () => Promise<{ default: ComponentType<{ onClose: () => void }> }>
> = {
  'pdf-to-epub': loadPdfToEpub,
  'pdf-to-excel': loadPdfToExcel,
  'pdf-to-images': loadPdfToImages,
  'pdf-to-ppt': loadPdfToPpt,
  'pdf-to-word': loadPdfToWord,
};
