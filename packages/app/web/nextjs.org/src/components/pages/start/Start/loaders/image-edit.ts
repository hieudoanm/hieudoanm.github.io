import { ComponentType, lazy } from 'react';

const loadimage_resize = () =>
  import('@hieudoanm.github.io/components/pages/start/modals/image-edit/ImageResizeModal').then(
    (m) => ({ default: m.ImageResizeModal })
  );

const loadimage_crop = () =>
  import('@hieudoanm.github.io/components/pages/start/modals/image-edit/ImageCropModal').then(
    (m) => ({ default: m.ImageCropModal })
  );

const loadimage_compress = () =>
  import('@hieudoanm.github.io/components/pages/start/modals/image-edit/ImageCompressModal').then(
    (m) => ({ default: m.ImageCompressModal })
  );

const loadimage_flip = () =>
  import('@hieudoanm.github.io/components/pages/start/modals/image-edit/ImageFlipModal').then(
    (m) => ({ default: m.ImageFlipModal })
  );

const loadimage_bw = () =>
  import('@hieudoanm.github.io/components/pages/start/modals/image-edit/ImageBwModal').then(
    (m) => ({ default: m.ImageBwModal })
  );

const loadimage_pixelate = () =>
  import('@hieudoanm.github.io/components/pages/start/modals/image-edit/ImagePixelateModal').then(
    (m) => ({ default: m.ImagePixelateModal })
  );

const loadimage_sharpen = () =>
  import('@hieudoanm.github.io/components/pages/start/modals/image-edit/ImageSharpenModal').then(
    (m) => ({ default: m.ImageSharpenModal })
  );

const loadimage_border = () =>
  import('@hieudoanm.github.io/components/pages/start/modals/image-edit/ImageBorderModal').then(
    (m) => ({ default: m.ImageBorderModal })
  );

const loadimage_round = () =>
  import('@hieudoanm.github.io/components/pages/start/modals/image-edit/ImageRoundModal').then(
    (m) => ({ default: m.ImageRoundModal })
  );

const loadimage_rotate = () =>
  import('@hieudoanm.github.io/components/pages/start/modals/image-edit/ImageRotateModal').then(
    (m) => ({ default: m.ImageRotateModal })
  );

const loadimage_split = () =>
  import('@hieudoanm.github.io/components/pages/start/modals/image-edit/ImageSplitModal').then(
    (m) => ({ default: m.ImageSplitModal })
  );

export const loaders: Record<
  string,
  () => Promise<{ default: ComponentType<{ onClose: () => void }> }>
> = {
  'image-resize': loadimage_resize,
  'image-crop': loadimage_crop,
  'image-compress': loadimage_compress,
  'image-flip': loadimage_flip,
  'image-bw': loadimage_bw,
  'image-pixelate': loadimage_pixelate,
  'image-sharpen': loadimage_sharpen,
  'image-border': loadimage_border,
  'image-round': loadimage_round,
  'image-rotate': loadimage_rotate,
  'image-split': loadimage_split,
};
