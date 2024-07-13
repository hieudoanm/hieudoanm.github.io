import { logger } from '@web/log';
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

export const usePosition = (): GeolocationCoordinates => {
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
      if (typeof navigator.geolocation.getCurrentPosition !== 'function') {
        return;
      }
      navigator.geolocation.getCurrentPosition((position) => {
        const { coords } = position;
        logger.info('coords', coords);
        setPosition(coords as GeolocationCoordinates);
      });
    })();
  }, []);

  return position;
};
