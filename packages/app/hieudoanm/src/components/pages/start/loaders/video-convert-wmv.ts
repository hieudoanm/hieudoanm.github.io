import { ComponentType } from 'react';

const loadVideoWmvToMp4 = () =>
  import('@hieudoanm.github.io/components/pages/start/apps/video-convert-wmv/VideoWmvToMp4Modal').then(
    (m) => ({ default: m.VideoWmvToMp4Modal })
  );

export const loaders: Record<
  string,
  () => Promise<{ default: ComponentType<{ onClose: () => void }> }>
> = {
  'video-wmv-to-mp4': loadVideoWmvToMp4,
};
