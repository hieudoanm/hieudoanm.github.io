import { ComponentType } from 'react';

const loadImageConvertHeicToAvif = () =>
  import('@hieudoanm.github.io/components/pages/start/apps/image-convert-heic/ImageConvertHeicToAvifModal').then(
    (m) => ({ default: m.ImageConvertHeicToAvifModal })
  );

const loadImageConvertHeicToJpg = () =>
  import('@hieudoanm.github.io/components/pages/start/apps/image-convert-heic/ImageConvertHeicToJpgModal').then(
    (m) => ({ default: m.ImageConvertHeicToJpgModal })
  );

const loadImageConvertHeicToPng = () =>
  import('@hieudoanm.github.io/components/pages/start/apps/image-convert-heic/ImageConvertHeicToPngModal').then(
    (m) => ({ default: m.ImageConvertHeicToPngModal })
  );

export const loaders: Record<
  string,
  () => Promise<{ default: ComponentType<{ onClose: () => void }> }>
> = {
  'image-convert-heic-to-avif': loadImageConvertHeicToAvif,
  'image-convert-heic-to-jpg': loadImageConvertHeicToJpg,
  'image-convert-heic-to-png': loadImageConvertHeicToPng,
};
