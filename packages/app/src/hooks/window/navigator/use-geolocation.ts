import { useEffect, useState } from 'react';

type GeolocationCoordinates = {
  latitude: number;
  longitude: number;
  accuracy: number | null;
  altitude: number | null;
  altitudeAccuracy: number | null;
  heading: number | null;
  speed: number | null;
  error: string | null;
};

export const useGeolocation = (): GeolocationCoordinates => {
  const [coordinates, setCoordinates] = useState<GeolocationCoordinates>({
    latitude: 0,
    longitude: 0,
    accuracy: 0,
    altitude: 0,
    altitudeAccuracy: 0,
    heading: 0,
    speed: 0,
    error: null,
  });

  useEffect(() => {
    if (!navigator.geolocation) {
      setCoordinates((prevState) => ({
        ...prevState,
        error: 'Geolocation is not supported by this browser.',
      }));
      return;
    }

    if (
      typeof window !== 'undefined' &&
      typeof window.navigator.geolocation.getCurrentPosition !== 'function'
    ) {
      return;
    }

    window.navigator.geolocation.getCurrentPosition((position) => {
      const { coords } = position;
      setCoordinates({ ...coords.toJSON(), error: null });
    });
  }, []);

  return coordinates;
};
