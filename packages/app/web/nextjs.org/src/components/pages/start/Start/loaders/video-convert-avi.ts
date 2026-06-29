import { ComponentType } from 'react';

const loadVideoAviToGif = () =>
  import('@hieudoanm.github.io/components/pages/start/modals/video-convert-avi/VideoAviToGifModal').then(
    (m) => ({ default: m.VideoAviToGifModal })
  );

const loadVideoAviToMp3 = () =>
  import('@hieudoanm.github.io/components/pages/start/modals/video-convert-avi/VideoAviToMp3Modal').then(
    (m) => ({ default: m.VideoAviToMp3Modal })
  );

const loadVideoAviToMp4 = () =>
  import('@hieudoanm.github.io/components/pages/start/modals/video-convert-avi/VideoAviToMp4Modal').then(
    (m) => ({ default: m.VideoAviToMp4Modal })
  );

export const loaders: Record<
  string,
  () => Promise<{ default: ComponentType<{ onClose: () => void }> }>
> = {
  'video-avi-to-gif': loadVideoAviToGif,
  'video-avi-to-mp3': loadVideoAviToMp3,
  'video-avi-to-mp4': loadVideoAviToMp4,
};
