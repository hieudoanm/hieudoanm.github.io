import { ComponentType } from 'react';

const loadVideoMkvToGif = () =>
  import('@hieudoanm.github.io/components/pages/start/modals/video-convert-mkv/VideoMkvToGifModal').then(
    (m) => ({ default: m.VideoMkvToGifModal })
  );

const loadVideoMkvToMp3 = () =>
  import('@hieudoanm.github.io/components/pages/start/modals/video-convert-mkv/VideoMkvToMp3Modal').then(
    (m) => ({ default: m.VideoMkvToMp3Modal })
  );

const loadVideoMkvToMp4 = () =>
  import('@hieudoanm.github.io/components/pages/start/modals/video-convert-mkv/VideoMkvToMp4Modal').then(
    (m) => ({ default: m.VideoMkvToMp4Modal })
  );

export const loaders: Record<
  string,
  () => Promise<{ default: ComponentType<{ onClose: () => void }> }>
> = {
  'video-mkv-to-gif': loadVideoMkvToGif,
  'video-mkv-to-mp3': loadVideoMkvToMp3,
  'video-mkv-to-mp4': loadVideoMkvToMp4,
};
