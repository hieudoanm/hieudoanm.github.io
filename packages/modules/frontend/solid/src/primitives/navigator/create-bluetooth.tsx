import { createSignal } from 'solid-js';

export const createBluetooth = () => {
  const [device, setDevice] = createSignal<BluetoothDevice | null>(null);
  const [error, setError] = createSignal<string | null>(null);

  const requestBluetoothDevice = async () => {
    try {
      const selectedDevice = await navigator.bluetooth.requestDevice({
        acceptAllDevices: true,
        optionalServices: ['battery_service'],
      });
      setDevice(selectedDevice);
    } catch (err) {
      console.error(err);
      setError('Bluetooth device request failed');
    }
  };

  return { device, requestBluetoothDevice, error };
};
