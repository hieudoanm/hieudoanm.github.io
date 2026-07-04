import { ComponentType } from 'react';

const loadImageConvertWebpToAvif = () =>
  import('@hieudoanm.github.io/components/pages/start/apps/image-convert-webp/ImageConvertWebpToAvifModal').then(
    (m) => ({ default: m.ImageConvertWebpToAvifModal })
  );

const loadImageConvertWebpToGif = () =>
  import('@hieudoanm.github.io/components/pages/start/apps/image-convert-webp/ImageConvertWebpToGifModal').then(
    (m) => ({ default: m.ImageConvertWebpToGifModal })
  );

const loadImageConvertWebpToJpg = () =>
  import('@hieudoanm.github.io/components/pages/start/apps/image-convert-webp/ImageConvertWebpToJpgModal').then(
    (m) => ({ default: m.ImageConvertWebpToJpgModal })
  );

const loadImageConvertWebpToPng = () =>
  import('@hieudoanm.github.io/components/pages/start/apps/image-convert-webp/ImageConvertWebpToPngModal').then(
    (m) => ({ default: m.ImageConvertWebpToPngModal })
  );

export const loaders: Record<
  string,
  () => Promise<{ default: ComponentType<{ onClose: () => void }> }>
> = {
  'image-convert-webp-to-avif': loadImageConvertWebpToAvif,
  'image-convert-webp-to-gif': loadImageConvertWebpToGif,
  'image-convert-webp-to-jpg': loadImageConvertWebpToJpg,
  'image-convert-webp-to-png': loadImageConvertWebpToPng,
};
