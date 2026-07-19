import { createSignal, onCleanup } from 'solid-js';

type GeolocationState = {
  coords: GeolocationCoordinates | null;
  timestamp: number | null;
  error: Error | GeolocationPositionError | null;
};

export const createGeolocation = (
  watch: boolean = false,
  options?: PositionOptions
) => {
  const [state, setState] = createSignal<GeolocationState>({
    coords: null,
    timestamp: null,
    error: null,
  });

  if (!navigator.geolocation) {
    setState((s) => ({
      ...s,
      error: new Error('Geolocation is not supported'),
    }));
  } else {
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

    onCleanup(() => {
      if (watch && watchId !== undefined) {
        navigator.geolocation.clearWatch(watchId);
      }
    });
  }

  return {
    get coords() {
      return state().coords;
    },
    get timestamp() {
      return state().timestamp;
    },
    get error() {
      return state().error;
    },
  };
};
