import { ComponentType, lazy } from 'react';

const loadimage_convert_png_to_jpg = () =>
  import('@hieudoanm.github.io/components/pages/start/modals/image-convert-png/ImageConvertPngToJpgModal').then(
    (m) => ({ default: m.ImageConvertPngToJpgModal })
  );

const loadimage_convert_png_to_webp = () =>
  import('@hieudoanm.github.io/components/pages/start/modals/image-convert-png/ImageConvertPngToWebpModal').then(
    (m) => ({ default: m.ImageConvertPngToWebpModal })
  );

const loadimage_convert_png_to_svg = () =>
  import('@hieudoanm.github.io/components/pages/start/modals/image-convert-png/ImageConvertPngToSvgModal').then(
    (m) => ({ default: m.ImageConvertPngToSvgModal })
  );

const loadimage_convert_png_to_avif = () =>
  import('@hieudoanm.github.io/components/pages/start/modals/image-convert-png/ImageConvertPngToAvifModal').then(
    (m) => ({ default: m.ImageConvertPngToAvifModal })
  );

const loadimage_convert_png_to_eps = () =>
  import('@hieudoanm.github.io/components/pages/start/modals/image-convert-png/ImageConvertPngToEpsModal').then(
    (m) => ({ default: m.ImageConvertPngToEpsModal })
  );

const loadimage_convert_png_to_gif = () =>
  import('@hieudoanm.github.io/components/pages/start/modals/image-convert-png/ImageConvertPngToGifModal').then(
    (m) => ({ default: m.ImageConvertPngToGifModal })
  );

const loadimage_convert_png_to_tiff = () =>
  import('@hieudoanm.github.io/components/pages/start/modals/image-convert-png/ImageConvertPngToTiffModal').then(
    (m) => ({ default: m.ImageConvertPngToTiffModal })
  );

export const loaders: Record<
  string,
  () => Promise<{ default: ComponentType<{ onClose: () => void }> }>
> = {
  'image-convert-png-to-jpg': loadimage_convert_png_to_jpg,
  'image-convert-png-to-webp': loadimage_convert_png_to_webp,
  'image-convert-png-to-svg': loadimage_convert_png_to_svg,
  'image-convert-png-to-avif': loadimage_convert_png_to_avif,
  'image-convert-png-to-eps': loadimage_convert_png_to_eps,
  'image-convert-png-to-gif': loadimage_convert_png_to_gif,
  'image-convert-png-to-tiff': loadimage_convert_png_to_tiff,
};
