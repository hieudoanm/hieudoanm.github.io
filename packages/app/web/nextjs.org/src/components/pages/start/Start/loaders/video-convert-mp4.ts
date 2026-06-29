import { ComponentType, lazy } from 'react';

const loadvideo_mp4_to_avi = () =>
  import('@hieudoanm.github.io/components/pages/start/modals/video-convert-mp4/VideoMp4ToAviModal').then(
    (m) => ({ default: m.VideoMp4ToAviModal })
  );

const loadvideo_mp4_to_mov = () =>
  import('@hieudoanm.github.io/components/pages/start/modals/video-convert-mp4/VideoMp4ToMovModal').then(
    (m) => ({ default: m.VideoMp4ToMovModal })
  );

const loadvideo_mp4_to_mp3 = () =>
  import('@hieudoanm.github.io/components/pages/start/modals/video-convert-mp4/VideoMp4ToMp3Modal').then(
    (m) => ({ default: m.VideoMp4ToMp3Modal })
  );

const loadvideo_mp4_to_wav = () =>
  import('@hieudoanm.github.io/components/pages/start/modals/video-convert-mp4/VideoMp4ToWavModal').then(
    (m) => ({ default: m.VideoMp4ToWavModal })
  );

const loadvideo_mp4_to_ogg = () =>
  import('@hieudoanm.github.io/components/pages/start/modals/video-convert-mp4/VideoMp4ToOggModal').then(
    (m) => ({ default: m.VideoMp4ToOggModal })
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
  'video-mp4-to-avi': loadvideo_mp4_to_avi,
  'video-mp4-to-mov': loadvideo_mp4_to_mov,
  'video-mp4-to-mp3': loadvideo_mp4_to_mp3,
  'video-mp4-to-wav': loadvideo_mp4_to_wav,
  'video-mp4-to-ogg': loadvideo_mp4_to_ogg,
  'video-convert-to-webm': loadvideo_convert_to_webm,
  'video-to-gif': loadvideo_to_gif,
  'video-to-webp': loadvideo_to_webp,
};
