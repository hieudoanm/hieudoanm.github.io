import { ComponentType } from 'react';

const loadPdfEsign = () =>
  import('@hieudoanm.github.io/components/pages/start/modals/pdf-misc/PdfEsignModal').then(
    (m) => ({ default: m.PdfEsignModal })
  );

const loadPdfSecurity = () =>
  import('@hieudoanm.github.io/components/pages/start/modals/pdf-misc/PdfSecurityModal').then(
    (m) => ({ default: m.PdfSecurityModal })
  );

const loadPdfTranslate = () =>
  import('@hieudoanm.github.io/components/pages/start/modals/pdf-misc/PdfTranslateModal').then(
    (m) => ({ default: m.PdfTranslateModal })
  );

export const loaders: Record<
  string,
  () => Promise<{ default: ComponentType<{ onClose: () => void }> }>
> = {
  'pdf-esign': loadPdfEsign,
  'pdf-security': loadPdfSecurity,
  'pdf-translate': loadPdfTranslate,
};
