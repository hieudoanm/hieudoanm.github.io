import { useState, useEffect } from 'react';

export const useGeolocation = () => {
  const [location, setLocation] = useState<{
    latitude: number | null;
    longitude: number | null;
    error: string | null;
  }>({
    latitude: null,
    longitude: null,
    error: null,
  });

  useEffect(() => {
    if (!navigator.geolocation) {
      setLocation((prevState) => ({
        ...prevState,
        error: 'Geolocation is not supported by this browser.',
      }));
      return;
    }

    const handleSuccess = (position: {
      coords: { latitude: number; longitude: number };
    }) => {
      setLocation({
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
        error: null,
      });
    };

    const handleError = (error: GeolocationPositionError) => {
      setLocation((prevState) => ({
        ...prevState,
        error: error.message,
      }));
    };

    const watcher: number = navigator.geolocation.watchPosition(
      handleSuccess,
      handleError
    );

    // Cleanup function (optional for continuous tracking with `watchPosition`)
    return () => navigator.geolocation.clearWatch(watcher);
  }, []);

  return location;
};
