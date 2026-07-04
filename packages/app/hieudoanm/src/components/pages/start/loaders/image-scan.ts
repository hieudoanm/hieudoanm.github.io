import { ComponentType } from 'react';

const loadBarcode = () =>
  import('@hieudoanm.github.io/components/pages/start/apps/image-scan/BarcodeModal').then(
    (m) => ({ default: m.BarcodeModal })
  );

const loadBarcodeRead = () =>
  import('@hieudoanm.github.io/components/pages/start/apps/image-scan/BarcodeReadModal').then(
    (m) => ({ default: m.BarcodeReadModal })
  );

const loadImageOcr = () =>
  import('@hieudoanm.github.io/components/pages/start/apps/image-scan/ImageOcrModal').then(
    (m) => ({ default: m.ImageOcrModal })
  );

const loadImageTranslate = () =>
  import('@hieudoanm.github.io/components/pages/start/apps/image-scan/ImageTranslateModal').then(
    (m) => ({ default: m.ImageTranslateModal })
  );

const loadInvoiceParser = () =>
  import('@hieudoanm.github.io/components/pages/start/apps/image-scan/InvoiceParserModal').then(
    (m) => ({ default: m.InvoiceParserModal })
  );

const loadQRCode = () =>
  import('@hieudoanm.github.io/components/pages/start/apps/image-scan/QRCodeModal').then(
    (m) => ({ default: m.QRCodeModal })
  );

const loadQrRead = () =>
  import('@hieudoanm.github.io/components/pages/start/apps/image-scan/QrReadModal').then(
    (m) => ({ default: m.QrReadModal })
  );

export const loaders: Record<
  string,
  () => Promise<{ default: ComponentType<{ onClose: () => void }> }>
> = {
  barcode: loadBarcode,
  'barcode-read': loadBarcodeRead,
  'image-ocr': loadImageOcr,
  'image-translate': loadImageTranslate,
  'invoice-parser': loadInvoiceParser,
  qr: loadQRCode,
  'qr-read': loadQrRead,
};
