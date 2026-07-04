import { ComponentType } from 'react';

const loadImageConvertJpgToAvif = () =>
  import('@hieudoanm.github.io/components/pages/start/apps/image-convert-jpg/ImageConvertJpgToAvifModal').then(
    (m) => ({ default: m.ImageConvertJpgToAvifModal })
  );

const loadImageConvertJpgToGif = () =>
  import('@hieudoanm.github.io/components/pages/start/apps/image-convert-jpg/ImageConvertJpgToGifModal').then(
    (m) => ({ default: m.ImageConvertJpgToGifModal })
  );

const loadImageConvertJpgToPng = () =>
  import('@hieudoanm.github.io/components/pages/start/apps/image-convert-jpg/ImageConvertJpgToPngModal').then(
    (m) => ({ default: m.ImageConvertJpgToPngModal })
  );

const loadImageConvertJpgToSvg = () =>
  import('@hieudoanm.github.io/components/pages/start/apps/image-convert-jpg/ImageConvertJpgToSvgModal').then(
    (m) => ({ default: m.ImageConvertJpgToSvgModal })
  );

const loadImageConvertJpgToTiff = () =>
  import('@hieudoanm.github.io/components/pages/start/apps/image-convert-jpg/ImageConvertJpgToTiffModal').then(
    (m) => ({ default: m.ImageConvertJpgToTiffModal })
  );

const loadImageConvertJpgToWebp = () =>
  import('@hieudoanm.github.io/components/pages/start/apps/image-convert-jpg/ImageConvertJpgToWebpModal').then(
    (m) => ({ default: m.ImageConvertJpgToWebpModal })
  );

export const loaders: Record<
  string,
  () => Promise<{ default: ComponentType<{ onClose: () => void }> }>
> = {
  'image-convert-jpg-to-avif': loadImageConvertJpgToAvif,
  'image-convert-jpg-to-gif': loadImageConvertJpgToGif,
  'image-convert-jpg-to-png': loadImageConvertJpgToPng,
  'image-convert-jpg-to-svg': loadImageConvertJpgToSvg,
  'image-convert-jpg-to-tiff': loadImageConvertJpgToTiff,
  'image-convert-jpg-to-webp': loadImageConvertJpgToWebp,
};
