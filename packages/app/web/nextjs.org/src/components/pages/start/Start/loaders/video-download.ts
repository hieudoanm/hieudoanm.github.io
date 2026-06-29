import { ComponentType, lazy } from 'react';

const loadvideo_download_facebook = () =>
  import('@hieudoanm.github.io/components/pages/start/modals/video-download/VideoFacebookModal').then(
    (m) => ({ default: m.VideoFacebookModal })
  );

const loadvideo_download_instagram = () =>
  import('@hieudoanm.github.io/components/pages/start/modals/video-download/VideoInstagramModal').then(
    (m) => ({ default: m.VideoInstagramModal })
  );

const loadvideo_download_tiktok = () =>
  import('@hieudoanm.github.io/components/pages/start/modals/video-download/VideoTikTokModal').then(
    (m) => ({ default: m.VideoTikTokModal })
  );

const loadvideo_download_twitter = () =>
  import('@hieudoanm.github.io/components/pages/start/modals/video-download/VideoTwitterModal').then(
    (m) => ({ default: m.VideoTwitterModal })
  );

const loadvideo_youtube_text = () =>
  import('@hieudoanm.github.io/components/pages/start/modals/video-download/VideoYoutubeTextModal').then(
    (m) => ({ default: m.VideoYoutubeTextModal })
  );

const loadvideo_youtube_transcript = () =>
  import('@hieudoanm.github.io/components/pages/start/modals/video-download/VideoYoutubeTranscriptModal').then(
    (m) => ({ default: m.VideoYoutubeTranscriptModal })
  );

export const loaders: Record<
  string,
  () => Promise<{ default: ComponentType<{ onClose: () => void }> }>
> = {
  'video-download-facebook': loadvideo_download_facebook,
  'video-download-instagram': loadvideo_download_instagram,
  'video-download-tiktok': loadvideo_download_tiktok,
  'video-download-twitter': loadvideo_download_twitter,
  'video-youtube-text': loadvideo_youtube_text,
  'video-youtube-transcript': loadvideo_youtube_transcript,
};
