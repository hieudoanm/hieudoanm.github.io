import { ComponentType, lazy } from 'react';

const loadimage_convert_tiff_to_jpg = () =>
  import('@hieudoanm.github.io/components/pages/start/modals/image-convert-tiff/ImageConvertTiffToJpgModal').then(
    (m) => ({ default: m.ImageConvertTiffToJpgModal })
  );

const loadimage_convert_tiff_to_png = () =>
  import('@hieudoanm.github.io/components/pages/start/modals/image-convert-tiff/ImageConvertTiffToPngModal').then(
    (m) => ({ default: m.ImageConvertTiffToPngModal })
  );

export const loaders: Record<
  string,
  () => Promise<{ default: ComponentType<{ onClose: () => void }> }>
> = {
  'image-convert-tiff-to-jpg': loadimage_convert_tiff_to_jpg,
  'image-convert-tiff-to-png': loadimage_convert_tiff_to_png,
};
