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
const loadpdf_esign = () =>
  import('@hieudoanm.github.io/components/pages/start/modals/pdf/esign/PdfEsignModal').then(
    (m) => ({ default: m.PdfEsignModal })
  );
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
const loadpdf_merge = () =>
  import('@hieudoanm.github.io/components/pages/start/modals/pdf/edit/PdfMergeModal').then(
    (m) => ({ default: m.PdfMergeModal })
  );
const loadpdf_metadata = () =>
  import('@hieudoanm.github.io/components/pages/start/modals/pdf/extract/PdfMetadataModal').then(
    (m) => ({ default: m.PdfMetadataModal })
  );
const loadpdf_ocr = () =>
  import('@hieudoanm.github.io/components/pages/start/modals/pdf/extract/PdfOcrModal').then(
    (m) => ({ default: m.PdfOcrModal })
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
const loadpdf_repair = () =>
  import('@hieudoanm.github.io/components/pages/start/modals/pdf/extract/PdfRepairModal').then(
    (m) => ({ default: m.PdfRepairModal })
  );
const loadpdf_rotate = () =>
  import('@hieudoanm.github.io/components/pages/start/modals/pdf/edit/PdfRotateModal').then(
    (m) => ({ default: m.PdfRotateModal })
  );
const loadpdf_security = () =>
  import('@hieudoanm.github.io/components/pages/start/modals/pdf/PdfSecurityModal').then(
    (m) => ({ default: m.PdfSecurityModal })
  );
const loadpdf_split = () =>
  import('@hieudoanm.github.io/components/pages/start/modals/pdf/edit/PdfSplitModal').then(
    (m) => ({ default: m.PdfSplitModal })
  );
const loadpdf_to_epub = () =>
  import('@hieudoanm.github.io/components/pages/start/modals/pdf/to-doc/PdfToEpubModal').then(
    (m) => ({ default: m.PdfToEpubModal })
  );
const loadpdf_to_excel = () =>
  import('@hieudoanm.github.io/components/pages/start/modals/pdf/to-doc/PdfToExcelModal').then(
    (m) => ({ default: m.PdfToExcelModal })
  );
const loadpdf_to_images = () =>
  import('@hieudoanm.github.io/components/pages/start/modals/pdf/to-doc/PdfToImagesModal').then(
    (m) => ({ default: m.PdfToImagesModal })
  );
const loadpdf_to_ppt = () =>
  import('@hieudoanm.github.io/components/pages/start/modals/pdf/to-doc/PdfToPptModal').then(
    (m) => ({ default: m.PdfToPptModal })
  );
const loadpdf_to_word = () =>
  import('@hieudoanm.github.io/components/pages/start/modals/pdf/to-doc/PdfToWordModal').then(
    (m) => ({ default: m.PdfToWordModal })
  );
const loadpdf_watermark = () =>
  import('@hieudoanm.github.io/components/pages/start/modals/pdf/edit/PdfWatermarkModal').then(
    (m) => ({ default: m.PdfWatermarkModal })
  );
const loadpdf_translate = () =>
  import('@hieudoanm.github.io/components/pages/start/modals/pdf/PdfTranslateModal').then(
    (m) => ({ default: m.PdfTranslateModal })
  );

export const loaders: Record<
  string,
  () => Promise<{ default: ComponentType<{ onClose: () => void }> }>
> = {
  'pdf-annotate': loadpdf_annotate,
  'pdf-compress': loadpdf_compress,
  'pdf-crop': loadpdf_crop,
  'pdf-delete-pages': loadpdf_delete_pages,
  'pdf-esign': loadpdf_esign,
  'pdf-extract-images': loadpdf_extract_images,
  'pdf-extract-text': loadpdf_extract_text,
  'pdf-info': loadpdf_info,
  'pdf-merge': loadpdf_merge,
  'pdf-metadata': loadpdf_metadata,
  'pdf-ocr': loadpdf_ocr,
  'pdf-page-numbers': loadpdf_page_numbers,
  'pdf-rearrange': loadpdf_rearrange,
  'pdf-redact': loadpdf_redact,
  'pdf-repair': loadpdf_repair,
  'pdf-rotate': loadpdf_rotate,
  'pdf-security': loadpdf_security,
  'pdf-split': loadpdf_split,
  'pdf-to-epub': loadpdf_to_epub,
  'pdf-to-excel': loadpdf_to_excel,
  'pdf-to-images': loadpdf_to_images,
  'pdf-to-ppt': loadpdf_to_ppt,
  'pdf-to-word': loadpdf_to_word,
  'pdf-watermark': loadpdf_watermark,
  'pdf-translate': loadpdf_translate,
};
