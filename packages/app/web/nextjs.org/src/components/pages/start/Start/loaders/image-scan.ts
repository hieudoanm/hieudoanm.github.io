import { ComponentType, lazy } from 'react';

const loadinvoice_parser = () =>
  import('@hieudoanm.github.io/components/pages/start/modals/image-scan/InvoiceParserModal').then(
    (m) => ({ default: m.InvoiceParserModal })
  );
const loadqr_read = () =>
  import('@hieudoanm.github.io/components/pages/start/modals/image-scan/QrReadModal').then(
    (m) => ({ default: m.QrReadModal })
  );

export const loaders: Record<
  string,
  () => Promise<{ default: ComponentType<{ onClose: () => void }> }>
> = {
  'invoice-parser': loadinvoice_parser,
  'qr-read': loadqr_read,
};
