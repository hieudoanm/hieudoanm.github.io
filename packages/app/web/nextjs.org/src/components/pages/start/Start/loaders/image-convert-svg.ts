import { ComponentType, lazy } from 'react';

const loadimage_convert_svg_to_png = () =>
  import('@hieudoanm.github.io/components/pages/start/modals/image-convert-svg/ImageConvertSvgToPngModal').then(
    (m) => ({ default: m.ImageConvertSvgToPngModal })
  );

export const loaders: Record<
  string,
  () => Promise<{ default: ComponentType<{ onClose: () => void }> }>
> = {
  'image-convert-svg-to-png': loadimage_convert_svg_to_png,
};
