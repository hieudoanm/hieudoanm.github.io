import { ComponentType, lazy } from 'react';

const loadpdf_annotate = () =>
  import('@hieudoanm.github.io/components/pages/start/modals/pdf/edit/PdfAnnotateModal').then(
    (m) => ({ default: m.PdfAnnotateModal })
  );

const loadpdf_compress = () =>
  import('@hieudoanm.github.io/components/pages/start/modals/pdf/edit/PdfCompressModal').then(
    (m) => ({ default: m.PdfCompressModal })
  );

const loadpdf_crop = () =>
  import('@hieudoanm.github.io/components/pages/start/modals/pdf/edit/PdfCropModal').then(
    (m) => ({ default: m.PdfCropModal })
  );

const loadpdf_delete_pages = () =>
  import('@hieudoanm.github.io/components/pages/start/modals/pdf/edit/PdfDeletePagesModal').then(
    (m) => ({ default: m.PdfDeletePagesModal })
  );

const loadpdf_merge = () =>
  import('@hieudoanm.github.io/components/pages/start/modals/pdf/edit/PdfMergeModal').then(
    (m) => ({ default: m.PdfMergeModal })
  );

const loadpdf_page_numbers = () =>
  import('@hieudoanm.github.io/components/pages/start/modals/pdf/edit/PdfPageNumbersModal').then(
    (m) => ({ default: m.PdfPageNumbersModal })
  );

const loadpdf_rearrange = () =>
  import('@hieudoanm.github.io/components/pages/start/modals/pdf/edit/PdfRearrangeModal').then(
    (m) => ({ default: m.PdfRearrangeModal })
  );

const loadpdf_redact = () =>
  import('@hieudoanm.github.io/components/pages/start/modals/pdf/edit/PdfRedactModal').then(
    (m) => ({ default: m.PdfRedactModal })
  );

const loadpdf_rotate = () =>
  import('@hieudoanm.github.io/components/pages/start/modals/pdf/edit/PdfRotateModal').then(
    (m) => ({ default: m.PdfRotateModal })
  );

const loadpdf_split = () =>
  import('@hieudoanm.github.io/components/pages/start/modals/pdf/edit/PdfSplitModal').then(
    (m) => ({ default: m.PdfSplitModal })
  );

const loadpdf_watermark = () =>
  import('@hieudoanm.github.io/components/pages/start/modals/pdf/edit/PdfWatermarkModal').then(
    (m) => ({ default: m.PdfWatermarkModal })
  );

export const loaders: Record<
  string,
  () => Promise<{ default: ComponentType<{ onClose: () => void }> }>
> = {
  'pdf-annotate': loadpdf_annotate,
  'pdf-compress': loadpdf_compress,
  'pdf-crop': loadpdf_crop,
  'pdf-delete-pages': loadpdf_delete_pages,
  'pdf-merge': loadpdf_merge,
  'pdf-page-numbers': loadpdf_page_numbers,
  'pdf-rearrange': loadpdf_rearrange,
  'pdf-redact': loadpdf_redact,
  'pdf-rotate': loadpdf_rotate,
  'pdf-split': loadpdf_split,
  'pdf-watermark': loadpdf_watermark,
};
