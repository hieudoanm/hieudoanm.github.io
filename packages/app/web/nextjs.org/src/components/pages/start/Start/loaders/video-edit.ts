import { ComponentType, lazy } from 'react';

const loadvideo_aac_to_mp3 = () =>
  import('@hieudoanm.github.io/components/pages/start/modals/video/convert-audio/VideoAacToMp3Modal').then(
    (m) => ({ default: m.VideoAacToMp3Modal })
  );
const loadvideo_aac_to_mp4 = () =>
  import('@hieudoanm.github.io/components/pages/start/modals/video/convert-audio/VideoAacToMp4Modal').then(
    (m) => ({ default: m.VideoAacToMp4Modal })
  );
const loadvideo_aac_to_wav = () =>
  import('@hieudoanm.github.io/components/pages/start/modals/video/convert-audio/VideoAacToWavModal').then(
    (m) => ({ default: m.VideoAacToWavModal })
  );
const loadvideo_avi_to_gif = () =>
  import('@hieudoanm.github.io/components/pages/start/modals/video/convert/VideoAviToGifModal').then(
    (m) => ({ default: m.VideoAviToGifModal })
  );
const loadvideo_avi_to_mp3 = () =>
  import('@hieudoanm.github.io/components/pages/start/modals/video/convert/VideoAviToMp3Modal').then(
    (m) => ({ default: m.VideoAviToMp3Modal })
  );
const loadvideo_avi_to_mp4 = () =>
  import('@hieudoanm.github.io/components/pages/start/modals/video/convert/VideoAviToMp4Modal').then(
    (m) => ({ default: m.VideoAviToMp4Modal })
  );
const loadvideo_compress = () =>
  import('@hieudoanm.github.io/components/pages/start/modals/video/edit/VideoCompressModal').then(
    (m) => ({ default: m.VideoCompressModal })
  );
const loadvideo_convert_to_webm = () =>
  import('@hieudoanm.github.io/components/pages/start/modals/video/convert-misc/VideoConvertToWebmModal').then(
    (m) => ({ default: m.VideoConvertToWebmModal })
  );
const loadvideo_crop = () =>
  import('@hieudoanm.github.io/components/pages/start/modals/video/edit/VideoCropModal').then(
    (m) => ({ default: m.VideoCropModal })
  );
const loadvideo_download_facebook = () =>
  import('@hieudoanm.github.io/components/pages/start/modals/video/download/VideoFacebookModal').then(
    (m) => ({ default: m.VideoFacebookModal })
  );
const loadvideo_download_instagram = () =>
  import('@hieudoanm.github.io/components/pages/start/modals/video/download/VideoInstagramModal').then(
    (m) => ({ default: m.VideoInstagramModal })
  );
const loadvideo_download_tiktok = () =>
  import('@hieudoanm.github.io/components/pages/start/modals/video/download/VideoTikTokModal').then(
    (m) => ({ default: m.VideoTikTokModal })
  );
const loadvideo_download_twitter = () =>
  import('@hieudoanm.github.io/components/pages/start/modals/video/download/VideoTwitterModal').then(
    (m) => ({ default: m.VideoTwitterModal })
  );
const loadvideo_extract_audio = () =>
  import('@hieudoanm.github.io/components/pages/start/modals/video/edit/VideoExtractAudioModal').then(
    (m) => ({ default: m.VideoExtractAudioModal })
  );
const loadvideo_extract_frames = () =>
  import('@hieudoanm.github.io/components/pages/start/modals/video/edit/VideoExtractFramesModal').then(
    (m) => ({ default: m.VideoExtractFramesModal })
  );
const loadvideo_flv_to_mp4 = () =>
  import('@hieudoanm.github.io/components/pages/start/modals/video/convert/VideoFlvToMp4Modal').then(
    (m) => ({ default: m.VideoFlvToMp4Modal })
  );
const loadvideo_gif_to_mov = () =>
  import('@hieudoanm.github.io/components/pages/start/modals/video/convert/VideoGifToMovModal').then(
    (m) => ({ default: m.VideoGifToMovModal })
  );
const loadvideo_gif_to_mp4 = () =>
  import('@hieudoanm.github.io/components/pages/start/modals/video/convert/VideoGifToMp4Modal').then(
    (m) => ({ default: m.VideoGifToMp4Modal })
  );
const loadvideo_gif_to_webm = () =>
  import('@hieudoanm.github.io/components/pages/start/modals/video/convert/VideoGifToWebmModal').then(
    (m) => ({ default: m.VideoGifToWebmModal })
  );
const loadvideo_m4a_to_mp3 = () =>
  import('@hieudoanm.github.io/components/pages/start/modals/video/convert-audio/VideoM4aToMp3Modal').then(
    (m) => ({ default: m.VideoM4aToMp3Modal })
  );
const loadvideo_m4a_to_mp4 = () =>
  import('@hieudoanm.github.io/components/pages/start/modals/video/convert-audio/VideoM4aToMp4Modal').then(
    (m) => ({ default: m.VideoM4aToMp4Modal })
  );
