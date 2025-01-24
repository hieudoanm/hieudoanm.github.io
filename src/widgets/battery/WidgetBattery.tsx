/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from 'react';
import { FaPlug, FaPlugCircleBolt } from 'react-icons/fa6';

type BatteryInfo = {
  charging: boolean;
  level: number;
  chargingTime: number;
  dischargingTime: number;
};

type BatteryManager = EventTarget & BatteryInfo;

export const WidgetBattery = () => {
  const [batteryInfo, setBatteryInfo] = useState<BatteryInfo>({
    charging: false,
    level: 1,
    chargingTime: 0,
    dischargingTime: 0,
  });

  useEffect(() => {
    let batteryManager: BatteryManager;

    const updateBatteryInfo = (battery: any) => {
      setBatteryInfo({
        charging: battery.charging,
        level: battery.level,
        chargingTime: battery.chargingTime,
        dischargingTime: battery.dischargingTime,
      });
    };

    const initBattery = async () => {
      try {
        if (navigator) {
          batteryManager = await (navigator as any).getBattery();
          updateBatteryInfo(batteryManager);

          // Add event listeners to update the battery status dynamically
          batteryManager.addEventListener('chargingchange', () =>
            updateBatteryInfo(batteryManager)
          );
          batteryManager.addEventListener('levelchange', () =>
            updateBatteryInfo(batteryManager)
          );
          batteryManager.addEventListener('chargingtimechange', () =>
            updateBatteryInfo(batteryManager)
          );
          batteryManager.addEventListener('dischargingtimechange', () =>
            updateBatteryInfo(batteryManager)
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
        batteryManager.removeEventListener('chargingchange', updateBatteryInfo);
        batteryManager.removeEventListener('levelchange', updateBatteryInfo);
        batteryManager.removeEventListener(
          'chargingtimechange',
          updateBatteryInfo
        );
        batteryManager.removeEventListener(
          'dischargingtimechange',
          updateBatteryInfo
        );
      }
    };
  }, []);

  return (
    <div className="shadow-3xl relative aspect-square w-72 overflow-hidden rounded-full bg-black text-white">
      <div className="flex h-full w-full items-center justify-center p-8">
        <div
          className={`flex flex-col items-center justify-center gap-y-4 ${batteryInfo.charging ? 'text-red-500' : 'text-white'}`}>
          <div
            className={`flex aspect-square w-32 items-center justify-center rounded-full border-8 ${batteryInfo.charging ? 'border-red-500' : 'border-white'}`}>
            {batteryInfo.charging ? (
              <FaPlugCircleBolt className="text-6xl" />
            ) : (
              <FaPlug className="text-6xl" />
            )}
          </div>
          <p className="text-3xl">{batteryInfo.level * 100}%</p>
        </div>
      </div>
    </div>
  );
};
