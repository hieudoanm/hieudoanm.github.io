import {
  base64ToBytes,
  bytesToBase64,
  createProject,
  deserializeProject,
  imageToProjectImage,
  projectImageToRaster,
  serializeProject,
} from '@/lib/projects/bundle';
import { PROJECT_EXTENSION, PROJECT_VERSION } from '@/lib/projects/bundle';
import type { ImageRaster } from '@/types/image';

const makeRaster = (): ImageRaster => ({
  width: 2,
  height: 1,
  data: new Uint8ClampedArray([1, 2, 3, 255, 4, 5, 6, 255]),
});

describe('bytesToBase64 / base64ToBytes', () => {
  it('round-trips byte data', () => {
    const bytes = new Uint8ClampedArray([0, 1, 255, 128]);
    expect(Array.from(base64ToBytes(bytesToBase64(bytes)))).toEqual([
      0, 1, 255, 128,
    ]);
  });
});

describe('imageToProjectImage / projectImageToRaster', () => {
  it('round-trips raster data through the bundle format', () => {
    const raster = makeRaster();
    const image = imageToProjectImage(raster, 'scan.png');
    expect(image.name).toBe('scan.png');
    const restored = projectImageToRaster(image);
    expect(restored.width).toBe(2);
    expect(restored.height).toBe(1);
    expect(Array.from(restored.data)).toEqual(Array.from(raster.data));
  });

  it('stores the calibration alongside the raster', () => {
    const raster = makeRaster();
    const image = imageToProjectImage(raster, 'scan.png', {
      pixelsPerMicron: 4.5,
    });
    const restored = deserializeProject(
      serializeProject(createProject('demo', [image], [], []))
    );
    expect(restored.images[0].calibration).toEqual({
      pixelsPerMicron: 4.5,
    });
  });

  it('omits calibration when none is provided', () => {
    const raster = makeRaster();
    const image = imageToProjectImage(raster, 'scan.png');
    expect(image.calibration).toBeNull();
  });
});

describe('serializeProject / deserializeProject', () => {
  it('round-trips a project bundle', () => {
    const raster = makeRaster();
    const project = createProject(
      'demo',
      [imageToProjectImage(raster, 'scan.png')],
      [],
      []
    );
    const restored = deserializeProject(serializeProject(project));
    expect(restored.name).toBe('demo');
    expect(restored.version).toBe(PROJECT_VERSION);
    expect(restored.images).toHaveLength(1);
  });

  it('throws on malformed bundles', () => {
    expect(() => deserializeProject('{ "not": "a project" }')).toThrow(
      'Invalid project bundle'
    );
  });

  it('produces a filename with the project extension', () => {
    expect(`${'demo'}.${PROJECT_EXTENSION}`).toBe('demo.brainbow');
  });
});
