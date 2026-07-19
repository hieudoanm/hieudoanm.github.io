import { useEffect, useRef, useState } from 'react';

const MIN_FIT = 0.1;
const MAX_FIT = 1.5;
const MIN_ZOOM = 0.5;
const MAX_ZOOM = 2;

interface PreviewScaleResult {
  containerRef: React.RefObject<HTMLDivElement | null>;
  scale: number;
  zoom: number;
  setZoom: (zoom: number) => void;
}

export const usePreviewScale = (widthPx: number): PreviewScaleResult => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [fit, setFit] = useState(0.5);
  const [zoom, setZoom] = useState(1);

  useEffect(() => {
    const element = containerRef.current;
    if (!element) return;
    const measure = () => {
      const available = element.clientWidth - 48;
      setFit(Math.max(MIN_FIT, Math.min(MAX_FIT, available / widthPx)));
    };
    measure();
    window.addEventListener('resize', measure);
    return () => window.removeEventListener('resize', measure);
  }, [widthPx]);

  return {
    containerRef,
    scale: fit * zoom,
    zoom,
    setZoom,
  };
};

export const clampZoom = (zoom: number): number =>
  Math.max(MIN_ZOOM, Math.min(MAX_ZOOM, zoom));
