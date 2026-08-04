import { act, renderHook } from '@testing-library/react';
import { useImageViewer } from '@/hooks/useImageViewer';
import { DEFAULT_CHANNEL_STATES } from '@/data/channels';
import { createSampleRaster } from '@/data/sample';

jest.mock('@/lib/image/load', () => ({
  loadImageFiles: jest.fn().mockResolvedValue([]),
}));

describe('useImageViewer', () => {
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
});
