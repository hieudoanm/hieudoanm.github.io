import { ComponentType, lazy } from 'react';

const loadimage_convert_jpg_to_png = () =>
  import('@hieudoanm.github.io/components/pages/start/modals/image-convert-jpg/ImageConvertJpgToPngModal').then(
    (m) => ({ default: m.ImageConvertJpgToPngModal })
  );

const loadimage_convert_jpg_to_webp = () =>
  import('@hieudoanm.github.io/components/pages/start/modals/image-convert-jpg/ImageConvertJpgToWebpModal').then(
    (m) => ({ default: m.ImageConvertJpgToWebpModal })
  );

const loadimage_convert_jpg_to_avif = () =>
  import('@hieudoanm.github.io/components/pages/start/modals/image-convert-jpg/ImageConvertJpgToAvifModal').then(
    (m) => ({ default: m.ImageConvertJpgToAvifModal })
  );

const loadimage_convert_jpg_to_gif = () =>
  import('@hieudoanm.github.io/components/pages/start/modals/image-convert-jpg/ImageConvertJpgToGifModal').then(
    (m) => ({ default: m.ImageConvertJpgToGifModal })
  );

const loadimage_convert_jpg_to_svg = () =>
  import('@hieudoanm.github.io/components/pages/start/modals/image-convert-jpg/ImageConvertJpgToSvgModal').then(
    (m) => ({ default: m.ImageConvertJpgToSvgModal })
  );

const loadimage_convert_jpg_to_tiff = () =>
  import('@hieudoanm.github.io/components/pages/start/modals/image-convert-jpg/ImageConvertJpgToTiffModal').then(
    (m) => ({ default: m.ImageConvertJpgToTiffModal })
  );

export const loaders: Record<
  string,
  () => Promise<{ default: ComponentType<{ onClose: () => void }> }>
> = {
  'image-convert-jpg-to-png': loadimage_convert_jpg_to_png,
  'image-convert-jpg-to-webp': loadimage_convert_jpg_to_webp,
  'image-convert-jpg-to-avif': loadimage_convert_jpg_to_avif,
  'image-convert-jpg-to-gif': loadimage_convert_jpg_to_gif,
  'image-convert-jpg-to-svg': loadimage_convert_jpg_to_svg,
  'image-convert-jpg-to-tiff': loadimage_convert_jpg_to_tiff,
};
