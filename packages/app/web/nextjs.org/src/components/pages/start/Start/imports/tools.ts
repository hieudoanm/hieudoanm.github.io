import dynamic from 'next/dynamic';

export const ChatModal = dynamic(
  () =>
    import('@hieudoanm.github.io/components/pages/start/modals/tools/ChatModal/ChatModal').then(
      (m) => m.ChatModal
    ),
  { ssr: false }
);
export const ClipboardModal = dynamic(
  () =>
    import('@hieudoanm.github.io/components/pages/start/modals/tools/ClipboardModal').then(
      (m) => m.ClipboardModal
    ),
  { ssr: false }
);
export const EmojisModal = dynamic(
  () =>
    import('@hieudoanm.github.io/components/pages/start/modals/tools/EmojisModal').then(
      (m) => m.EmojisModal
    ),
  { ssr: false }
);
export const FigletModal = dynamic(
  () =>
    import('@hieudoanm.github.io/components/pages/start/modals/tools/FigletModal').then(
      (m) => m.FigletModal
    ),
  { ssr: false }
);
export const IPModal = dynamic(
  () =>
    import('@hieudoanm.github.io/components/pages/start/modals/tools/IPModal').then(
      (m) => m.IPModal
    ),
  { ssr: false }
);
export const KaprekarModal = dynamic(
  () =>
    import('@hieudoanm.github.io/components/pages/start/modals/tools/KaprekarModal').then(
      (m) => m.KaprekarModal
    ),
  { ssr: false }
);
export const NoSleepModal = dynamic(
  () =>
    import('@hieudoanm.github.io/components/pages/start/modals/tools/NoSleepModal').then(
      (m) => m.NoSleepModal
    ),
  { ssr: false }
);
export const ProxyModal = dynamic(
  () =>
    import('@hieudoanm.github.io/components/pages/start/modals/tools/ProxyModal').then(
      (m) => m.ProxyModal
    ),
  { ssr: false }
);
export const ShopifyDetectModal = dynamic(
  () =>
    import('@hieudoanm.github.io/components/pages/start/modals/tools/ShopifyDetectModal').then(
      (m) => m.ShopifyDetectModal
    ),
  { ssr: false }
);
export const SVGModal = dynamic(
  () =>
    import('@hieudoanm.github.io/components/pages/start/modals/tools/SVGModal').then(
      (m) => m.SVGModal
    ),
  { ssr: false }
);
export const UUIDModal = dynamic(
  () =>
    import('@hieudoanm.github.io/components/pages/start/modals/tools/UUIDModal').then(
      (m) => m.UUIDModal
    ),
  { ssr: false }
);
export const TextToolsModal = dynamic(
  () =>
    import('@hieudoanm.github.io/components/pages/start/modals/tools/TextToolsModal').then(
      (m) => m.TextToolsModal
    ),
  { ssr: false }
);
export const ScreenRecorderModal = dynamic(
  () =>
    import('@hieudoanm.github.io/components/pages/start/modals/tools/ScreenRecorderModal').then(
      (m) => m.ScreenRecorderModal
    ),
  { ssr: false }
);
export const SheetsModal = dynamic(
  () =>
    import('@hieudoanm.github.io/components/pages/start/modals/tools/SheetsModal').then(
      (m) => m.SheetsModal
    ),
  { ssr: false }
);
