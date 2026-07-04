import { ComponentType } from 'react';

const loadChat = () =>
  import('@hieudoanm.github.io/components/pages/start/apps/utilities/ChatModal').then(
    (m) => ({ default: m.ChatModal })
  );

const loadClipboard = () =>
  import('@hieudoanm.github.io/components/pages/start/apps/utilities/ClipboardModal').then(
    (m) => ({ default: m.ClipboardModal })
  );

const loadCreateZip = () =>
  import('@hieudoanm.github.io/components/pages/start/apps/utilities/CreateZipModal').then(
    (m) => ({ default: m.CreateZipModal })
  );

const loadEmojis = () =>
  import('@hieudoanm.github.io/components/pages/start/apps/utilities/EmojisModal').then(
    (m) => ({ default: m.EmojisModal })
  );

const loadKaprekar = () =>
  import('@hieudoanm.github.io/components/pages/start/apps/utilities/KaprekarModal').then(
    (m) => ({ default: m.KaprekarModal })
  );

const loadLoremIpsum = () =>
  import('@hieudoanm.github.io/components/pages/start/apps/utilities/LoremIpsumModal').then(
    (m) => ({ default: m.LoremIpsumModal })
  );

const loadNoSleep = () =>
  import('@hieudoanm.github.io/components/pages/start/apps/utilities/NoSleepModal').then(
    (m) => ({ default: m.NoSleepModal })
  );

const loadScreenRecorder = () =>
  import('@hieudoanm.github.io/components/pages/start/apps/utilities/ScreenRecorderModal').then(
    (m) => ({ default: m.ScreenRecorderModal })
  );

const loadTextPassword = () =>
  import('@hieudoanm.github.io/components/pages/start/apps/utilities/TextPasswordModal').then(
    (m) => ({ default: m.TextPasswordModal })
  );

const loadTextWordCount = () =>
  import('@hieudoanm.github.io/components/pages/start/apps/utilities/TextWordCountModal').then(
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
  'lorem-ipsum': loadLoremIpsum,
  'no-sleep': loadNoSleep,
  'screen-recorder': loadScreenRecorder,
  'text-password': loadTextPassword,
  'text-word-count': loadTextWordCount,
};
