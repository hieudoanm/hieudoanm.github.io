import { ComponentType, lazy } from 'react';

const loadimage_convert_webp_to_jpg = () =>
  import('@hieudoanm.github.io/components/pages/start/modals/image-convert-webp/ImageConvertWebpToJpgModal').then(
    (m) => ({ default: m.ImageConvertWebpToJpgModal })
  );

const loadimage_convert_webp_to_png = () =>
  import('@hieudoanm.github.io/components/pages/start/modals/image-convert-webp/ImageConvertWebpToPngModal').then(
    (m) => ({ default: m.ImageConvertWebpToPngModal })
  );

const loadimage_convert_webp_to_avif = () =>
  import('@hieudoanm.github.io/components/pages/start/modals/image-convert-webp/ImageConvertWebpToAvifModal').then(
    (m) => ({ default: m.ImageConvertWebpToAvifModal })
  );

const loadimage_convert_webp_to_gif = () =>
  import('@hieudoanm.github.io/components/pages/start/modals/image-convert-webp/ImageConvertWebpToGifModal').then(
    (m) => ({ default: m.ImageConvertWebpToGifModal })
  );

export const loaders: Record<
  string,
  () => Promise<{ default: ComponentType<{ onClose: () => void }> }>
> = {
  'image-convert-webp-to-jpg': loadimage_convert_webp_to_jpg,
  'image-convert-webp-to-png': loadimage_convert_webp_to_png,
  'image-convert-webp-to-avif': loadimage_convert_webp_to_avif,
  'image-convert-webp-to-gif': loadimage_convert_webp_to_gif,
};
