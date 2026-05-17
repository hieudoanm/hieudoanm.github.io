import { ComponentType } from 'react';

const loadImageConvertTiffToJpg = () =>
  import('@hieudoanm.github.io/components/pages/start/modals/image-convert-tiff/ImageConvertTiffToJpgModal').then(
    (m) => ({ default: m.ImageConvertTiffToJpgModal })
  );

const loadImageConvertTiffToPng = () =>
  import('@hieudoanm.github.io/components/pages/start/modals/image-convert-tiff/ImageConvertTiffToPngModal').then(
    (m) => ({ default: m.ImageConvertTiffToPngModal })
  );

export const loaders: Record<
  string,
  () => Promise<{ default: ComponentType<{ onClose: () => void }> }>
> = {
  'image-convert-tiff-to-jpg': loadImageConvertTiffToJpg,
  'image-convert-tiff-to-png': loadImageConvertTiffToPng,
};
