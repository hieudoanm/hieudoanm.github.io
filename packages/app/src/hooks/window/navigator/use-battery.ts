/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from 'react';

export type BatteryManagerInfo = {
  charging: boolean;
  level: number;
  chargingTime: number;
  dischargingTime: number;
};

export type BatteryManager = BatteryManagerInfo & EventTarget;

export const useBattery = (): BatteryManagerInfo => {
  const [BatteryManagerInfo, setBatteryManagerInfo] =
    useState<BatteryManagerInfo>({
      charging: false,
      level: 1,
      chargingTime: 0,
      dischargingTime: 0,
    });

  useEffect(() => {
    let batteryManager: BatteryManager;

    const updateBatteryManagerInfo = (battery: any) => {
      setBatteryManagerInfo({
        charging: battery.charging,
        level: battery.level,
        chargingTime: battery.chargingTime,
        dischargingTime: battery.dischargingTime,
      });
    };

    const initBattery = async () => {
      try {
        if (navigator && typeof (navigator as any).getBattery === 'function') {
          batteryManager = await (navigator as any).getBattery();
          updateBatteryManagerInfo(batteryManager);

          // Add event listeners to update the battery status dynamically
          batteryManager.addEventListener('chargingchange', () =>
            updateBatteryManagerInfo(batteryManager)
          );
          batteryManager.addEventListener('levelchange', () =>
            updateBatteryManagerInfo(batteryManager)
          );
          batteryManager.addEventListener('chargingtimechange', () =>
            updateBatteryManagerInfo(batteryManager)
          );
          batteryManager.addEventListener('dischargingtimechange', () =>
            updateBatteryManagerInfo(batteryManager)
          );
        }
      } catch (error) {
        console.error('Battery API not supported', error);
      }
    };

    initBattery();

    // Cleanup event listeners when the component unmounts
    return () => {
      if (batteryManager) {
        batteryManager.removeEventListener(
          'chargingchange',
          updateBatteryManagerInfo
        );
        batteryManager.removeEventListener(
          'levelchange',
          updateBatteryManagerInfo
        );
        batteryManager.removeEventListener(
          'chargingtimechange',
          updateBatteryManagerInfo
        );
        batteryManager.removeEventListener(
          'dischargingtimechange',
          updateBatteryManagerInfo
        );
      }
    };
  }, []);

  return BatteryManagerInfo;
};
