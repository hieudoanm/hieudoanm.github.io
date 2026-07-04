import { ComponentType } from 'react';

const loadImageAdjust = () =>
  import('@hieudoanm.github.io/components/pages/start/apps/image-effect/ImageAdjustModal').then(
    (m) => ({ default: m.ImageAdjustModal })
  );

const loadImageBlurBackground = () =>
  import('@hieudoanm.github.io/components/pages/start/apps/image-effect/ImageBlurBackgroundModal').then(
    (m) => ({ default: m.ImageBlurBackgroundModal })
  );

const loadImageCombinerSideBySide = () =>
  import('@hieudoanm.github.io/components/pages/start/apps/image-effect/ImageCombinerSideBySideModal').then(
    (m) => ({ default: m.ImageCombinerSideBySideModal })
  );

const loadImageCombinerStacked = () =>
  import('@hieudoanm.github.io/components/pages/start/apps/image-effect/ImageCombinerStackedModal').then(
    (m) => ({ default: m.ImageCombinerStackedModal })
  );

const loadImagePhotoFilters = () =>
  import('@hieudoanm.github.io/components/pages/start/apps/image-effect/ImagePhotoFiltersModal').then(
    (m) => ({ default: m.ImagePhotoFiltersModal })
  );

const loadImagePixelateFace = () =>
  import('@hieudoanm.github.io/components/pages/start/apps/image-effect/ImagePixelateFaceModal').then(
    (m) => ({ default: m.ImagePixelateFaceModal })
  );

const loadImageShadow = () =>
  import('@hieudoanm.github.io/components/pages/start/apps/image-effect/ImageShadowModal').then(
    (m) => ({ default: m.ImageShadowModal })
  );

const loadImageText = () =>
  import('@hieudoanm.github.io/components/pages/start/apps/image-effect/ImageTextModal').then(
    (m) => ({ default: m.ImageTextModal })
  );

const loadImageTransparentBg = () =>
  import('@hieudoanm.github.io/components/pages/start/apps/image-effect/ImageTransparentBgModal').then(
    (m) => ({ default: m.ImageTransparentBgModal })
  );

const loadImageVignette = () =>
  import('@hieudoanm.github.io/components/pages/start/apps/image-effect/ImageVignetteModal').then(
    (m) => ({ default: m.ImageVignetteModal })
  );

const loadImageMorphing = () =>
  import('@hieudoanm.github.io/components/pages/start/apps/image-effect/ImageMorphingModal').then(
    (m) => ({ default: m.ImageMorphingModal })
  );

const loadImageWatermark = () =>
  import('@hieudoanm.github.io/components/pages/start/apps/image-effect/ImageWatermarkModal').then(
    (m) => ({ default: m.ImageWatermarkModal })
  );

export const loaders: Record<
  string,
  () => Promise<{ default: ComponentType<{ onClose: () => void }> }>
> = {
  'image-adjust': loadImageAdjust,
  'image-blur-background': loadImageBlurBackground,
  'image-combiner-side-by-side': loadImageCombinerSideBySide,
  'image-combiner-stacked': loadImageCombinerStacked,
  'image-morphing': loadImageMorphing,
  'image-photo-filters': loadImagePhotoFilters,
  'image-pixelate-face': loadImagePixelateFace,
  'image-shadow': loadImageShadow,
  'image-text': loadImageText,
  'image-transparent-bg': loadImageTransparentBg,
  'image-vignette': loadImageVignette,
  'image-watermark': loadImageWatermark,
};
