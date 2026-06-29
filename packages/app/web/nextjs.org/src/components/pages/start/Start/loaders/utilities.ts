import { ComponentType } from 'react';

const loadChat = () =>
  import('@hieudoanm.github.io/components/pages/start/modals/utilities/ChatModal').then(
    (m) => ({ default: m.ChatModal })
  );

const loadClipboard = () =>
  import('@hieudoanm.github.io/components/pages/start/modals/utilities/ClipboardModal').then(
    (m) => ({ default: m.ClipboardModal })
  );

const loadCreateZip = () =>
  import('@hieudoanm.github.io/components/pages/start/modals/utilities/CreateZipModal').then(
    (m) => ({ default: m.CreateZipModal })
  );

const loadEmojis = () =>
  import('@hieudoanm.github.io/components/pages/start/modals/utilities/EmojisModal').then(
    (m) => ({ default: m.EmojisModal })
  );

const loadKaprekar = () =>
  import('@hieudoanm.github.io/components/pages/start/modals/utilities/KaprekarModal').then(
    (m) => ({ default: m.KaprekarModal })
  );

const loadNoSleep = () =>
  import('@hieudoanm.github.io/components/pages/start/modals/utilities/NoSleepModal').then(
    (m) => ({ default: m.NoSleepModal })
  );

const loadScreenRecorder = () =>
  import('@hieudoanm.github.io/components/pages/start/modals/utilities/ScreenRecorderModal').then(
    (m) => ({ default: m.ScreenRecorderModal })
  );

const loadTextPassword = () =>
  import('@hieudoanm.github.io/components/pages/start/modals/utilities/TextPasswordModal').then(
    (m) => ({ default: m.TextPasswordModal })
  );

const loadTextWordCount = () =>
  import('@hieudoanm.github.io/components/pages/start/modals/utilities/TextWordCountModal').then(
    (m) => ({ default: m.TextWordCountModal })
  );

export const loaders: Record<
  string,
  () => Promise<{ default: ComponentType<{ onClose: () => void }> }>
> = {
  chat: loadChat,
  clipboard: loadClipboard,
  'create-zip': loadCreateZip,
  emojis: loadEmojis,
  kaprekar: loadKaprekar,
  'no-sleep': loadNoSleep,
  'screen-recorder': loadScreenRecorder,
  'text-password': loadTextPassword,
  'text-word-count': loadTextWordCount,
};
