import { ComponentType } from 'react';

const loadVideoFacebook = () =>
  import('@hieudoanm.github.io/components/pages/start/modals/video-download/VideoFacebookModal').then(
    (m) => ({ default: m.VideoFacebookModal })
  );

const loadVideoInstagram = () =>
  import('@hieudoanm.github.io/components/pages/start/modals/video-download/VideoInstagramModal').then(
    (m) => ({ default: m.VideoInstagramModal })
  );

const loadVideoTikTok = () =>
  import('@hieudoanm.github.io/components/pages/start/modals/video-download/VideoTikTokModal').then(
    (m) => ({ default: m.VideoTikTokModal })
  );

const loadVideoTwitter = () =>
  import('@hieudoanm.github.io/components/pages/start/modals/video-download/VideoTwitterModal').then(
    (m) => ({ default: m.VideoTwitterModal })
  );

const loadVideoYoutubeText = () =>
  import('@hieudoanm.github.io/components/pages/start/modals/video-download/VideoYoutubeTextModal').then(
    (m) => ({ default: m.VideoYoutubeTextModal })
  );

const loadVideoYoutubeTranscript = () =>
  import('@hieudoanm.github.io/components/pages/start/modals/video-download/VideoYoutubeTranscriptModal').then(
    (m) => ({ default: m.VideoYoutubeTranscriptModal })
  );

export const loaders: Record<
  string,
  () => Promise<{ default: ComponentType<{ onClose: () => void }> }>
> = {
  'video-download-facebook': loadVideoFacebook,
  'video-download-instagram': loadVideoInstagram,
  'video-download-tiktok': loadVideoTikTok,
  'video-download-twitter': loadVideoTwitter,
  'video-youtube-text': loadVideoYoutubeText,
  'video-youtube-transcript': loadVideoYoutubeTranscript,
};
