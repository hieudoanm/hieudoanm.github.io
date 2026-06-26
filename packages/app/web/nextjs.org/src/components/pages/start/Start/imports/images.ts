import dynamic from 'next/dynamic';

export const InstaSizeModal = dynamic(
  () =>
    import('@hieudoanm.github.io/components/pages/start/modals/images/InstaSizeModal').then(
      (m) => m.InstaSizeModal
    ),
  { ssr: false }
);
export const InvoiceParserModal = dynamic(
  () =>
    import('@hieudoanm.github.io/components/pages/start/modals/images/InvoiceParserModal').then(
      (m) => m.InvoiceParserModal
    ),
  { ssr: false }
);
export const CameraModal = dynamic(
  () =>
    import('@hieudoanm.github.io/components/pages/start/modals/images/CameraModal').then(
      (m) => m.CameraModal
    ),
  { ssr: false }
);
export const BarcodeModal = dynamic(
  () =>
    import('@hieudoanm.github.io/components/pages/start/modals/images/BarcodeModal').then(
      (m) => m.BarcodeModal
    ),
  { ssr: false }
);
export const Base64Modal = dynamic(
  () =>
    import('@hieudoanm.github.io/components/pages/start/modals/images/Base64Modal').then(
      (m) => m.Base64Modal
    ),
  { ssr: false }
);
export const BreakingBadModal = dynamic(
  () =>
    import('@hieudoanm.github.io/components/pages/start/modals/images/BreakingBadModal').then(
      (m) => m.BreakingBadModal
    ),
  { ssr: false }
);
export const GitHubSocialPreviewModal = dynamic(
  () =>
    import('@hieudoanm.github.io/components/pages/start/modals/images/GitHubSocialPreviewModal').then(
      (m) => m.GitHubSocialPreviewModal
    ),
  { ssr: false }
);
export const HouseModal = dynamic(
  () =>
    import('@hieudoanm.github.io/components/pages/start/modals/images/HouseModal').then(
      (m) => m.HouseModal
    ),
  { ssr: false }
);
export const QRCodeModal = dynamic(
  () =>
    import('@hieudoanm.github.io/components/pages/start/modals/images/QRCodeModal').then(
      (m) => m.QRCodeModal
    ),
  { ssr: false }
);
export const YouTubeThumbnailsModal = dynamic(
  () =>
    import('@hieudoanm.github.io/components/pages/start/modals/images/YouTubeThumbnailsModal').then(
      (m) => m.YouTubeThumbnailsModal
    ),
  { ssr: false }
);
export const ImageAiModal = dynamic(
  () =>
    import('@hieudoanm.github.io/components/pages/start/modals/images/ImageAiModal').then(
      (m) => m.ImageAiModal
    ),
  { ssr: false }
);
export const ImageConvertModal = dynamic(
  () =>
    import('@hieudoanm.github.io/components/pages/start/modals/images/ImageConvertModal').then(
      (m) => m.ImageConvertModal
    ),
  { ssr: false }
);
export const ImageEditModal = dynamic(
  () =>
    import('@hieudoanm.github.io/components/pages/start/modals/images/ImageEditModal').then(
      (m) => m.ImageEditModal
    ),
  { ssr: false }
);
export const ImageCombinerModal = dynamic(
  () =>
    import('@hieudoanm.github.io/components/pages/start/modals/images/ImageCombinerModal').then(
      (m) => m.ImageCombinerModal
    ),
  { ssr: false }
);
export const ImageCreateModal = dynamic(
  () =>
    import('@hieudoanm.github.io/components/pages/start/modals/images/ImageCreateModal').then(
      (m) => m.ImageCreateModal
    ),
  { ssr: false }
);
export const ImageOcrModal = dynamic(
  () =>
    import('@hieudoanm.github.io/components/pages/start/modals/images/ImageOcrModal').then(
      (m) => m.ImageOcrModal
    ),
  { ssr: false }
);
export const ImageBlurModal = dynamic(
  () =>
    import('@hieudoanm.github.io/components/pages/start/modals/images/ImageBlurModal').then(
      (m) => m.ImageBlurModal
    ),
  { ssr: false }
);
export const ImageFilterModal = dynamic(
  () =>
    import('@hieudoanm.github.io/components/pages/start/modals/images/ImageFilterModal').then(
      (m) => m.ImageFilterModal
    ),
  { ssr: false }
);
export const ImageEffectModal = dynamic(
  () =>
    import('@hieudoanm.github.io/components/pages/start/modals/images/ImageEffectModal').then(
      (m) => m.ImageEffectModal
    ),
  { ssr: false }
);
export const ImageProfileModal = dynamic(
  () =>
    import('@hieudoanm.github.io/components/pages/start/modals/images/ImageProfileModal').then(
      (m) => m.ImageProfileModal
    ),
  { ssr: false }
);
