/* eslint-disable @typescript-eslint/no-explicit-any */
export interface BatteryStatus {
  charging: boolean;
  level: number; // 0 → 1
  chargingTime: number;
  dischargingTime: number;
}

export interface BatteryAPI {
  get: () => Promise<BatteryStatus | null>;

  watch: (onChange: (state: BatteryStatus) => void) => Promise<() => void>;

  isSupported: () => boolean;
}

interface BatteryManager extends EventTarget {
  charging: boolean;
  chargingTime: number;
  dischargingTime: number;
  level: number;

  addEventListener(type: string, listener: EventListener): void;

  removeEventListener(type: string, listener: EventListener): void;
}

const getBatteryManager = async (): Promise<BatteryManager | null> => {
  if (typeof navigator === 'undefined') return null;

  const nav = navigator as any;
  if (!nav.getBattery) return null;

  return await nav.getBattery();
};

const toStatus = (batt: BatteryManager): BatteryStatus => ({
  charging: batt.charging,
  level: batt.level,
  chargingTime: batt.chargingTime,
  dischargingTime: batt.dischargingTime,
});

export const createBattery = (): BatteryAPI => {
  const isSupported = (): boolean =>
    typeof navigator !== 'undefined' &&
    typeof (navigator as any).getBattery === 'function';

  const get = async (): Promise<BatteryStatus | null> => {
    const batt = await getBatteryManager();
    if (!batt) return null;
    return toStatus(batt);
  };

  const watch = async (
    onChange: (state: BatteryStatus) => void
  ): Promise<() => void> => {
    const batt = await getBatteryManager();
    if (!batt) return () => {};

    const handler = () => {
      onChange(toStatus(batt));
    };

    // initial emit
    handler();

    batt.addEventListener('chargingchange', handler);
    batt.addEventListener('levelchange', handler);
    batt.addEventListener('chargingtimechange', handler);
    batt.addEventListener('dischargingtimechange', handler);

    // cleanup function
    return () => {
      batt.removeEventListener('chargingchange', handler);
      batt.removeEventListener('levelchange', handler);
      batt.removeEventListener('chargingtimechange', handler);
      batt.removeEventListener('dischargingtimechange', handler);
    };
  };

  return {
    get,
    watch,
    isSupported,
  };
};
