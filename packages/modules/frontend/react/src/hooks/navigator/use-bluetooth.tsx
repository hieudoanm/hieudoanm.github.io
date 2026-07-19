'use client';

import { useState } from 'react';

export const useBluetooth = () => {
  const [device, setDevice] = useState<BluetoothDevice | null>(null);
  const [error, setError] = useState<string | null>(null);

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
