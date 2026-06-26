import dynamic from 'next/dynamic';

export const PdfCombineModal = dynamic(
  () =>
    import('@hieudoanm.github.io/components/pages/start/modals/pdf/PdfCombineModal').then(
      (m) => m.PdfCombineModal
    ),
  { ssr: false }
);
export const PdfEditModal = dynamic(
  () =>
    import('@hieudoanm.github.io/components/pages/start/modals/pdf/PdfEditModal').then(
      (m) => m.PdfEditModal
    ),
  { ssr: false }
);
export const PdfExtractModal = dynamic(
  () =>
    import('@hieudoanm.github.io/components/pages/start/modals/pdf/PdfExtractModal').then(
      (m) => m.PdfExtractModal
    ),
  { ssr: false }
);
export const PdfInspectModal = dynamic(
  () =>
    import('@hieudoanm.github.io/components/pages/start/modals/pdf/PdfInspectModal').then(
      (m) => m.PdfInspectModal
    ),
  { ssr: false }
);
export const PdfMaintainModal = dynamic(
  () =>
    import('@hieudoanm.github.io/components/pages/start/modals/pdf/PdfMaintainModal').then(
      (m) => m.PdfMaintainModal
    ),
  { ssr: false }
);
export const PdfSecurityModal = dynamic(
  () =>
    import('@hieudoanm.github.io/components/pages/start/modals/pdf/PdfSecurityModal').then(
      (m) => m.PdfSecurityModal
    ),
  { ssr: false }
);
export const PdfArrangeModal = dynamic(
  () =>
    import('@hieudoanm.github.io/components/pages/start/modals/pdf/PdfArrangeModal').then(
      (m) => m.PdfArrangeModal
    ),
  { ssr: false }
);
export const PdfConvertModal = dynamic(
  () =>
    import('@hieudoanm.github.io/components/pages/start/modals/pdf/PdfConvertModal').then(
      (m) => m.PdfConvertModal
    ),
  { ssr: false }
);
export const PdfCreateModal = dynamic(
  () =>
    import('@hieudoanm.github.io/components/pages/start/modals/pdf/PdfCreateModal').then(
      (m) => m.PdfCreateModal
    ),
  { ssr: false }
);
export const PdfTranslateModal = dynamic(
  () =>
    import('@hieudoanm.github.io/components/pages/start/modals/pdf/PdfTranslateModal').then(
      (m) => m.PdfTranslateModal
    ),
  { ssr: false }
);
export const PdfEsignModal = dynamic(
  () =>
    import('@hieudoanm.github.io/components/pages/start/modals/pdf/PdfEsignModal').then(
      (m) => m.PdfEsignModal
    ),
  { ssr: false }
);
