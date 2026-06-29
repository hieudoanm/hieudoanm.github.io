import { ComponentType, lazy } from 'react';

const loadpdf_extract_images = () =>
  import('@hieudoanm.github.io/components/pages/start/modals/pdf/extract/PdfExtractImagesModal').then(
    (m) => ({ default: m.PdfExtractImagesModal })
  );

const loadpdf_extract_text = () =>
  import('@hieudoanm.github.io/components/pages/start/modals/pdf/extract/PdfExtractTextModal').then(
    (m) => ({ default: m.PdfExtractTextModal })
  );

const loadpdf_info = () =>
  import('@hieudoanm.github.io/components/pages/start/modals/pdf/extract/PdfInfoModal').then(
    (m) => ({ default: m.PdfInfoModal })
  );

const loadpdf_metadata = () =>
  import('@hieudoanm.github.io/components/pages/start/modals/pdf/extract/PdfMetadataModal').then(
    (m) => ({ default: m.PdfMetadataModal })
  );

const loadpdf_ocr = () =>
  import('@hieudoanm.github.io/components/pages/start/modals/pdf/extract/PdfOcrModal').then(
    (m) => ({ default: m.PdfOcrModal })
  );

const loadpdf_repair = () =>
  import('@hieudoanm.github.io/components/pages/start/modals/pdf/extract/PdfRepairModal').then(
    (m) => ({ default: m.PdfRepairModal })
  );

export const loaders: Record<
  string,
  () => Promise<{ default: ComponentType<{ onClose: () => void }> }>
> = {
  'pdf-extract-images': loadpdf_extract_images,
  'pdf-extract-text': loadpdf_extract_text,
  'pdf-info': loadpdf_info,
  'pdf-metadata': loadpdf_metadata,
  'pdf-ocr': loadpdf_ocr,
  'pdf-repair': loadpdf_repair,
};
