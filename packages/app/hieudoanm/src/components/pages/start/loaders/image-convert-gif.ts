import { ComponentType } from 'react';

const loadImageConvertGifToJpg = () =>
  import('@hieudoanm.github.io/components/pages/start/apps/image-convert-gif/ImageConvertGifToJpgModal').then(
    (m) => ({ default: m.ImageConvertGifToJpgModal })
  );

const loadImageConvertGifToPng = () =>
  import('@hieudoanm.github.io/components/pages/start/apps/image-convert-gif/ImageConvertGifToPngModal').then(
    (m) => ({ default: m.ImageConvertGifToPngModal })
  );

export const loaders: Record<
  string,
  () => Promise<{ default: ComponentType<{ onClose: () => void }> }>
> = {
  'image-convert-gif-to-jpg': loadImageConvertGifToJpg,
  'image-convert-gif-to-png': loadImageConvertGifToPng,
};
