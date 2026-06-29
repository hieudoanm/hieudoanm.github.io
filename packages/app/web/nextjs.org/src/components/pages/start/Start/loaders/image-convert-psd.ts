import { ComponentType } from 'react';

const loadImageConvertPsdToJpg = () =>
  import('@hieudoanm.github.io/components/pages/start/modals/image-convert-psd/ImageConvertPsdToJpgModal').then(
    (m) => ({ default: m.ImageConvertPsdToJpgModal })
  );

const loadImageConvertPsdToPng = () =>
  import('@hieudoanm.github.io/components/pages/start/modals/image-convert-psd/ImageConvertPsdToPngModal').then(
    (m) => ({ default: m.ImageConvertPsdToPngModal })
  );

export const loaders: Record<
  string,
  () => Promise<{ default: ComponentType<{ onClose: () => void }> }>
> = {
  'image-convert-psd-to-jpg': loadImageConvertPsdToJpg,
  'image-convert-psd-to-png': loadImageConvertPsdToPng,
};
