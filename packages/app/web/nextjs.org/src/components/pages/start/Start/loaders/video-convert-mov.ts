import { ComponentType, lazy } from 'react';

const loadvideo_mov_to_mp4 = () =>
  import('@hieudoanm.github.io/components/pages/start/modals/video-convert-mov/VideoMovToMp4Modal').then(
    (m) => ({ default: m.VideoMovToMp4Modal })
  );

const loadvideo_mov_to_mp3 = () =>
  import('@hieudoanm.github.io/components/pages/start/modals/video-convert-mov/VideoMovToMp3Modal').then(
    (m) => ({ default: m.VideoMovToMp3Modal })
  );

const loadvideo_mov_to_wav = () =>
  import('@hieudoanm.github.io/components/pages/start/modals/video-convert-mov/VideoMovToWavModal').then(
    (m) => ({ default: m.VideoMovToWavModal })
  );

const loadvideo_mov_to_avi = () =>
  import('@hieudoanm.github.io/components/pages/start/modals/video-convert-mov/VideoMovToAviModal').then(
    (m) => ({ default: m.VideoMovToAviModal })
  );

const loadvideo_mov_to_gif = () =>
  import('@hieudoanm.github.io/components/pages/start/modals/video-convert-mov/VideoMovToGifModal').then(
    (m) => ({ default: m.VideoMovToGifModal })
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
  'video-mov-to-mp4': loadvideo_mov_to_mp4,
  'video-mov-to-mp3': loadvideo_mov_to_mp3,
  'video-mov-to-wav': loadvideo_mov_to_wav,
  'video-mov-to-avi': loadvideo_mov_to_avi,
  'video-mov-to-gif': loadvideo_mov_to_gif,
  'video-convert-to-webm': loadvideo_convert_to_webm,
  'video-to-gif': loadvideo_to_gif,
  'video-to-webp': loadvideo_to_webp,
};
