import type { Annotation, AnnotationLayer, Point } from '@/types/annotation';

interface GeoJsonPosition {
  type: 'Point' | 'LineString' | 'Polygon';
  coordinates: number[][] | number[][][];
}

interface GeoJsonFeature {
  type: 'Feature';
  properties: {
    layer: string;
    color: string;
    kind: string;
  };
  geometry: GeoJsonPosition;
}

interface GeoJsonFeatureCollection {
  type: 'FeatureCollection';
  features: GeoJsonFeature[];
}

const toPosition = (point: Point): number[] => [point.x, point.y];

const polygonCoordinates = (points: Point[]): number[][][] => {
  const ring = points.map(toPosition);
  ring.push(toPosition(points[0]));
  return [ring];
};

export const layersToGeoJson = (layers: AnnotationLayer[]): string => {
  const features = layers.flatMap<GeoJsonFeature>((layer) => {
    if (!layer.visible) return [];
    return layer.annotations.map((annotation: Annotation) => ({
      type: 'Feature',
      properties: {
        layer: layer.name,
        color: layer.color,
        kind: annotation.kind,
      },
      geometry: {
        type: annotation.kind === 'polygon' ? 'Polygon' : 'LineString',
        coordinates:
          annotation.kind === 'polygon'
            ? polygonCoordinates(annotation.points)
            : annotation.points.map(toPosition),
      },
    }));
  });
  const collection: GeoJsonFeatureCollection = {
    type: 'FeatureCollection',
    features,
  };
  return JSON.stringify(collection, null, 2);
};
