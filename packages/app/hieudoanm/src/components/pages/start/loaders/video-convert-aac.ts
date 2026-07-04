import { ComponentType } from 'react';

const loadVideoAacToMp3 = () =>
  import('@hieudoanm.github.io/components/pages/start/apps/video-convert-aac/VideoAacToMp3Modal').then(
    (m) => ({ default: m.VideoAacToMp3Modal })
  );

const loadVideoAacToMp4 = () =>
  import('@hieudoanm.github.io/components/pages/start/apps/video-convert-aac/VideoAacToMp4Modal').then(
    (m) => ({ default: m.VideoAacToMp4Modal })
  );

const loadVideoAacToWav = () =>
  import('@hieudoanm.github.io/components/pages/start/apps/video-convert-aac/VideoAacToWavModal').then(
    (m) => ({ default: m.VideoAacToWavModal })
  );

export const loaders: Record<
  string,
  () => Promise<{ default: ComponentType<{ onClose: () => void }> }>
> = {
  'video-aac-to-mp3': loadVideoAacToMp3,
  'video-aac-to-mp4': loadVideoAacToMp4,
  'video-aac-to-wav': loadVideoAacToWav,
};
