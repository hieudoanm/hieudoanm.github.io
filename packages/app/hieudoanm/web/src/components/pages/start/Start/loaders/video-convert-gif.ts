import { ComponentType } from 'react';

const loadVideoGifToMov = () =>
  import('@hieudoanm.github.io/components/pages/start/modals/video-convert-gif/VideoGifToMovModal').then(
    (m) => ({ default: m.VideoGifToMovModal })
  );

const loadVideoGifToMp4 = () =>
  import('@hieudoanm.github.io/components/pages/start/modals/video-convert-gif/VideoGifToMp4Modal').then(
    (m) => ({ default: m.VideoGifToMp4Modal })
  );

const loadVideoGifToWebm = () =>
  import('@hieudoanm.github.io/components/pages/start/modals/video-convert-gif/VideoGifToWebmModal').then(
    (m) => ({ default: m.VideoGifToWebmModal })
  );

export const loaders: Record<
  string,
  () => Promise<{ default: ComponentType<{ onClose: () => void }> }>
> = {
  'video-gif-to-mov': loadVideoGifToMov,
  'video-gif-to-mp4': loadVideoGifToMp4,
  'video-gif-to-webm': loadVideoGifToWebm,
};
