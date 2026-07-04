import { ComponentType } from 'react';

const loadAudioTranscribe = () =>
  import('@hieudoanm.github.io/components/pages/start/apps/video-audio/AudioTranscribeModal').then(
    (m) => ({ default: m.AudioTranscribeModal })
  );

const loadGenerateSubtitle = () =>
  import('@hieudoanm.github.io/components/pages/start/apps/video-audio/GenerateSubtitleModal').then(
    (m) => ({ default: m.GenerateSubtitleModal })
  );

export const loaders: Record<
  string,
  () => Promise<{ default: ComponentType<{ onClose: () => void }> }>
> = {
  'audio-transcribe': loadAudioTranscribe,
  'generate-subtitle': loadGenerateSubtitle,
};
