import { ComponentType } from 'react';

const loadVideoFlvToMp4 = () =>
  import('@hieudoanm.github.io/components/pages/start/apps/video-convert-flv/VideoFlvToMp4Modal').then(
    (m) => ({ default: m.VideoFlvToMp4Modal })
  );

export const loaders: Record<
  string,
  () => Promise<{ default: ComponentType<{ onClose: () => void }> }>
> = {
  'video-flv-to-mp4': loadVideoFlvToMp4,
};