const loadvideo_m4a_to_wav = () =>
  import('@hieudoanm.github.io/components/pages/start/modals/video/convert-audio/VideoM4aToWavModal').then(
    (m) => ({ default: m.VideoM4aToWavModal })
  );
const loadvideo_merge = () =>
  import('@hieudoanm.github.io/components/pages/start/modals/video/edit/VideoMergeModal').then(
    (m) => ({ default: m.VideoMergeModal })
  );
const loadvideo_mkv_to_gif = () =>
  import('@hieudoanm.github.io/components/pages/start/modals/video/convert-misc/VideoMkvToGifModal').then(
    (m) => ({ default: m.VideoMkvToGifModal })
  );
const loadvideo_mkv_to_mp3 = () =>
  import('@hieudoanm.github.io/components/pages/start/modals/video/convert-misc/VideoMkvToMp3Modal').then(
    (m) => ({ default: m.VideoMkvToMp3Modal })
  );
const loadvideo_mkv_to_mp4 = () =>
  import('@hieudoanm.github.io/components/pages/start/modals/video/convert/VideoMkvToMp4Modal').then(
    (m) => ({ default: m.VideoMkvToMp4Modal })
  );
const loadvideo_mov_to_avi = () =>
  import('@hieudoanm.github.io/components/pages/start/modals/video/convert-misc/VideoMovToAviModal').then(
    (m) => ({ default: m.VideoMovToAviModal })
  );
const loadvideo_mov_to_gif = () =>
  import('@hieudoanm.github.io/components/pages/start/modals/video/convert-misc/VideoMovToGifModal').then(
    (m) => ({ default: m.VideoMovToGifModal })
  );
const loadvideo_mov_to_mp3 = () =>
  import('@hieudoanm.github.io/components/pages/start/modals/video/convert-audio/VideoMovToMp3Modal').then(
    (m) => ({ default: m.VideoMovToMp3Modal })
  );
const loadvideo_mov_to_mp4 = () =>
  import('@hieudoanm.github.io/components/pages/start/modals/video/convert/VideoMovToMp4Modal').then(
    (m) => ({ default: m.VideoMovToMp4Modal })
  );
const loadvideo_mov_to_wav = () =>
  import('@hieudoanm.github.io/components/pages/start/modals/video/convert-audio/VideoMovToWavModal').then(
    (m) => ({ default: m.VideoMovToWavModal })
  );
const loadvideo_mp4_to_avi = () =>
  import('@hieudoanm.github.io/components/pages/start/modals/video/convert/VideoMp4ToAviModal').then(
    (m) => ({ default: m.VideoMp4ToAviModal })
  );
const loadvideo_mp4_to_mov = () =>
  import('@hieudoanm.github.io/components/pages/start/modals/video/convert/VideoMp4ToMovModal').then(
    (m) => ({ default: m.VideoMp4ToMovModal })
  );
const loadvideo_mp4_to_mp3 = () =>
  import('@hieudoanm.github.io/components/pages/start/modals/video/convert-audio/VideoMp4ToMp3Modal').then(
    (m) => ({ default: m.VideoMp4ToMp3Modal })
  );
const loadvideo_mp4_to_ogg = () =>
  import('@hieudoanm.github.io/components/pages/start/modals/video/convert-misc/VideoMp4ToOggModal').then(
    (m) => ({ default: m.VideoMp4ToOggModal })
  );
const loadvideo_mp4_to_wav = () =>
  import('@hieudoanm.github.io/components/pages/start/modals/video/convert-audio/VideoMp4ToWavModal').then(
    (m) => ({ default: m.VideoMp4ToWavModal })
  );
const loadvideo_mute = () =>
  import('@hieudoanm.github.io/components/pages/start/modals/video/edit/VideoMuteModal').then(
    (m) => ({ default: m.VideoMuteModal })
  );
const loadvideo_ogg_to_mp3 = () =>
  import('@hieudoanm.github.io/components/pages/start/modals/video/convert-audio/VideoOggToMp3Modal').then(
    (m) => ({ default: m.VideoOggToMp3Modal })
  );
const loadvideo_ogg_to_wav = () =>
  import('@hieudoanm.github.io/components/pages/start/modals/video/convert-audio/VideoOggToWavModal').then(
    (m) => ({ default: m.VideoOggToWavModal })
  );
const loadvideo_resize = () =>
  import('@hieudoanm.github.io/components/pages/start/modals/video/edit/VideoResizeModal').then(
    (m) => ({ default: m.VideoResizeModal })
  );
const loadvideo_speed = () =>
  import('@hieudoanm.github.io/components/pages/start/modals/video/edit/VideoSpeedModal').then(
    (m) => ({ default: m.VideoSpeedModal })
  );
const loadvideo_stabilize = () =>
  import('@hieudoanm.github.io/components/pages/start/modals/video/edit/VideoStabilizeModal').then(
    (m) => ({ default: m.VideoStabilizeModal })
  );
