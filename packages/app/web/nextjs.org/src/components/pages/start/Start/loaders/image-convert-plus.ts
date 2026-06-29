import { ComponentType, lazy } from 'react';

const loadimage_convert_heic_to_png = () =>
  import('@hieudoanm.github.io/components/pages/start/modals/image-convert-plus/ImageConvertHeicToPngModal').then(
    (m) => ({ default: m.ImageConvertHeicToPngModal })
  );

const loadimage_convert_jpg_to_avif = () =>
  import('@hieudoanm.github.io/components/pages/start/modals/image-convert-plus/ImageConvertJpgToAvifModal').then(
    (m) => ({ default: m.ImageConvertJpgToAvifModal })
  );

const loadimage_convert_jpg_to_gif = () =>
  import('@hieudoanm.github.io/components/pages/start/modals/image-convert-plus/ImageConvertJpgToGifModal').then(
    (m) => ({ default: m.ImageConvertJpgToGifModal })
  );

const loadimage_convert_jpg_to_svg = () =>
  import('@hieudoanm.github.io/components/pages/start/modals/image-convert-plus/ImageConvertJpgToSvgModal').then(
    (m) => ({ default: m.ImageConvertJpgToSvgModal })
  );

const loadimage_convert_jpg_to_tiff = () =>
  import('@hieudoanm.github.io/components/pages/start/modals/image-convert-plus/ImageConvertJpgToTiffModal').then(
    (m) => ({ default: m.ImageConvertJpgToTiffModal })
  );

const loadimage_convert_png_to_avif = () =>
  import('@hieudoanm.github.io/components/pages/start/modals/image-convert-plus/ImageConvertPngToAvifModal').then(
    (m) => ({ default: m.ImageConvertPngToAvifModal })
  );

const loadimage_convert_png_to_eps = () =>
  import('@hieudoanm.github.io/components/pages/start/modals/image-convert-plus/ImageConvertPngToEpsModal').then(
    (m) => ({ default: m.ImageConvertPngToEpsModal })
  );

const loadimage_convert_png_to_gif = () =>
  import('@hieudoanm.github.io/components/pages/start/modals/image-convert-plus/ImageConvertPngToGifModal').then(
    (m) => ({ default: m.ImageConvertPngToGifModal })
  );

const loadimage_convert_png_to_tiff = () =>
  import('@hieudoanm.github.io/components/pages/start/modals/image-convert-plus/ImageConvertPngToTiffModal').then(
    (m) => ({ default: m.ImageConvertPngToTiffModal })
  );

export const loaders: Record<
  string,
  () => Promise<{ default: ComponentType<{ onClose: () => void }> }>
> = {
  'image-convert-heic-to-png': loadimage_convert_heic_to_png,
  'image-convert-jpg-to-avif': loadimage_convert_jpg_to_avif,
  'image-convert-jpg-to-gif': loadimage_convert_jpg_to_gif,
  'image-convert-jpg-to-svg': loadimage_convert_jpg_to_svg,
  'image-convert-jpg-to-tiff': loadimage_convert_jpg_to_tiff,
  'image-convert-png-to-avif': loadimage_convert_png_to_avif,
  'image-convert-png-to-eps': loadimage_convert_png_to_eps,
  'image-convert-png-to-gif': loadimage_convert_png_to_gif,
  'image-convert-png-to-tiff': loadimage_convert_png_to_tiff,
};
