import { ComponentType } from 'react';

const loadImageBorder = () =>
  import('@hieudoanm.github.io/components/pages/start/modals/image-edit/ImageBorderModal').then(
    (m) => ({ default: m.ImageBorderModal })
  );

const loadImageBw = () =>
  import('@hieudoanm.github.io/components/pages/start/modals/image-edit/ImageBwModal').then(
    (m) => ({ default: m.ImageBwModal })
  );

const loadImageCompress = () =>
  import('@hieudoanm.github.io/components/pages/start/modals/image-edit/ImageCompressModal').then(
    (m) => ({ default: m.ImageCompressModal })
  );

const loadImageCrop = () =>
  import('@hieudoanm.github.io/components/pages/start/modals/image-edit/ImageCropModal').then(
    (m) => ({ default: m.ImageCropModal })
  );

const loadImageFlip = () =>
  import('@hieudoanm.github.io/components/pages/start/modals/image-edit/ImageFlipModal').then(
    (m) => ({ default: m.ImageFlipModal })
  );

const loadImagePixelate = () =>
  import('@hieudoanm.github.io/components/pages/start/modals/image-edit/ImagePixelateModal').then(
    (m) => ({ default: m.ImagePixelateModal })
  );

const loadImageResize = () =>
  import('@hieudoanm.github.io/components/pages/start/modals/image-edit/ImageResizeModal').then(
    (m) => ({ default: m.ImageResizeModal })
  );

const loadImageRotate = () =>
  import('@hieudoanm.github.io/components/pages/start/modals/image-edit/ImageRotateModal').then(
    (m) => ({ default: m.ImageRotateModal })
  );

const loadImageRound = () =>
  import('@hieudoanm.github.io/components/pages/start/modals/image-edit/ImageRoundModal').then(
    (m) => ({ default: m.ImageRoundModal })
  );

const loadImageSharpen = () =>
  import('@hieudoanm.github.io/components/pages/start/modals/image-edit/ImageSharpenModal').then(
    (m) => ({ default: m.ImageSharpenModal })
  );

const loadImageSplit = () =>
  import('@hieudoanm.github.io/components/pages/start/modals/image-edit/ImageSplitModal').then(
    (m) => ({ default: m.ImageSplitModal })
  );

export const loaders: Record<
  string,
  () => Promise<{ default: ComponentType<{ onClose: () => void }> }>
> = {
  'image-border': loadImageBorder,
  'image-bw': loadImageBw,
  'image-compress': loadImageCompress,
  'image-crop': loadImageCrop,
  'image-flip': loadImageFlip,
  'image-pixelate': loadImagePixelate,
  'image-resize': loadImageResize,
  'image-rotate': loadImageRotate,
  'image-round': loadImageRound,
  'image-sharpen': loadImageSharpen,
  'image-split': loadImageSplit,
};
