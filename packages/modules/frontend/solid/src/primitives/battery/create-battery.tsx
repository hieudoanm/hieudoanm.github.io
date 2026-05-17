import { createSignal, onCleanup, onMount } from 'solid-js';

interface BatteryManager extends EventTarget {
  charging: boolean;
  chargingTime: number;
  dischargingTime: number;
  level: number;
  onchargingchange: ((this: BatteryManager, ev: Event) => unknown) | null;
  onchargingtimechange: ((this: BatteryManager, ev: Event) => unknown) | null;
  ondischargingtimechange:
    ((this: BatteryManager, ev: Event) => unknown) | null;
  onlevelchange: ((this: BatteryManager, ev: Event) => unknown) | void;
}

interface BatteryStatus {
  charging: boolean;
  level: number;
  chargingTime: number;
  dischargingTime: number;
}

export const createBattery = () => {
  const [battery, setBattery] = createSignal<BatteryStatus | null>(null);

  onMount(() => {
    let batteryManager: BatteryManager | null = null;

    const updateBattery = (batt: BatteryManager) => {
      setBattery({
        charging: batt.charging,
        level: batt.level,
        chargingTime: batt.chargingTime,
        dischargingTime: batt.dischargingTime,
      });
    };

    (navigator as unknown as { getBattery?: () => Promise<BatteryManager> })
      .getBattery?.()
      .then((batt: BatteryManager) => {
        batteryManager = batt;
        updateBattery(batt);

        batt.addEventListener('chargingchange', () => updateBattery(batt));
        batt.addEventListener('levelchange', () => updateBattery(batt));
        batt.addEventListener('chargingtimechange', () => updateBattery(batt));
        batt.addEventListener('dischargingtimechange', () =>
          updateBattery(batt)
        );
      });

    onCleanup(() => {
      if (!batteryManager) return;
      batteryManager.removeEventListener('chargingchange', () =>
        updateBattery(batteryManager!)
      );
      batteryManager.removeEventListener('levelchange', () =>
        updateBattery(batteryManager!)
      );
      batteryManager.removeEventListener('chargingtimechange', () =>
        updateBattery(batteryManager!)
      );
      batteryManager.removeEventListener('dischargingtimechange', () =>
        updateBattery(batteryManager!)
      );
    });
  });

  return {
    get battery() {
      return battery();
    },
  };
};
