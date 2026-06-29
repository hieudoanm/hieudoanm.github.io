import { ComponentType } from 'react';

const loadPdfAnnotate = () =>
  import('@hieudoanm.github.io/components/pages/start/modals/pdf-edit/PdfAnnotateModal').then(
    (m) => ({ default: m.PdfAnnotateModal })
  );

const loadPdfCompress = () =>
  import('@hieudoanm.github.io/components/pages/start/modals/pdf-edit/PdfCompressModal').then(
    (m) => ({ default: m.PdfCompressModal })
  );

const loadPdfCrop = () =>
  import('@hieudoanm.github.io/components/pages/start/modals/pdf-edit/PdfCropModal').then(
    (m) => ({ default: m.PdfCropModal })
  );

const loadPdfDeletePages = () =>
  import('@hieudoanm.github.io/components/pages/start/modals/pdf-edit/PdfDeletePagesModal').then(
    (m) => ({ default: m.PdfDeletePagesModal })
  );

const loadPdfMerge = () =>
  import('@hieudoanm.github.io/components/pages/start/modals/pdf-edit/PdfMergeModal').then(
    (m) => ({ default: m.PdfMergeModal })
  );

const loadPdfPageNumbers = () =>
  import('@hieudoanm.github.io/components/pages/start/modals/pdf-edit/PdfPageNumbersModal').then(
    (m) => ({ default: m.PdfPageNumbersModal })
  );

const loadPdfRearrange = () =>
  import('@hieudoanm.github.io/components/pages/start/modals/pdf-edit/PdfRearrangeModal').then(
    (m) => ({ default: m.PdfRearrangeModal })
  );

const loadPdfRedact = () =>
  import('@hieudoanm.github.io/components/pages/start/modals/pdf-edit/PdfRedactModal').then(
    (m) => ({ default: m.PdfRedactModal })
  );

const loadPdfRotate = () =>
  import('@hieudoanm.github.io/components/pages/start/modals/pdf-edit/PdfRotateModal').then(
    (m) => ({ default: m.PdfRotateModal })
  );

const loadPdfSplit = () =>
  import('@hieudoanm.github.io/components/pages/start/modals/pdf-edit/PdfSplitModal').then(
    (m) => ({ default: m.PdfSplitModal })
  );

const loadPdfWatermark = () =>
  import('@hieudoanm.github.io/components/pages/start/modals/pdf-edit/PdfWatermarkModal').then(
    (m) => ({ default: m.PdfWatermarkModal })
  );

export const loaders: Record<
  string,
  () => Promise<{ default: ComponentType<{ onClose: () => void }> }>
> = {
  'pdf-annotate': loadPdfAnnotate,
  'pdf-compress': loadPdfCompress,
  'pdf-crop': loadPdfCrop,
  'pdf-delete-pages': loadPdfDeletePages,
  'pdf-merge': loadPdfMerge,
  'pdf-page-numbers': loadPdfPageNumbers,
  'pdf-rearrange': loadPdfRearrange,
  'pdf-redact': loadPdfRedact,
  'pdf-rotate': loadPdfRotate,
  'pdf-split': loadPdfSplit,
  'pdf-watermark': loadPdfWatermark,
};
