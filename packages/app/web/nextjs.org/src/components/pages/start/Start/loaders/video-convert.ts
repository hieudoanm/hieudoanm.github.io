import { ComponentType, lazy } from 'react';

const loadvideo_avi_to_gif = () =>
  import('@hieudoanm.github.io/components/pages/start/modals/video-convert/VideoAviToGifModal').then(
    (m) => ({ default: m.VideoAviToGifModal })
  );

const loadvideo_avi_to_mp3 = () =>
  import('@hieudoanm.github.io/components/pages/start/modals/video-convert/VideoAviToMp3Modal').then(
    (m) => ({ default: m.VideoAviToMp3Modal })
  );

const loadvideo_avi_to_mp4 = () =>
  import('@hieudoanm.github.io/components/pages/start/modals/video-convert/VideoAviToMp4Modal').then(
    (m) => ({ default: m.VideoAviToMp4Modal })
  );

const loadvideo_flv_to_mp4 = () =>
  import('@hieudoanm.github.io/components/pages/start/modals/video-convert/VideoFlvToMp4Modal').then(
    (m) => ({ default: m.VideoFlvToMp4Modal })
  );

const loadvideo_gif_to_mov = () =>
  import('@hieudoanm.github.io/components/pages/start/modals/video-convert/VideoGifToMovModal').then(
    (m) => ({ default: m.VideoGifToMovModal })
  );

const loadvideo_gif_to_mp4 = () =>
  import('@hieudoanm.github.io/components/pages/start/modals/video-convert/VideoGifToMp4Modal').then(
    (m) => ({ default: m.VideoGifToMp4Modal })
  );

const loadvideo_gif_to_webm = () =>
  import('@hieudoanm.github.io/components/pages/start/modals/video-convert/VideoGifToWebmModal').then(
    (m) => ({ default: m.VideoGifToWebmModal })
  );

const loadvideo_mkv_to_mp4 = () =>
  import('@hieudoanm.github.io/components/pages/start/modals/video-convert/VideoMkvToMp4Modal').then(
    (m) => ({ default: m.VideoMkvToMp4Modal })
  );

const loadvideo_mov_to_mp4 = () =>
  import('@hieudoanm.github.io/components/pages/start/modals/video-convert/VideoMovToMp4Modal').then(
    (m) => ({ default: m.VideoMovToMp4Modal })
  );

const loadvideo_mp4_to_avi = () =>
  import('@hieudoanm.github.io/components/pages/start/modals/video-convert/VideoMp4ToAviModal').then(
    (m) => ({ default: m.VideoMp4ToAviModal })
  );

const loadvideo_mp4_to_mov = () =>
  import('@hieudoanm.github.io/components/pages/start/modals/video-convert/VideoMp4ToMovModal').then(
    (m) => ({ default: m.VideoMp4ToMovModal })
  );

const loadvideo_wmv_to_mp4 = () =>
  import('@hieudoanm.github.io/components/pages/start/modals/video-convert/VideoWmvToMp4Modal').then(
    (m) => ({ default: m.VideoWmvToMp4Modal })
  );

export const loaders: Record<
  string,
  () => Promise<{ default: ComponentType<{ onClose: () => void }> }>
> = {
  'video-avi-to-gif': loadvideo_avi_to_gif,
  'video-avi-to-mp3': loadvideo_avi_to_mp3,
  'video-avi-to-mp4': loadvideo_avi_to_mp4,
  'video-flv-to-mp4': loadvideo_flv_to_mp4,
  'video-gif-to-mov': loadvideo_gif_to_mov,
  'video-gif-to-mp4': loadvideo_gif_to_mp4,
  'video-gif-to-webm': loadvideo_gif_to_webm,
  'video-mkv-to-mp4': loadvideo_mkv_to_mp4,
  'video-mov-to-mp4': loadvideo_mov_to_mp4,
  'video-mp4-to-avi': loadvideo_mp4_to_avi,
  'video-mp4-to-mov': loadvideo_mp4_to_mov,
  'video-wmv-to-mp4': loadvideo_wmv_to_mp4,
};
