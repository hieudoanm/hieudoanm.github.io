import dynamic from 'next/dynamic';

export const ChessClockModal = dynamic(
  () =>
    import('@hieudoanm.github.io/components/pages/start/modals/clocks/ChessClockModal').then(
      (m) => m.ChessClockModal
    ),
  { ssr: false }
);
export const CountdownModal = dynamic(
  () =>
    import('@hieudoanm.github.io/components/pages/start/modals/clocks/CountdownModal').then(
      (m) => m.CountdownModal
    ),
  { ssr: false }
);
export const CronModal = dynamic(
  () =>
    import('@hieudoanm.github.io/components/pages/start/modals/clocks/CronModal').then(
      (m) => m.CronModal
    ),
  { ssr: false }
);
export const PomodoroModal = dynamic(
  () =>
    import('@hieudoanm.github.io/components/pages/start/modals/clocks/PomodoroModal').then(
      (m) => m.PomodoroModal
    ),
  { ssr: false }
);
export const WatchFaceModal = dynamic(
  () =>
    import('@hieudoanm.github.io/components/pages/start/modals/clocks/WatchfaceModal').then(
      (m) => m.WatchFaceModal
    ),
  { ssr: false }
);
