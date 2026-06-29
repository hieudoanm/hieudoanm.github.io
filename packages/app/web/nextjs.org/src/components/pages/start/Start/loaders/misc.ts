import { ComponentType, lazy } from 'react';

const loadaudio_transcribe = () =>
  import('@hieudoanm.github.io/components/pages/start/modals/audio/AudioTranscribeModal').then(
    (m) => ({ default: m.AudioTranscribeModal })
  );
const loadazw3_to_epub = () =>
  import('@hieudoanm.github.io/components/pages/start/modals/pdf/ebook/AZW3ToEPUBModal').then(
    (m) => ({ default: m.AZW3ToEPUBModal })
  );
const loadazw3_to_mobi = () =>
  import('@hieudoanm.github.io/components/pages/start/modals/pdf/ebook/AZW3ToMOBIModal').then(
    (m) => ({ default: m.AZW3ToMOBIModal })
  );
const loadbarcode_read = () =>
  import('@hieudoanm.github.io/components/pages/start/modals/image-scan/BarcodeReadModal').then(
    (m) => ({ default: m.BarcodeReadModal })
  );
const loadbreaking_bad = () =>
  import('@hieudoanm.github.io/components/pages/start/modals/image-create/BreakingBadModal').then(
    (m) => ({ default: m.BreakingBadModal })
  );
const loadcalendar_tracker = () =>
  import('@hieudoanm.github.io/components/pages/start/modals/visualization/CalendarTracker').then(
    (m) => ({ default: m.CalendarTrackerModal })
  );
const loadgenerate_subtitle = () =>
  import('@hieudoanm.github.io/components/pages/start/modals/audio/GenerateSubtitleModal').then(
    (m) => ({ default: m.GenerateSubtitleModal })
  );

export const loaders: Record<
  string,
  () => Promise<{ default: ComponentType<{ onClose: () => void }> }>
> = {
  'audio-transcribe': loadaudio_transcribe,
  'azw3-to-epub': loadazw3_to_epub,
  'azw3-to-mobi': loadazw3_to_mobi,
  'barcode-read': loadbarcode_read,
  'breaking-bad': loadbreaking_bad,
  'calendar-tracker': loadcalendar_tracker,
  'generate-subtitle': loadgenerate_subtitle,
};
