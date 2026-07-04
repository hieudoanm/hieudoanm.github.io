import { ComponentType } from 'react';

const loadVideoConvertToWebm = () =>
  import('@hieudoanm.github.io/components/pages/start/apps/video-convert-mp4/VideoConvertToWebmModal').then(
    (m) => ({ default: m.VideoConvertToWebmModal })
  );

const loadVideoMp4ToAvi = () =>
  import('@hieudoanm.github.io/components/pages/start/apps/video-convert-mp4/VideoMp4ToAviModal').then(
    (m) => ({ default: m.VideoMp4ToAviModal })
  );

const loadVideoMp4ToMov = () =>
  import('@hieudoanm.github.io/components/pages/start/apps/video-convert-mp4/VideoMp4ToMovModal').then(
    (m) => ({ default: m.VideoMp4ToMovModal })
  );

const loadVideoMp4ToMp3 = () =>
  import('@hieudoanm.github.io/components/pages/start/apps/video-convert-mp4/VideoMp4ToMp3Modal').then(
    (m) => ({ default: m.VideoMp4ToMp3Modal })
  );

const loadVideoMp4ToOgg = () =>
  import('@hieudoanm.github.io/components/pages/start/apps/video-convert-mp4/VideoMp4ToOggModal').then(
    (m) => ({ default: m.VideoMp4ToOggModal })
  );

const loadVideoMp4ToWav = () =>
  import('@hieudoanm.github.io/components/pages/start/apps/video-convert-mp4/VideoMp4ToWavModal').then(
    (m) => ({ default: m.VideoMp4ToWavModal })
  );

const loadVideoToGif = () =>
  import('@hieudoanm.github.io/components/pages/start/apps/video-convert-mp4/VideoToGifModal').then(
    (m) => ({ default: m.VideoToGifModal })
  );

const loadVideoToWebp = () =>
  import('@hieudoanm.github.io/components/pages/start/apps/video-convert-mp4/VideoToWebpModal').then(
    (m) => ({ default: m.VideoToWebpModal })
  );

export const loaders: Record<
  string,
  () => Promise<{ default: ComponentType<{ onClose: () => void }> }>
> = {
  'video-convert-to-webm': loadVideoConvertToWebm,
  'video-mp4-to-avi': loadVideoMp4ToAvi,
  'video-mp4-to-mov': loadVideoMp4ToMov,
  'video-mp4-to-mp3': loadVideoMp4ToMp3,
  'video-mp4-to-ogg': loadVideoMp4ToOgg,
  'video-mp4-to-wav': loadVideoMp4ToWav,
  'video-to-gif': loadVideoToGif,
  'video-to-webp': loadVideoToWebp,
};
