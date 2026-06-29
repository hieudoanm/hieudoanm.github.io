import { ComponentType, lazy } from 'react';

const loadcontrast_checker = () =>
  import('@hieudoanm.github.io/components/pages/start/modals/utilities/ContrastCheckerModal').then(
    (m) => ({ default: m.ContrastCheckerModal })
  );

const loadgradient_generator = () =>
  import('@hieudoanm.github.io/components/pages/start/modals/utilities/GradientGeneratorModal').then(
    (m) => ({ default: m.GradientGeneratorModal })
  );

const loadno_sleep = () =>
  import('@hieudoanm.github.io/components/pages/start/modals/utilities/NoSleepModal').then(
    (m) => ({ default: m.NoSleepModal })
  );

const loadtext_password = () =>
  import('@hieudoanm.github.io/components/pages/start/modals/utilities/TextPasswordModal').then(
    (m) => ({ default: m.TextPasswordModal })
  );

const loadtext_word_count = () =>
  import('@hieudoanm.github.io/components/pages/start/modals/utilities/TextWordCountModal').then(
    (m) => ({ default: m.TextWordCountModal })
  );

const loadscreen_recorder = () =>
  import('@hieudoanm.github.io/components/pages/start/modals/utilities/ScreenRecorderModal').then(
    (m) => ({ default: m.ScreenRecorderModal })
  );

export const loaders: Record<
  string,
  () => Promise<{ default: ComponentType<{ onClose: () => void }> }>
> = {
  'contrast-checker': loadcontrast_checker,
  'gradient-generator': loadgradient_generator,
  'no-sleep': loadno_sleep,
  'text-password': loadtext_password,
  'text-word-count': loadtext_word_count,
  'screen-recorder': loadscreen_recorder,
};
