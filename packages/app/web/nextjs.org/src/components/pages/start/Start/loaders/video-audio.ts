import { ComponentType, lazy } from 'react';

const loadgenerate_subtitle = () =>
  import('@hieudoanm.github.io/components/pages/start/modals/video-audio/GenerateSubtitleModal').then(
    (m) => ({ default: m.GenerateSubtitleModal })
  );

const loadaudio_transcribe = () =>
  import('@hieudoanm.github.io/components/pages/start/modals/video-audio/AudioTranscribeModal').then(
    (m) => ({ default: m.AudioTranscribeModal })
  );

export const loaders: Record<
  string,
  () => Promise<{ default: ComponentType<{ onClose: () => void }> }>
> = {
  'generate-subtitle': loadgenerate_subtitle,
  'audio-transcribe': loadaudio_transcribe,
};
