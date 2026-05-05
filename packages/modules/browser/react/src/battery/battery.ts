/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from 'react';

interface BatteryManager extends EventTarget {
  charging: boolean;
  chargingTime: number; // seconds until fully charged, or 0 if fully charged
  dischargingTime: number; // seconds until fully discharged, or Infinity if charging
  level: number; // battery level between 0 (empty) and 1 (full)

  // Events
  onchargingchange: ((this: BatteryManager, ev: Event) => any) | null;
  onchargingtimechange: ((this: BatteryManager, ev: Event) => any) | null;
  ondischargingtimechange: ((this: BatteryManager, ev: Event) => any) | null;
  onlevelchange: ((this: BatteryManager, ev: Event) => any) | void;
}

interface BatteryStatus {
  charging: boolean;
  level: number; // 0 to 1
  chargingTime: number; // seconds
  dischargingTime: number; // seconds
}

export const useBattery = () => {
  const [battery, setBattery] = useState<BatteryStatus | null>(null);

  useEffect(() => {
    let batteryManager: BatteryManager | null = null;

    const updateBattery = (batt: BatteryManager) => {
      setBattery({
        charging: batt.charging,
        level: batt.level,
        chargingTime: batt.chargingTime,
        dischargingTime: batt.dischargingTime,
      });
    };

    (navigator as any).getBattery?.().then((batt: BatteryManager) => {
      batteryManager = batt;
      updateBattery(batt);

      batt.addEventListener('chargingchange', () => updateBattery(batt));
      batt.addEventListener('levelchange', () => updateBattery(batt));
      batt.addEventListener('chargingtimechange', () => updateBattery(batt));
      batt.addEventListener('dischargingtimechange', () => updateBattery(batt));
    });

    return () => {
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
    };
  }, []);

  return battery;
};
