import { ComponentType } from 'react';

const loadVideoMovToAvi = () =>
  import('@hieudoanm.github.io/components/pages/start/apps/video-convert-mov/VideoMovToAviModal').then(
    (m) => ({ default: m.VideoMovToAviModal })
  );

const loadVideoMovToGif = () =>
  import('@hieudoanm.github.io/components/pages/start/apps/video-convert-mov/VideoMovToGifModal').then(
    (m) => ({ default: m.VideoMovToGifModal })
  );

const loadVideoMovToMp3 = () =>
  import('@hieudoanm.github.io/components/pages/start/apps/video-convert-mov/VideoMovToMp3Modal').then(
    (m) => ({ default: m.VideoMovToMp3Modal })
  );

const loadVideoMovToMp4 = () =>
  import('@hieudoanm.github.io/components/pages/start/apps/video-convert-mov/VideoMovToMp4Modal').then(
    (m) => ({ default: m.VideoMovToMp4Modal })
  );

const loadVideoMovToWav = () =>
  import('@hieudoanm.github.io/components/pages/start/apps/video-convert-mov/VideoMovToWavModal').then(
    (m) => ({ default: m.VideoMovToWavModal })
  );

export const loaders: Record<
  string,
  () => Promise<{ default: ComponentType<{ onClose: () => void }> }>
> = {
  'video-mov-to-avi': loadVideoMovToAvi,
  'video-mov-to-gif': loadVideoMovToGif,
  'video-mov-to-mp3': loadVideoMovToMp3,
  'video-mov-to-mp4': loadVideoMovToMp4,
  'video-mov-to-wav': loadVideoMovToWav,
};
