import { ComponentType } from 'react';

const loadVideoOggToMp3 = () =>
  import('@hieudoanm.github.io/components/pages/start/apps/video-convert-ogg/VideoOggToMp3Modal').then(
    (m) => ({ default: m.VideoOggToMp3Modal })
  );

const loadVideoOggToWav = () =>
  import('@hieudoanm.github.io/components/pages/start/apps/video-convert-ogg/VideoOggToWavModal').then(
    (m) => ({ default: m.VideoOggToWavModal })
  );

export const loaders: Record<
  string,
  () => Promise<{ default: ComponentType<{ onClose: () => void }> }>
> = {
  'video-ogg-to-mp3': loadVideoOggToMp3,
  'video-ogg-to-wav': loadVideoOggToWav,
};
