import type { AnnotationLayer } from '@/types/annotation';
import { layersToGeoJson } from '@/lib/export/geojson';

interface TestFeature {
  type: string;
  properties: { layer: string; color: string; kind: string };
  geometry: {
    type: string;
    coordinates: number[][] | number[][][];
  };
}

interface TestCollection {
  type: string;
  features: TestFeature[];
}

const layer = (overrides: Partial<AnnotationLayer> = {}): AnnotationLayer => ({
  id: 'l1',
  name: 'Neurons',
  color: '#ff0000',
  visible: true,
  annotations: [
    {
      id: 'a1',
      kind: 'polygon',
      points: [
        { x: 10, y: 20 },
        { x: 30, y: 40 },
        { x: 50, y: 60 },
      ],
    },
  ],
  ...overrides,
});

const parse = (json: string): TestCollection => JSON.parse(json);

describe('layersToGeoJson', () => {
  it('returns an empty FeatureCollection for no visible layers', () => {
    const collection = parse(layersToGeoJson([]));
    expect(collection.type).toBe('FeatureCollection');
    expect(collection.features).toHaveLength(0);
  });

  it('closes polygon rings by repeating the first vertex', () => {
    const collection = parse(layersToGeoJson([layer()]));
    const coordinates = collection.features[0].geometry.coordinates;
    expect(collection.features[0].geometry.type).toBe('Polygon');
    expect(coordinates[0][0]).toEqual([10, 20]);
    expect(coordinates[0]).toHaveLength(4);
    expect(coordinates[0][3]).toEqual([10, 20]);
  });

  it('exports freehand annotations as LineStrings', () => {
    const annotation = { ...layer().annotations[0], kind: 'freehand' as const };
    const collection = parse(
      layersToGeoJson([layer({ annotations: [annotation] })])
    );
    expect(collection.features[0].geometry.type).toBe('LineString');
    expect(collection.features[0].geometry.coordinates).toEqual([
      [10, 20],
      [30, 40],
      [50, 60],
    ]);
  });

  it('carries layer, color and kind as feature properties', () => {
    const annotation = { ...layer().annotations[0], kind: 'freehand' as const };
    const collection = parse(
      layersToGeoJson([layer({ annotations: [annotation] })])
    );
    expect(collection.features[0].properties).toEqual({
      layer: 'Neurons',
      color: '#ff0000',
      kind: 'freehand',
    });
  });

  it('omits invisible layers', () => {
    const collection = parse(
      layersToGeoJson([layer({ visible: false, name: 'Hidden' })])
    );
    expect(collection.features).toHaveLength(0);
  });
});
