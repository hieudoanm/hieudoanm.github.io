import { viewerStore } from '@/lib/store/viewerStore';
import type { ChannelRaster, ImageRaster } from '@/types/image';

const raster: ImageRaster = {
  width: 1,
  height: 1,
  data: new Uint8ClampedArray([10, 20, 30, 255]),
};

const channelRaster: ChannelRaster = {
  width: 1,
  height: 1,
  planes: [
    { id: 'r', name: 'Red', data: new Uint8ClampedArray([0]) },
    { id: 'g', name: 'Green', data: new Uint8ClampedArray([0]) },
    { id: 'b', name: 'Blue', data: new Uint8ClampedArray([255]) },
  ],
};

describe('viewerStore', () => {
  beforeEach(() => {
    viewerStore.take();
  });

  it('returns null when empty', () => {
    expect(viewerStore.take()).toBeNull();
  });

  it('converts an ImageRaster transfer to channel planes', () => {
    viewerStore.set(raster, 'sample.png');
    const transfer = viewerStore.take();
    expect(transfer).toMatchObject({ name: 'sample.png', calibration: null });
    expect(transfer?.raster.planes).toHaveLength(3);
    expect(Array.from(transfer?.raster.planes[0].data ?? [])).toEqual([10]);
    expect(Array.from(transfer?.raster.planes[1].data ?? [])).toEqual([20]);
    expect(Array.from(transfer?.raster.planes[2].data ?? [])).toEqual([30]);
  });

  it('stores a channel raster with its calibration', () => {
    viewerStore.setChannel(channelRaster, 'stack.tif', {
      pixelsPerMicron: 6.25,
    });
    expect(viewerStore.take()).toEqual({
      raster: channelRaster,
      name: 'stack.tif',
      calibration: { pixelsPerMicron: 6.25 },
    });
  });

  it('clears the transfer after taking it', () => {
    viewerStore.set(raster, 'sample.png');
    viewerStore.take();
    expect(viewerStore.take()).toBeNull();
  });
});
