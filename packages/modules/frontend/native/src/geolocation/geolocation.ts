export interface GeolocationAPI {
  getCurrent: (options?: PositionOptions) => Promise<GeolocationPosition>;

  watch: (
    onSuccess: (pos: GeolocationPosition) => void,
    onError?: (err: GeolocationPositionError) => void,
    options?: PositionOptions
  ) => number | null;

  clearWatch: (id: number) => void;

  isSupported: () => boolean;
}

const getGeolocation = (): Geolocation | null => {
  if (typeof window === 'undefined') return null;
  if (!navigator?.geolocation) return null;
  return navigator.geolocation;
};

export const createGeolocation = (): GeolocationAPI => {
  const geo = getGeolocation();

  const isSupported = (): boolean => geo !== null;

  const getCurrent = async (
    options?: PositionOptions
  ): Promise<GeolocationPosition> => {
    if (!geo) {
      throw new Error('Geolocation is not supported');
    }

    return new Promise((resolve, reject) => {
      geo.getCurrentPosition(resolve, reject, options);
    });
  };

  const watch = (
    onSuccess: (pos: GeolocationPosition) => void,
    onError?: (err: GeolocationPositionError) => void,
    options?: PositionOptions
  ): number | null => {
    if (!geo) return null;

    return geo.watchPosition(onSuccess, onError, options);
  };

  const clearWatch = (id: number): void => {
    if (!geo) return;
    geo.clearWatch(id);
  };

  return {
    getCurrent,
    watch,
    clearWatch,
    isSupported,
  };
};
