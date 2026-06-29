import { ComponentType } from 'react';

const loadvideo_ogg_to_mp3 = () =>
  import('@hieudoanm.github.io/components/pages/start/modals/video-convert-ogg/VideoOggToMp3Modal').then(
    (m) => ({ default: m.VideoOggToMp3Modal })
  );

const loadvideo_ogg_to_wav = () =>
  import('@hieudoanm.github.io/components/pages/start/modals/video-convert-ogg/VideoOggToWavModal').then(
    (m) => ({ default: m.VideoOggToWavModal })
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
  'video-ogg-to-mp3': loadvideo_ogg_to_mp3,
  'video-ogg-to-wav': loadvideo_ogg_to_wav,
  'video-convert-to-webm': loadvideo_convert_to_webm,
  'video-to-gif': loadvideo_to_gif,
  'video-to-webp': loadvideo_to_webp,
};
