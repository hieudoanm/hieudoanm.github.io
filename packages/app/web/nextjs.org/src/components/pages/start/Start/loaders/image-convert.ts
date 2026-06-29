import { ComponentType, lazy } from 'react';

const loadimage_convert_heic_to_jpg = () =>
  import('@hieudoanm.github.io/components/pages/start/modals/image-edit/convert-format/ImageConvertHeicToJpgModal').then(
    (m) => ({ default: m.ImageConvertHeicToJpgModal })
  );

const loadimage_convert_webp_to_jpg = () =>
  import('@hieudoanm.github.io/components/pages/start/modals/image-edit/convert-format/ImageConvertWebpToJpgModal').then(
    (m) => ({ default: m.ImageConvertWebpToJpgModal })
  );

const loadimage_convert_webp_to_png = () =>
  import('@hieudoanm.github.io/components/pages/start/modals/image-edit/convert-format/ImageConvertWebpToPngModal').then(
    (m) => ({ default: m.ImageConvertWebpToPngModal })
  );

const loadimage_convert_jpg_to_webp = () =>
  import('@hieudoanm.github.io/components/pages/start/modals/image-edit/convert-format/ImageConvertJpgToWebpModal').then(
    (m) => ({ default: m.ImageConvertJpgToWebpModal })
  );

const loadimage_convert_jpg_to_png = () =>
  import('@hieudoanm.github.io/components/pages/start/modals/image-edit/convert-format/ImageConvertJpgToPngModal').then(
    (m) => ({ default: m.ImageConvertJpgToPngModal })
  );

const loadimage_convert_png_to_webp = () =>
  import('@hieudoanm.github.io/components/pages/start/modals/image-edit/convert-format/ImageConvertPngToWebpModal').then(
    (m) => ({ default: m.ImageConvertPngToWebpModal })
  );

const loadimage_convert_png_to_jpg = () =>
  import('@hieudoanm.github.io/components/pages/start/modals/image-edit/convert-format/ImageConvertPngToJpgModal').then(
    (m) => ({ default: m.ImageConvertPngToJpgModal })
  );

const loadimage_convert_png_to_svg = () =>
  import('@hieudoanm.github.io/components/pages/start/modals/image-edit/convert-format/ImageConvertPngToSvgModal').then(
    (m) => ({ default: m.ImageConvertPngToSvgModal })
  );

export const loaders: Record<
  string,
  () => Promise<{ default: ComponentType<{ onClose: () => void }> }>
> = {
  'image-convert-heic-to-jpg': loadimage_convert_heic_to_jpg,
  'image-convert-webp-to-jpg': loadimage_convert_webp_to_jpg,
  'image-convert-webp-to-png': loadimage_convert_webp_to_png,
  'image-convert-jpg-to-webp': loadimage_convert_jpg_to_webp,
  'image-convert-jpg-to-png': loadimage_convert_jpg_to_png,
  'image-convert-png-to-webp': loadimage_convert_png_to_webp,
  'image-convert-png-to-jpg': loadimage_convert_png_to_jpg,
  'image-convert-png-to-svg': loadimage_convert_png_to_svg,
};
