import { ComponentType } from 'react';

const loadVideoM4aToMp3 = () =>
  import('@hieudoanm.github.io/components/pages/start/apps/video-convert-m4a/VideoM4aToMp3Modal').then(
    (m) => ({ default: m.VideoM4aToMp3Modal })
  );

const loadVideoM4aToMp4 = () =>
  import('@hieudoanm.github.io/components/pages/start/apps/video-convert-m4a/VideoM4aToMp4Modal').then(
    (m) => ({ default: m.VideoM4aToMp4Modal })
  );

const loadVideoM4aToWav = () =>
  import('@hieudoanm.github.io/components/pages/start/apps/video-convert-m4a/VideoM4aToWavModal').then(
    (m) => ({ default: m.VideoM4aToWavModal })
  );

export const loaders: Record<
  string,
  () => Promise<{ default: ComponentType<{ onClose: () => void }> }>
> = {
  'video-m4a-to-mp3': loadVideoM4aToMp3,
  'video-m4a-to-mp4': loadVideoM4aToMp4,
  'video-m4a-to-wav': loadVideoM4aToWav,
};
