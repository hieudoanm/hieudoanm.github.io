import { ComponentType } from 'react';

const loadVideoWebmToMp3 = () =>
  import('@hieudoanm.github.io/components/pages/start/modals/video-convert-webm/VideoWebmToMp3Modal').then(
    (m) => ({ default: m.VideoWebmToMp3Modal })
  );

export const loaders: Record<
  string,
  () => Promise<{ default: ComponentType<{ onClose: () => void }> }>
> = {
  'video-webm-to-mp3': loadVideoWebmToMp3,
};
