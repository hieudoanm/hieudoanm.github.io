/* eslint-disable @typescript-eslint/no-explicit-any */
import { FaSolidPlug, FaSolidPlugCircleBolt } from 'solid-icons/fa';
import { createSignal, onMount } from 'solid-js';

type BatteryInfo = {
  charging: boolean;
  level: number;
  chargingTime: number;
  dischargingTime: number;
};

type BatteryManager = EventTarget & BatteryInfo;

export const WidgetBattery = () => {
  const [batteryInfo, setBatteryInfo] = createSignal<BatteryInfo>({
    charging: false,
    level: 1,
    chargingTime: 0,
    dischargingTime: 0,
  });

  onMount(() => {
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
        if (navigator && typeof (navigator as any).getBattery === 'function') {
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
  });

  return (
    <div class="shadow-3xl relative aspect-square w-full max-w-60 overflow-hidden rounded-full bg-gray-900 text-gray-100">
      <div class="flex h-full w-full items-center justify-center p-8">
        <div
          class={`flex flex-col items-center justify-center gap-y-4 ${batteryInfo().charging ? 'text-red-500' : 'text-gray-100'}`}>
          <div
            class={`flex aspect-square w-24 items-center justify-center rounded-full border-8 ${batteryInfo().charging ? 'border-red-500' : 'border-white'}`}>
            {batteryInfo().charging ? (
              <FaSolidPlugCircleBolt class="text-4xl" />
            ) : (
              <FaSolidPlug class="text-4xl" />
            )}
          </div>
          <p class="text-2xl">{batteryInfo().level * 100}%</p>
        </div>
      </div>
    </div>
  );
};
