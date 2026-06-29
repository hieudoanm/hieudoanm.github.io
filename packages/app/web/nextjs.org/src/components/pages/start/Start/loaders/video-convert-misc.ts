import { ComponentType, lazy } from 'react';

const loadvideo_convert_to_webm = () =>
  import('@hieudoanm.github.io/components/pages/start/modals/video-convert-misc/VideoConvertToWebmModal').then(
    (m) => ({ default: m.VideoConvertToWebmModal })
  );

const loadvideo_mkv_to_gif = () =>
  import('@hieudoanm.github.io/components/pages/start/modals/video-convert-misc/VideoMkvToGifModal').then(
    (m) => ({ default: m.VideoMkvToGifModal })
  );

const loadvideo_mkv_to_mp3 = () =>
  import('@hieudoanm.github.io/components/pages/start/modals/video-convert-misc/VideoMkvToMp3Modal').then(
    (m) => ({ default: m.VideoMkvToMp3Modal })
  );

const loadvideo_mov_to_avi = () =>
  import('@hieudoanm.github.io/components/pages/start/modals/video-convert-misc/VideoMovToAviModal').then(
    (m) => ({ default: m.VideoMovToAviModal })
  );

const loadvideo_mov_to_gif = () =>
  import('@hieudoanm.github.io/components/pages/start/modals/video-convert-misc/VideoMovToGifModal').then(
    (m) => ({ default: m.VideoMovToGifModal })
  );

const loadvideo_mp4_to_ogg = () =>
  import('@hieudoanm.github.io/components/pages/start/modals/video-convert-misc/VideoMp4ToOggModal').then(
    (m) => ({ default: m.VideoMp4ToOggModal })
  );

const loadvideo_to_gif = () =>
  import('@hieudoanm.github.io/components/pages/start/modals/video-convert-misc/VideoToGifModal').then(
    (m) => ({ default: m.VideoToGifModal })
  );

const loadvideo_to_webp = () =>
  import('@hieudoanm.github.io/components/pages/start/modals/video-convert-misc/VideoToWebpModal').then(
    (m) => ({ default: m.VideoToWebpModal })
  );

const loadvideo_webm_to_mp3 = () =>
  import('@hieudoanm.github.io/components/pages/start/modals/video-convert-misc/VideoWebmToMp3Modal').then(
    (m) => ({ default: m.VideoWebmToMp3Modal })
  );

export const loaders: Record<
  string,
  () => Promise<{ default: ComponentType<{ onClose: () => void }> }>
> = {
  'video-convert-to-webm': loadvideo_convert_to_webm,
  'video-mkv-to-gif': loadvideo_mkv_to_gif,
  'video-mkv-to-mp3': loadvideo_mkv_to_mp3,
  'video-mov-to-avi': loadvideo_mov_to_avi,
  'video-mov-to-gif': loadvideo_mov_to_gif,
  'video-mp4-to-ogg': loadvideo_mp4_to_ogg,
  'video-to-gif': loadvideo_to_gif,
  'video-to-webp': loadvideo_to_webp,
  'video-webm-to-mp3': loadvideo_webm_to_mp3,
};
