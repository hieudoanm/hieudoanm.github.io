import { ComponentType, lazy } from 'react';

const loadimage_blur_background = () =>
  import('@hieudoanm.github.io/components/pages/start/modals/image-effect/ImageBlurBackgroundModal').then(
    (m) => ({ default: m.ImageBlurBackgroundModal })
  );

const loadimage_colorize = () =>
  import('@hieudoanm.github.io/components/pages/start/modals/image-effect/ImageColorizeModal').then(
    (m) => ({ default: m.ImageColorizeModal })
  );

const loadimage_transparent_bg = () =>
  import('@hieudoanm.github.io/components/pages/start/modals/image-effect/ImageTransparentBgModal').then(
    (m) => ({ default: m.ImageTransparentBgModal })
  );

const loadimage_photo_filters = () =>
  import('@hieudoanm.github.io/components/pages/start/modals/image-effect/ImagePhotoFiltersModal').then(
    (m) => ({ default: m.ImagePhotoFiltersModal })
  );

const loadimage_adjust = () =>
  import('@hieudoanm.github.io/components/pages/start/modals/image-effect/ImageAdjustModal').then(
    (m) => ({ default: m.ImageAdjustModal })
  );

const loadimage_vignette = () =>
  import('@hieudoanm.github.io/components/pages/start/modals/image-effect/ImageVignetteModal').then(
    (m) => ({ default: m.ImageVignetteModal })
  );

const loadimage_shadow = () =>
  import('@hieudoanm.github.io/components/pages/start/modals/image-effect/ImageShadowModal').then(
    (m) => ({ default: m.ImageShadowModal })
  );

const loadimage_watermark = () =>
  import('@hieudoanm.github.io/components/pages/start/modals/image-effect/ImageWatermarkModal').then(
    (m) => ({ default: m.ImageWatermarkModal })
  );

const loadimage_text = () =>
  import('@hieudoanm.github.io/components/pages/start/modals/image-effect/ImageTextModal').then(
    (m) => ({ default: m.ImageTextModal })
  );

const loadimage_combiner_side_by_side = () =>
  import('@hieudoanm.github.io/components/pages/start/modals/image-effect/ImageCombinerSideBySideModal').then(
    (m) => ({ default: m.ImageCombinerSideBySideModal })
  );

const loadimage_combiner_stacked = () =>
  import('@hieudoanm.github.io/components/pages/start/modals/image-effect/ImageCombinerStackedModal').then(
    (m) => ({ default: m.ImageCombinerStackedModal })
  );

export const loaders: Record<
  string,
  () => Promise<{ default: ComponentType<{ onClose: () => void }> }>
> = {
  'image-blur-background': loadimage_blur_background,
  'image-colorize': loadimage_colorize,
  'image-transparent-bg': loadimage_transparent_bg,
  'image-photo-filters': loadimage_photo_filters,
  'image-adjust': loadimage_adjust,
  'image-vignette': loadimage_vignette,
  'image-shadow': loadimage_shadow,
  'image-watermark': loadimage_watermark,
  'image-text': loadimage_text,
  'image-combiner-side-by-side': loadimage_combiner_side_by_side,
  'image-combiner-stacked': loadimage_combiner_stacked,
};