const loadvideo_to_gif = () =>
  import('@hieudoanm.github.io/components/pages/start/modals/video/convert-misc/VideoToGifModal').then(
    (m) => ({ default: m.VideoToGifModal })
  );
const loadvideo_to_webp = () =>
  import('@hieudoanm.github.io/components/pages/start/modals/video/convert-misc/VideoToWebpModal').then(
    (m) => ({ default: m.VideoToWebpModal })
  );
const loadvideo_trim = () =>
  import('@hieudoanm.github.io/components/pages/start/modals/video/edit/VideoTrimModal').then(
    (m) => ({ default: m.VideoTrimModal })
  );
const loadvideo_webm_to_mp3 = () =>
  import('@hieudoanm.github.io/components/pages/start/modals/video/convert-misc/VideoWebmToMp3Modal').then(
    (m) => ({ default: m.VideoWebmToMp3Modal })
  );
const loadvideo_wmv_to_mp4 = () =>
  import('@hieudoanm.github.io/components/pages/start/modals/video/convert/VideoWmvToMp4Modal').then(
    (m) => ({ default: m.VideoWmvToMp4Modal })
  );
const loadvideo_youtube_text = () =>
  import('@hieudoanm.github.io/components/pages/start/modals/video/download/VideoYoutubeTextModal').then(
    (m) => ({ default: m.VideoYoutubeTextModal })
  );
const loadvideo_youtube_transcript = () =>
  import('@hieudoanm.github.io/components/pages/start/modals/video/download/VideoYoutubeTranscriptModal').then(
    (m) => ({ default: m.VideoYoutubeTranscriptModal })
  );

export const loaders: Record<
  string,
  () => Promise<{ default: ComponentType<{ onClose: () => void }> }>
> = {
  'video-aac-to-mp3': loadvideo_aac_to_mp3,
  'video-aac-to-mp4': loadvideo_aac_to_mp4,
  'video-aac-to-wav': loadvideo_aac_to_wav,
  'video-avi-to-gif': loadvideo_avi_to_gif,
  'video-avi-to-mp3': loadvideo_avi_to_mp3,
  'video-avi-to-mp4': loadvideo_avi_to_mp4,
  'video-compress': loadvideo_compress,
  'video-convert-to-webm': loadvideo_convert_to_webm,
  'video-crop': loadvideo_crop,
  'video-download-facebook': loadvideo_download_facebook,
  'video-download-instagram': loadvideo_download_instagram,
  'video-download-tiktok': loadvideo_download_tiktok,
  'video-download-twitter': loadvideo_download_twitter,
  'video-extract-audio': loadvideo_extract_audio,
  'video-extract-frames': loadvideo_extract_frames,
  'video-flv-to-mp4': loadvideo_flv_to_mp4,
  'video-gif-to-mov': loadvideo_gif_to_mov,
  'video-gif-to-mp4': loadvideo_gif_to_mp4,
  'video-gif-to-webm': loadvideo_gif_to_webm,
  'video-m4a-to-mp3': loadvideo_m4a_to_mp3,
  'video-m4a-to-mp4': loadvideo_m4a_to_mp4,
  'video-m4a-to-wav': loadvideo_m4a_to_wav,
  'video-merge': loadvideo_merge,
  'video-mkv-to-gif': loadvideo_mkv_to_gif,
  'video-mkv-to-mp3': loadvideo_mkv_to_mp3,
  'video-mkv-to-mp4': loadvideo_mkv_to_mp4,
  'video-mov-to-avi': loadvideo_mov_to_avi,
  'video-mov-to-gif': loadvideo_mov_to_gif,
  'video-mov-to-mp3': loadvideo_mov_to_mp3,
  'video-mov-to-mp4': loadvideo_mov_to_mp4,
  'video-mov-to-wav': loadvideo_mov_to_wav,
  'video-mp4-to-avi': loadvideo_mp4_to_avi,
  'video-mp4-to-mov': loadvideo_mp4_to_mov,
  'video-mp4-to-mp3': loadvideo_mp4_to_mp3,
  'video-mp4-to-ogg': loadvideo_mp4_to_ogg,
  'video-mp4-to-wav': loadvideo_mp4_to_wav,
  'video-mute': loadvideo_mute,
  'video-ogg-to-mp3': loadvideo_ogg_to_mp3,
  'video-ogg-to-wav': loadvideo_ogg_to_wav,
  'video-resize': loadvideo_resize,
  'video-speed': loadvideo_speed,
  'video-stabilize': loadvideo_stabilize,
  'video-to-gif': loadvideo_to_gif,
  'video-to-webp': loadvideo_to_webp,
  'video-trim': loadvideo_trim,
  'video-webm-to-mp3': loadvideo_webm_to_mp3,
  'video-wmv-to-mp4': loadvideo_wmv_to_mp4,
  'video-youtube-text': loadvideo_youtube_text,
  'video-youtube-transcript': loadvideo_youtube_transcript,
};
