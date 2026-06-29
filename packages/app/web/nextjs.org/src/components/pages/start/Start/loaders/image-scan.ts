import { ComponentType, lazy } from 'react';

const loadqr_read = () =>
  import('@hieudoanm.github.io/components/pages/start/modals/image-scan/QrReadModal').then(
    (m) => ({ default: m.QrReadModal })
  );

const loadbarcode_read = () =>
  import('@hieudoanm.github.io/components/pages/start/modals/image-scan/BarcodeReadModal').then(
    (m) => ({ default: m.BarcodeReadModal })
  );

const loadimage_ocr = () =>
  import('@hieudoanm.github.io/components/pages/start/modals/image-scan/ImageOcrModal').then(
    (m) => ({ default: m.ImageOcrModal })
  );

const loadimage_dominant_color = () =>
  import('@hieudoanm.github.io/components/pages/start/modals/image-scan/ImageDominantColorModal').then(
    (m) => ({ default: m.ImageDominantColorModal })
  );

const loadinvoice_parser = () =>
  import('@hieudoanm.github.io/components/pages/start/modals/image-scan/InvoiceParserModal').then(
    (m) => ({ default: m.InvoiceParserModal })
  );

const loadimage_translate = () =>
  import('@hieudoanm.github.io/components/pages/start/modals/image-scan/ImageTranslateModal').then(
    (m) => ({ default: m.ImageTranslateModal })
  );

export const loaders: Record<
  string,
  () => Promise<{ default: ComponentType<{ onClose: () => void }> }>
> = {
  'qr-read': loadqr_read,
  'barcode-read': loadbarcode_read,
  'image-ocr': loadimage_ocr,
  'image-dominant-color': loadimage_dominant_color,
  'invoice-parser': loadinvoice_parser,
  'image-translate': loadimage_translate,
};
