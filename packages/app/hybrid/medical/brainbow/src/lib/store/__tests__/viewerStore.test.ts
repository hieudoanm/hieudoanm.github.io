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

  it('stores a stack alongside its channel raster', () => {
    const stack = {
      width: 1,
      height: 1,
      slices: [
        { id: 's1', z: 0, frame: null, planes: channelRaster.planes },
        { id: 's2', z: 1, frame: null, planes: channelRaster.planes },
      ],
    };
    viewerStore.setStack(channelRaster, stack, 'stack.tif', null);
    const transfer = viewerStore.take();
    expect(transfer?.stack?.slices).toHaveLength(2);
    expect(transfer?.name).toBe('stack.tif');
  });

  it('stores a project transfer from its first image', () => {
    viewerStore.setProject({
      format: 'brainbow-project',
      version: 1,
      name: 'Neuron',
      createdAt: '2026-01-01T00:00:00.000Z',
      updatedAt: '2026-01-01T00:00:00.000Z',
      images: [
        {
          id: 'img-1',
          name: 'scan.png',
          width: 2,
          height: 1,
          data: 'AAEAAA==',
          calibration: { pixelsPerMicron: 6.25 },
        },
      ],
      channels: [],
      layers: [],
    });
    const transfer = viewerStore.take();
    expect(transfer?.name).toBe('Neuron');
    expect(transfer?.calibration).toEqual({ pixelsPerMicron: 6.25 });
    expect(transfer?.raster).toMatchObject({ width: 2, height: 1 });
    expect(transfer?.project?.name).toBe('Neuron');
  });

  it('ignores a project without images', () => {
    viewerStore.setProject({
      format: 'brainbow-project',
      version: 1,
      name: 'Empty',
      createdAt: '2026-01-01T00:00:00.000Z',
      updatedAt: '2026-01-01T00:00:00.000Z',
      images: [],
      channels: [],
      layers: [],
    });
    expect(viewerStore.take()).toBeNull();
  });
});
