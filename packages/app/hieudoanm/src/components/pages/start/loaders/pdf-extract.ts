import { ComponentType } from 'react';

const loadPdfExtractImages = () =>
  import('@hieudoanm.github.io/components/pages/start/apps/pdf-extract/PdfExtractImagesModal').then(
    (m) => ({ default: m.PdfExtractImagesModal })
  );

const loadPdfExtractText = () =>
  import('@hieudoanm.github.io/components/pages/start/apps/pdf-extract/PdfExtractTextModal').then(
    (m) => ({ default: m.PdfExtractTextModal })
  );

const loadPdfInfo = () =>
  import('@hieudoanm.github.io/components/pages/start/apps/pdf-extract/PdfInfoModal').then(
    (m) => ({ default: m.PdfInfoModal })
  );

const loadPdfMetadata = () =>
  import('@hieudoanm.github.io/components/pages/start/apps/pdf-extract/PdfMetadataModal').then(
    (m) => ({ default: m.PdfMetadataModal })
  );

const loadPdfOcr = () =>
  import('@hieudoanm.github.io/components/pages/start/apps/pdf-extract/PdfOcrModal').then(
    (m) => ({ default: m.PdfOcrModal })
  );

const loadPdfRepair = () =>
  import('@hieudoanm.github.io/components/pages/start/apps/pdf-extract/PdfRepairModal').then(
    (m) => ({ default: m.PdfRepairModal })
  );

export const loaders: Record<
  string,
  () => Promise<{ default: ComponentType<{ onClose: () => void }> }>
> = {
  'pdf-extract-images': loadPdfExtractImages,
  'pdf-extract-text': loadPdfExtractText,
  'pdf-info': loadPdfInfo,
  'pdf-metadata': loadPdfMetadata,
  'pdf-ocr': loadPdfOcr,
  'pdf-repair': loadPdfRepair,
};
