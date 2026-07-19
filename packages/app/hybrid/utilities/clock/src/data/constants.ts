import {
  PiCoffeeBold,
  PiClockBold,
  PiGlobeBold,
  PiHourglassBold,
  PiWatchBold,
} from 'react-icons/pi';

export const APPS = [
  { key: 'watchface', label: 'Watchface', Icon: PiClockBold },
  { key: 'world-clock', label: 'World Clock', Icon: PiGlobeBold },
  { key: 'timer', label: 'Timer', Icon: PiHourglassBold },
  { key: 'stopwatch', label: 'Stopwatch', Icon: PiWatchBold },
  { key: 'pomodoro', label: 'Pomodoro', Icon: PiCoffeeBold },
] as const;

export type AppKey = (typeof APPS)[number]['key'];
