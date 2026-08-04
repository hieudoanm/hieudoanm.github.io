import { viewerStore } from '@/lib/store/viewerStore';
import type { ImageRaster } from '@/types/image';

const raster: ImageRaster = {
  width: 1,
  height: 1,
  data: new Uint8ClampedArray([0, 0, 0, 255]),
};

describe('viewerStore', () => {
  beforeEach(() => {
    viewerStore.take();
  });

  it('returns null when empty', () => {
    expect(viewerStore.take()).toBeNull();
  });

  it('returns the pending transfer', () => {
    viewerStore.set(raster, 'sample.png');
    expect(viewerStore.take()).toEqual({ raster, name: 'sample.png' });
  });

  it('clears the transfer after taking it', () => {
    viewerStore.set(raster, 'sample.png');
    viewerStore.take();
    expect(viewerStore.take()).toBeNull();
  });
});
