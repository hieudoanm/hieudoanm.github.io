import { ComponentType } from 'react';

const loadImageConvertSvgToPng = () =>
  import('@hieudoanm.github.io/components/pages/start/modals/image-convert-svg/ImageConvertSvgToPngModal').then(
    (m) => ({ default: m.ImageConvertSvgToPngModal })
  );

export const loaders: Record<
  string,
  () => Promise<{ default: ComponentType<{ onClose: () => void }> }>
> = {
  'image-convert-svg-to-png': loadImageConvertSvgToPng,
};
