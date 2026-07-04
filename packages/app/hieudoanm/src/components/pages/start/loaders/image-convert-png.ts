import { ComponentType } from 'react';

const loadImageConvertPngToAvif = () =>
  import('@hieudoanm.github.io/components/pages/start/apps/image-convert-png/ImageConvertPngToAvifModal').then(
    (m) => ({ default: m.ImageConvertPngToAvifModal })
  );

const loadImageConvertPngToEps = () =>
  import('@hieudoanm.github.io/components/pages/start/apps/image-convert-png/ImageConvertPngToEpsModal').then(
    (m) => ({ default: m.ImageConvertPngToEpsModal })
  );

const loadImageConvertPngToGif = () =>
  import('@hieudoanm.github.io/components/pages/start/apps/image-convert-png/ImageConvertPngToGifModal').then(
    (m) => ({ default: m.ImageConvertPngToGifModal })
  );

const loadImageConvertPngToJpg = () =>
  import('@hieudoanm.github.io/components/pages/start/apps/image-convert-png/ImageConvertPngToJpgModal').then(
    (m) => ({ default: m.ImageConvertPngToJpgModal })
  );

const loadImageConvertPngToSvg = () =>
  import('@hieudoanm.github.io/components/pages/start/apps/image-convert-png/ImageConvertPngToSvgModal').then(
    (m) => ({ default: m.ImageConvertPngToSvgModal })
  );

const loadImageConvertPngToTiff = () =>
  import('@hieudoanm.github.io/components/pages/start/apps/image-convert-png/ImageConvertPngToTiffModal').then(
    (m) => ({ default: m.ImageConvertPngToTiffModal })
  );

const loadImageConvertPngToWebp = () =>
  import('@hieudoanm.github.io/components/pages/start/apps/image-convert-png/ImageConvertPngToWebpModal').then(
    (m) => ({ default: m.ImageConvertPngToWebpModal })
  );

export const loaders: Record<
  string,
  () => Promise<{ default: ComponentType<{ onClose: () => void }> }>
> = {
  'image-convert-png-to-avif': loadImageConvertPngToAvif,
  'image-convert-png-to-eps': loadImageConvertPngToEps,
  'image-convert-png-to-gif': loadImageConvertPngToGif,
  'image-convert-png-to-jpg': loadImageConvertPngToJpg,
  'image-convert-png-to-svg': loadImageConvertPngToSvg,
  'image-convert-png-to-tiff': loadImageConvertPngToTiff,
  'image-convert-png-to-webp': loadImageConvertPngToWebp,
};
