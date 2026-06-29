import { ComponentType, lazy } from 'react';

const loadimage_convert_gif_to_jpg = () =>
  import('@hieudoanm.github.io/components/pages/start/modals/image-edit/convert-legacy/ImageConvertGifToJpgModal').then(
    (m) => ({ default: m.ImageConvertGifToJpgModal })
  );

const loadimage_convert_gif_to_png = () =>
  import('@hieudoanm.github.io/components/pages/start/modals/image-edit/convert-legacy/ImageConvertGifToPngModal').then(
    (m) => ({ default: m.ImageConvertGifToPngModal })
  );

const loadimage_convert_heic_to_avif = () =>
  import('@hieudoanm.github.io/components/pages/start/modals/image-edit/convert-legacy/ImageConvertHeicToAvifModal').then(
    (m) => ({ default: m.ImageConvertHeicToAvifModal })
  );

const loadimage_convert_psd_to_jpg = () =>
  import('@hieudoanm.github.io/components/pages/start/modals/image-edit/convert-legacy/ImageConvertPsdToJpgModal').then(
    (m) => ({ default: m.ImageConvertPsdToJpgModal })
  );

const loadimage_convert_psd_to_png = () =>
  import('@hieudoanm.github.io/components/pages/start/modals/image-edit/convert-legacy/ImageConvertPsdToPngModal').then(
    (m) => ({ default: m.ImageConvertPsdToPngModal })
  );

const loadimage_convert_svg_to_png = () =>
  import('@hieudoanm.github.io/components/pages/start/modals/image-edit/convert-legacy/ImageConvertSvgToPngModal').then(
    (m) => ({ default: m.ImageConvertSvgToPngModal })
  );

const loadimage_convert_tiff_to_jpg = () =>
  import('@hieudoanm.github.io/components/pages/start/modals/image-edit/convert-legacy/ImageConvertTiffToJpgModal').then(
    (m) => ({ default: m.ImageConvertTiffToJpgModal })
  );

const loadimage_convert_tiff_to_png = () =>
  import('@hieudoanm.github.io/components/pages/start/modals/image-edit/convert-legacy/ImageConvertTiffToPngModal').then(
    (m) => ({ default: m.ImageConvertTiffToPngModal })
  );

const loadimage_convert_webp_to_avif = () =>
  import('@hieudoanm.github.io/components/pages/start/modals/image-edit/convert-legacy/ImageConvertWebpToAvifModal').then(
    (m) => ({ default: m.ImageConvertWebpToAvifModal })
  );

const loadimage_convert_webp_to_gif = () =>
  import('@hieudoanm.github.io/components/pages/start/modals/image-edit/convert-legacy/ImageConvertWebpToGifModal').then(
    (m) => ({ default: m.ImageConvertWebpToGifModal })
  );

export const loaders: Record<
  string,
  () => Promise<{ default: ComponentType<{ onClose: () => void }> }>
> = {
  'image-convert-gif-to-jpg': loadimage_convert_gif_to_jpg,
  'image-convert-gif-to-png': loadimage_convert_gif_to_png,
  'image-convert-heic-to-avif': loadimage_convert_heic_to_avif,
  'image-convert-psd-to-jpg': loadimage_convert_psd_to_jpg,
  'image-convert-psd-to-png': loadimage_convert_psd_to_png,
  'image-convert-svg-to-png': loadimage_convert_svg_to_png,
  'image-convert-tiff-to-jpg': loadimage_convert_tiff_to_jpg,
  'image-convert-tiff-to-png': loadimage_convert_tiff_to_png,
  'image-convert-webp-to-avif': loadimage_convert_webp_to_avif,
  'image-convert-webp-to-gif': loadimage_convert_webp_to_gif,
};
