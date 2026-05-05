import { useEffect, useState } from 'react';

type GeolocationState = {
  coords: GeolocationCoordinates | null;
  timestamp: number | null;
  error: Error | GeolocationPositionError | null;
};

export const useGeolocation = (
  watch: boolean = false,
  options?: PositionOptions
) => {
  const [state, setState] = useState<GeolocationState>({
    coords: null,
    timestamp: null,
    error: null,
  });

  useEffect(() => {
    if (!navigator.geolocation) {
      setState((s) => ({
        ...s,
        error: new Error('Geolocation is not supported'),
      }));
      return;
    }

    const onSuccess = (pos: GeolocationPosition) => {
      setState({
        coords: pos.coords,
        timestamp: pos.timestamp,
        error: null,
      });
    };

    const onError = (err: GeolocationPositionError) => {
      setState((s) => ({ ...s, error: err }));
    };

    let watchId: number;

    if (watch) {
      watchId = navigator.geolocation.watchPosition(
        onSuccess,
        onError,
        options
      );
    } else {
      navigator.geolocation.getCurrentPosition(onSuccess, onError, options);
    }

    return () => {
      if (watch && watchId !== undefined) {
        navigator.geolocation.clearWatch(watchId);
      }
    };
  }, [watch, options]);

  return state;
};
