import { useEffect, useState } from 'react';

export const useBluetooth = (): any | false => {
  const [bluetooth, setBluetooth] = useState<any | false>(false);

  useEffect(() => {
    if (
      !navigator ||
      !('bluetooth' in navigator) ||
      typeof navigator.bluetooth.getAvailability === 'undefined' ||
      typeof navigator.bluetooth.getDevices === 'undefined'
    ) {
      return setBluetooth(false);
    }
    setBluetooth(navigator.bluetooth);
  }, []);

  return bluetooth;
};
