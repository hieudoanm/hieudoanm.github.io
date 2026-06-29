import { ComponentType, lazy } from 'react';

const loadyoutube_thumbnails = () =>
  import('@hieudoanm.github.io/components/pages/start/modals/image-create/YouTubeThumbnailsModal').then(
    (m) => ({ default: m.YouTubeThumbnailsModal })
  );

export const loaders: Record<
  string,
  () => Promise<{ default: ComponentType<{ onClose: () => void }> }>
> = {
  'youtube-thumbnails': loadyoutube_thumbnails,
};
