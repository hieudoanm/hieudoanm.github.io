import { act, renderHook } from '@testing-library/react';
import { useImageViewer } from '@/hooks/useImageViewer';
import { DEFAULT_CHANNEL_STATES } from '@/data/channels';
import { createSampleRaster } from '@/data/sample';

jest.mock('@/lib/image/load', () => ({
  loadImageFiles: jest.fn().mockResolvedValue([]),
  loadChannelImageFile: jest.fn(),
}));

const channelRaster = () => ({
  width: 4,
  height: 2,
  planes: [
    { id: 'r', name: 'Red', data: new Uint8ClampedArray(8) },
    { id: 'g', name: 'Green', data: new Uint8ClampedArray(8) },
    { id: 'b', name: 'Blue', data: new Uint8ClampedArray(8) },
  ],
});

describe('useImageViewer', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  it('starts empty with default channel states', () => {
    const { result } = renderHook(() => useImageViewer());
    expect(result.current.raster).toBeNull();
    expect(result.current.channels).toEqual(DEFAULT_CHANNEL_STATES);
  });

  it('loads a raster on openDemo', () => {
    const { result } = renderHook(() => useImageViewer());
    act(() => {
      result.current.openDemo();
    });
    expect(result.current.raster).not.toBeNull();
    expect(result.current.name).toBe('demo-brainbow.tif');
  });

  it('toggles channel visibility', () => {
    const { result } = renderHook(() => useImageViewer());
    act(() => {
      result.current.openDemo();
    });
    act(() => {
      result.current.toggleChannel('r', false);
    });
    expect(result.current.channels[0].visible).toBe(false);
  });

  it('sets channel opacity', () => {
    const { result } = renderHook(() => useImageViewer());
    act(() => {
      result.current.openDemo();
    });
    act(() => {
      result.current.setChannelOpacity('g', 0.25);
    });
    expect(result.current.channels[1].opacity).toBe(0.25);
  });

  it('changes transform on zoomIn', () => {
    const { result } = renderHook(() => useImageViewer());
    act(() => {
      result.current.openDemo();
      result.current.setSize({ width: 400, height: 300 });
    });
    const before = result.current.transform;
    act(() => {
      result.current.zoomIn();
    });
    expect(result.current.transform.scale).toBeGreaterThan(before.scale);
  });

  it('loads an external raster', () => {
    const { result } = renderHook(() => useImageViewer());
    const raster = createSampleRaster(16, 16);
    act(() => {
      result.current.loadRaster(raster, 'external.png');
    });
    expect(result.current.name).toBe('external.png');
    expect(result.current.raster?.width).toBe(16);
  });

  it('loads a channel raster with channels and calibration', () => {
    const { result } = renderHook(() => useImageViewer());
    act(() => {
      result.current.loadChannelRaster(
        channelRaster(),
        'stack.tif',
        DEFAULT_CHANNEL_STATES,
        { pixelsPerMicron: 6.25 }
      );
    });
    expect(result.current.name).toBe('stack.tif');
    expect(result.current.calibration).toEqual({ pixelsPerMicron: 6.25 });
    expect(result.current.planes).toHaveLength(3);
  });

  it('imports the first file when files are selected', async () => {
    const load = jest.requireMock('@/lib/image/load') as {
      loadChannelImageFile: jest.Mock;
    };
    load.loadChannelImageFile.mockResolvedValue({
      raster: channelRaster(),
      name: 'scan.tif',
      calibration: { pixelsPerMicron: null },
    });
    const { result } = renderHook(() => useImageViewer());
    const file = new File(['x'], 'scan.tif');
    await act(async () => {
      await result.current.importFiles([file]);
    });
    expect(load.loadChannelImageFile).toHaveBeenCalledWith(file);
    expect(result.current.name).toBe('scan.tif');
  });

  it('ignores empty file selections', async () => {
    const load = jest.requireMock('@/lib/image/load') as {
      loadChannelImageFile: jest.Mock;
    };
    const { result } = renderHook(() => useImageViewer());
    await act(async () => {
      await result.current.importFiles([]);
    });
    expect(load.loadChannelImageFile).not.toHaveBeenCalled();
  });

  it('sets the calibration', () => {
    const { result } = renderHook(() => useImageViewer());
    act(() => {
      result.current.setCalibration({ pixelsPerMicron: 4 });
    });
    expect(result.current.calibration).toEqual({ pixelsPerMicron: 4 });
  });

  it('re-fits the view after rotating the image', () => {
    const { result } = renderHook(() => useImageViewer());
    act(() => {
      result.current.openDemo();
      result.current.setSize({ width: 400, height: 300 });
    });
    act(() => {
      result.current.setOrientation({
        rotation: 90,
        flipX: false,
        flipY: false,
      });
    });
    expect(result.current.orientation).toEqual({
      rotation: 90,
      flipX: false,
      flipY: false,
    });
    expect(result.current.transform.scale).toBeGreaterThan(0);
  });

  it('fits the view on demand', () => {
    const { result } = renderHook(() => useImageViewer());
    act(() => {
      result.current.openDemo();
      result.current.setSize({ width: 400, height: 300 });
      result.current.setTransform({ scale: 5, offsetX: 10, offsetY: 10 });
    });
    act(() => {
      result.current.fitView();
    });
    expect(result.current.transform.scale).toBeLessThan(5);
  });

  it('zooms out around the canvas center', () => {
    const { result } = renderHook(() => useImageViewer());
    act(() => {
      result.current.openDemo();
      result.current.setSize({ width: 400, height: 300 });
    });
    const before = result.current.transform.scale;
    act(() => {
      result.current.zoomOut();
    });
    expect(result.current.transform.scale).toBeLessThan(before);
  });

  it('pans the view by a delta', () => {
    const { result } = renderHook(() => useImageViewer());
    act(() => {
      result.current.openDemo();
    });
    act(() => {
      result.current.pan(25, -10);
    });
    expect(result.current.transform.offsetX).toBe(25);
    expect(result.current.transform.offsetY).toBe(-10);
  });

  it('adds a channel when planes are available', () => {
    const { result } = renderHook(() => useImageViewer());
    act(() => {
      result.current.openDemo();
    });
    const before = result.current.channels.length;
    act(() => {
      result.current.addChannel();
    });
    expect(result.current.channels).toHaveLength(before + 1);
  });

  it('does not add a channel without a raster', () => {
    const { result } = renderHook(() => useImageViewer());
    act(() => {
      result.current.addChannel();
    });
    expect(result.current.channels).toHaveLength(DEFAULT_CHANNEL_STATES.length);
  });

  it('switches a channel source plane', () => {
    const { result } = renderHook(() => useImageViewer());
    act(() => {
      result.current.setChannelSourcePlane('r', 'g');
    });
    expect(result.current.channels[0].sourcePlane).toBe('g');
  });

  it('ignores toggling unknown channels', () => {
    const { result } = renderHook(() => useImageViewer());
    act(() => {
      result.current.toggleChannel('nope', false);
    });
    expect(result.current.channels[0].visible).toBe(true);
  });
});
