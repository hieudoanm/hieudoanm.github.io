import { ComponentType } from 'react';

const loadCountdown = () =>
  import('@hieudoanm.github.io/components/pages/start/modals/clocks/CountdownModal').then(
    (m) => ({ default: m.CountdownModal })
  );

const loadCron = () =>
  import('@hieudoanm.github.io/components/pages/start/modals/clocks/CronModal').then(
    (m) => ({ default: m.CronModal })
  );

const loadDaysCount = () =>
  import('@hieudoanm.github.io/components/pages/start/modals/clocks/DaysCountModal').then(
    (m) => ({ default: m.DaysCountModal })
  );

const loadEpochConvert = () =>
  import('@hieudoanm.github.io/components/pages/start/modals/clocks/EpochConvertModal').then(
    (m) => ({ default: m.EpochConvertModal })
  );

const loadPomodoro = () =>
  import('@hieudoanm.github.io/components/pages/start/modals/clocks/PomodoroModal').then(
    (m) => ({ default: m.PomodoroModal })
  );

const loadWatchface = () =>
  import('@hieudoanm.github.io/components/pages/start/modals/clocks/WatchfaceModal').then(
    (m) => ({ default: m.WatchFaceModal })
  );

export const loaders: Record<
  string,
  () => Promise<{ default: ComponentType<{ onClose: () => void }> }>
> = {
  countdown: loadCountdown,
  cron: loadCron,
  'days-count': loadDaysCount,
  'epoch-convert': loadEpochConvert,
  pomodoro: loadPomodoro,
  watchface: loadWatchface,
};
