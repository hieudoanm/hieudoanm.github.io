import { ComponentType, lazy } from 'react';

const loadvideo_m4a_to_mp3 = () =>
  import('@hieudoanm.github.io/components/pages/start/modals/video-convert-m4a/VideoM4aToMp3Modal').then(
    (m) => ({ default: m.VideoM4aToMp3Modal })
  );

const loadvideo_m4a_to_mp4 = () =>
  import('@hieudoanm.github.io/components/pages/start/modals/video-convert-m4a/VideoM4aToMp4Modal').then(
    (m) => ({ default: m.VideoM4aToMp4Modal })
  );

const loadvideo_m4a_to_wav = () =>
  import('@hieudoanm.github.io/components/pages/start/modals/video-convert-m4a/VideoM4aToWavModal').then(
    (m) => ({ default: m.VideoM4aToWavModal })
  );

const loadvideo_convert_to_webm = () =>
  import('@hieudoanm.github.io/components/pages/start/modals/video-convert-mp4/VideoConvertToWebmModal').then(
    (m) => ({ default: m.VideoConvertToWebmModal })
  );
const loadvideo_to_gif = () =>
  import('@hieudoanm.github.io/components/pages/start/modals/video-convert-mp4/VideoToGifModal').then(
    (m) => ({ default: m.VideoToGifModal })
  );
const loadvideo_to_webp = () =>
  import('@hieudoanm.github.io/components/pages/start/modals/video-convert-mp4/VideoToWebpModal').then(
    (m) => ({ default: m.VideoToWebpModal })
  );

export const loaders: Record<
  string,
  () => Promise<{ default: ComponentType<{ onClose: () => void }> }>
> = {
  'video-m4a-to-mp3': loadvideo_m4a_to_mp3,
  'video-m4a-to-mp4': loadvideo_m4a_to_mp4,
  'video-m4a-to-wav': loadvideo_m4a_to_wav,
  'video-convert-to-webm': loadvideo_convert_to_webm,
  'video-to-gif': loadvideo_to_gif,
  'video-to-webp': loadvideo_to_webp,
};
