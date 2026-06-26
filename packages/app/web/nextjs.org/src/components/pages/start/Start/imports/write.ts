import dynamic from 'next/dynamic';

export const WriteGenerateModal = dynamic(
  () =>
    import('@hieudoanm.github.io/components/pages/start/modals/write/WriteGenerateModal').then(
      (m) => m.WriteGenerateModal
    ),
  { ssr: false }
);
export const WriteImproveModal = dynamic(
  () =>
    import('@hieudoanm.github.io/components/pages/start/modals/write/WriteImproveModal').then(
      (m) => m.WriteImproveModal
    ),
  { ssr: false }
);
export const WriteSocialModal = dynamic(
  () =>
    import('@hieudoanm.github.io/components/pages/start/modals/write/WriteSocialModal').then(
      (m) => m.WriteSocialModal
    ),
  { ssr: false }
);
export const WriteBusinessModal = dynamic(
  () =>
    import('@hieudoanm.github.io/components/pages/start/modals/write/WriteBusinessModal').then(
      (m) => m.WriteBusinessModal
    ),
  { ssr: false }
);
export const WriteMarketingModal = dynamic(
  () =>
    import('@hieudoanm.github.io/components/pages/start/modals/write/WriteMarketingModal').then(
      (m) => m.WriteMarketingModal
    ),
  { ssr: false }
);
export const WriteLegalModal = dynamic(
  () =>
    import('@hieudoanm.github.io/components/pages/start/modals/write/WriteLegalModal').then(
      (m) => m.WriteLegalModal
    ),
  { ssr: false }
);
export const WriteContentModal = dynamic(
  () =>
    import('@hieudoanm.github.io/components/pages/start/modals/write/WriteContentModal').then(
      (m) => m.WriteContentModal
    ),
  { ssr: false }
);
export const WriteRealEstateModal = dynamic(
  () =>
    import('@hieudoanm.github.io/components/pages/start/modals/write/WriteRealEstateModal').then(
      (m) => m.WriteRealEstateModal
    ),
  { ssr: false }
);
