import { ComponentType, lazy } from 'react';

const loadimage_convert_gif_to_jpg = () =>
  import('@hieudoanm.github.io/components/pages/start/modals/image-convert-gif/ImageConvertGifToJpgModal').then(
    (m) => ({ default: m.ImageConvertGifToJpgModal })
  );

const loadimage_convert_gif_to_png = () =>
  import('@hieudoanm.github.io/components/pages/start/modals/image-convert-gif/ImageConvertGifToPngModal').then(
    (m) => ({ default: m.ImageConvertGifToPngModal })
  );

export const loaders: Record<
  string,
  () => Promise<{ default: ComponentType<{ onClose: () => void }> }>
> = {
  'image-convert-gif-to-jpg': loadimage_convert_gif_to_jpg,
  'image-convert-gif-to-png': loadimage_convert_gif_to_png,
};
