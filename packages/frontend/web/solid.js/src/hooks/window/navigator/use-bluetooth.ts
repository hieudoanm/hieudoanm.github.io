import { createSignal, onMount } from 'solid-js';

export const useBluetooth = (): Bluetooth | false => {
  const [bluetooth, setBluetooth] = createSignal<Bluetooth | false>(false);

  onMount(() => {
    if (
      typeof window !== 'undefined' &&
      (!window.navigator ||
        !('bluetooth' in window.navigator) ||
        typeof window.navigator.bluetooth.getAvailability === 'undefined' ||
        typeof window.navigator.bluetooth.getDevices === 'undefined')
    ) {
      return setBluetooth(false);
    }
    setBluetooth(window.navigator.bluetooth);
  });

  return bluetooth();
};
