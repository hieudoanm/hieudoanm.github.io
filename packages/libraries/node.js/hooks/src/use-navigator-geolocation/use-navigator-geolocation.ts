import { useEffect, useState } from 'react';

type GeolocationCoordinates = {
  accuracy: number;
  altitude: number;
  altitudeAccuracy: number;
  heading: number;
  speed: number;
  latitude: number;
  longitude: number;
};

export const useGeolocation = (): GeolocationCoordinates => {
  const [position, setPosition] = useState<GeolocationCoordinates>({
    accuracy: 0,
    altitude: 0,
    altitudeAccuracy: 0,
    heading: 0,
    speed: 0,
    latitude: 0,
    longitude: 0,
  });

  useEffect(() => {
    (() => {
      if (
        typeof window !== 'undefined' &&
        typeof window.navigator.geolocation.getCurrentPosition !== 'function'
      ) {
        return;
      }
      window.navigator.geolocation.getCurrentPosition((position) => {
        const { coords } = position;
        console.info('coords', coords);
        setPosition(coords as GeolocationCoordinates);
      });
    })();
  }, []);

  return position;
};
