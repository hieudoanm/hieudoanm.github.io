import { ComponentType, lazy } from 'react';

const loadimage_convert_psd_to_jpg = () =>
  import('@hieudoanm.github.io/components/pages/start/modals/image-convert-psd/ImageConvertPsdToJpgModal').then(
    (m) => ({ default: m.ImageConvertPsdToJpgModal })
  );

const loadimage_convert_psd_to_png = () =>
  import('@hieudoanm.github.io/components/pages/start/modals/image-convert-psd/ImageConvertPsdToPngModal').then(
    (m) => ({ default: m.ImageConvertPsdToPngModal })
  );

export const loaders: Record<
  string,
  () => Promise<{ default: ComponentType<{ onClose: () => void }> }>
> = {
  'image-convert-psd-to-jpg': loadimage_convert_psd_to_jpg,
  'image-convert-psd-to-png': loadimage_convert_psd_to_png,
};
