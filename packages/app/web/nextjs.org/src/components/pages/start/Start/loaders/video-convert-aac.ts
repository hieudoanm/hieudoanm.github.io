import { ComponentType, lazy } from 'react';

const loadvideo_aac_to_mp3 = () =>
  import('@hieudoanm.github.io/components/pages/start/modals/video-convert-aac/VideoAacToMp3Modal').then(
    (m) => ({ default: m.VideoAacToMp3Modal })
  );

const loadvideo_aac_to_mp4 = () =>
  import('@hieudoanm.github.io/components/pages/start/modals/video-convert-aac/VideoAacToMp4Modal').then(
    (m) => ({ default: m.VideoAacToMp4Modal })
  );

const loadvideo_aac_to_wav = () =>
  import('@hieudoanm.github.io/components/pages/start/modals/video-convert-aac/VideoAacToWavModal').then(
    (m) => ({ default: m.VideoAacToWavModal })
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
  'video-aac-to-mp3': loadvideo_aac_to_mp3,
  'video-aac-to-mp4': loadvideo_aac_to_mp4,
  'video-aac-to-wav': loadvideo_aac_to_wav,
  'video-convert-to-webm': loadvideo_convert_to_webm,
  'video-to-gif': loadvideo_to_gif,
  'video-to-webp': loadvideo_to_webp,
};
