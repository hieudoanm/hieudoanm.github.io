import { ComponentType, lazy } from 'react';

const loadpdf_to_excel = () =>
  import('@hieudoanm.github.io/components/pages/start/modals/pdf-convert/PdfToExcelModal').then(
    (m) => ({ default: m.PdfToExcelModal })
  );

const loadpdf_to_epub = () =>
  import('@hieudoanm.github.io/components/pages/start/modals/pdf-convert/PdfToEpubModal').then(
    (m) => ({ default: m.PdfToEpubModal })
  );

const loadpdf_to_images = () =>
  import('@hieudoanm.github.io/components/pages/start/modals/pdf-convert/PdfToImagesModal').then(
    (m) => ({ default: m.PdfToImagesModal })
  );

const loadpdf_to_ppt = () =>
  import('@hieudoanm.github.io/components/pages/start/modals/pdf-convert/PdfToPptModal').then(
    (m) => ({ default: m.PdfToPptModal })
  );

const loadpdf_to_word = () =>
  import('@hieudoanm.github.io/components/pages/start/modals/pdf-convert/PdfToWordModal').then(
    (m) => ({ default: m.PdfToWordModal })
  );

export const loaders: Record<
  string,
  () => Promise<{ default: ComponentType<{ onClose: () => void }> }>
> = {
  'pdf-to-excel': loadpdf_to_excel,
  'pdf-to-epub': loadpdf_to_epub,
  'pdf-to-images': loadpdf_to_images,
  'pdf-to-ppt': loadpdf_to_ppt,
  'pdf-to-word': loadpdf_to_word,
};
