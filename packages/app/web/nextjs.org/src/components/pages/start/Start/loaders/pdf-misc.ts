import { ComponentType, lazy } from 'react';

const loadpdf_security = () =>
  import('@hieudoanm.github.io/components/pages/start/modals/pdf/PdfSecurityModal').then(
    (m) => ({ default: m.PdfSecurityModal })
  );

const loadpdf_translate = () =>
  import('@hieudoanm.github.io/components/pages/start/modals/pdf/PdfTranslateModal').then(
    (m) => ({ default: m.PdfTranslateModal })
  );

const loadpdf_esign = () =>
  import('@hieudoanm.github.io/components/pages/start/modals/pdf/esign/PdfEsignModal').then(
    (m) => ({ default: m.PdfEsignModal })
  );

export const loaders: Record<
  string,
  () => Promise<{ default: ComponentType<{ onClose: () => void }> }>
> = {
  'pdf-security': loadpdf_security,
  'pdf-translate': loadpdf_translate,
  'pdf-esign': loadpdf_esign,
};
