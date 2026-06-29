import { ComponentType, lazy } from 'react';

const loadimage_convert_heic_to_jpg = () =>
  import('@hieudoanm.github.io/components/pages/start/modals/image-convert-heic/ImageConvertHeicToJpgModal').then(
    (m) => ({ default: m.ImageConvertHeicToJpgModal })
  );

const loadimage_convert_heic_to_png = () =>
  import('@hieudoanm.github.io/components/pages/start/modals/image-convert-heic/ImageConvertHeicToPngModal').then(
    (m) => ({ default: m.ImageConvertHeicToPngModal })
  );

const loadimage_convert_heic_to_avif = () =>
  import('@hieudoanm.github.io/components/pages/start/modals/image-convert-heic/ImageConvertHeicToAvifModal').then(
    (m) => ({ default: m.ImageConvertHeicToAvifModal })
  );

export const loaders: Record<
  string,
  () => Promise<{ default: ComponentType<{ onClose: () => void }> }>
> = {
  'image-convert-heic-to-jpg': loadimage_convert_heic_to_jpg,
  'image-convert-heic-to-png': loadimage_convert_heic_to_png,
  'image-convert-heic-to-avif': loadimage_convert_heic_to_avif,
};
