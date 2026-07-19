import { act, renderHook } from '@testing-library/react';
import { useAnalysis } from '@/hooks/useAnalysis';
import { createSampleRaster } from '@/data/sample';
import type { AnalyzeOptions } from '@/lib/analysis/analyze';
import type { ImageRaster } from '@/types/image';

jest.mock('@/lib/analysis/analyze', () => ({
  analyzeRaster: jest.fn(() => ({
    summary: {
      totalPixels: 1,
      diversity: 0,
      clusters: [],
    },
    regions: [],
  })),
}));

jest.mock('@/lib/analysis/batch', () => {
  const actual = jest.requireActual('@/lib/analysis/batch');
  return {
    ...actual,
    analyzeBatch: jest.fn(() =>
      Promise.resolve({
        results: [],
        aggregate: {
          imageCount: 2,
          totalPixels: 100,
          totalRegions: 4,
          meanDiversity: 0.5,
        },
      })
    ),
  };
});

describe('useAnalysis', () => {
  it('invokes the completion callback when a batch finishes', async () => {
    const { result } = renderHook(() => useAnalysis());
    const onDone = jest.fn();
    await act(async () => {
      await result.current.analyzeImages(
        [createSampleRaster(), createSampleRaster()],
        onDone
      );
    });
    expect(result.current.status).toBe('done');
    expect(result.current.progress).toBe(1);
    expect(onDone).toHaveBeenCalledTimes(1);
    expect(onDone.mock.calls[0][0].aggregate.imageCount).toBe(2);
  });

  it('reports errors without calling the completion callback', async () => {
    const batch = jest.requireMock('@/lib/analysis/batch');
    batch.analyzeBatch.mockRejectedValueOnce(new Error('boom'));
    const { result } = renderHook(() => useAnalysis());
    const onDone = jest.fn();
    await act(async () => {
      await result.current.analyzeImages([createSampleRaster()], onDone);
    });
    expect(result.current.status).toBe('error');
    expect(result.current.error).toBe('boom');
    expect(onDone).not.toHaveBeenCalled();
  });
});

describe('useAnalysis options', () => {
  it('updates k through setK', () => {
    const { result } = renderHook(() => useAnalysis());
    act(() => result.current.setK(8));
    expect(result.current.k).toBe(8);
    expect(result.current.options).toMatchObject({ k: 8 });
  });

  it('merges patches through setOptions', () => {
    const { result } = renderHook(() => useAnalysis());
    act(() => result.current.setOptions({ stride: 2, minRegionSize: 2 }));
    expect(result.current.options).toMatchObject({
      stride: 2,
      minRegionSize: 2,
    });
  });

  it('applies preset options', () => {
    const { result } = renderHook(() => useAnalysis());
    act(() =>
      result.current.applyPreset({
        id: 'fast',
        name: 'Fast',
        options: { k: 3, iterations: 5, stride: 8, minRegionSize: 8 },
      })
    );
    expect(result.current.options).toEqual({
      k: 3,
      iterations: 5,
      stride: 8,
      minRegionSize: 8,
    });
  });

  it('saves the current parameters as a preset', () => {
    window.localStorage.clear();
    const { result } = renderHook(() => useAnalysis());
    act(() => result.current.setK(6));
    let created:
      ReturnType<typeof result.current.saveCurrentPreset> | undefined;
    act(() => {
      created = result.current.saveCurrentPreset('Custom');
    });
    expect(created?.name).toBe('Custom');
    expect(created?.options.k).toBe(6);
    expect(
      result.current.presets.some((preset) => preset.id === created?.id)
    ).toBe(true);
  });

  it('deletes a saved preset', () => {
    const { result } = renderHook(() => useAnalysis());
    act(() => {
      result.current.saveCurrentPreset('ToDelete');
    });
    const before = result.current.presets.length;
    act(() => {
      result.current.deletePreset(result.current.presets[0].id);
    });
    expect(result.current.presets).toHaveLength(before - 1);
  });
});

describe('useAnalysis runs', () => {
  it('marks a single analysis done with its result', async () => {
    const { result } = renderHook(() => useAnalysis());
    await act(async () => {
      await result.current.analyzeSingle(createSampleRaster());
    });
    expect(result.current.status).toBe('done');
    expect(result.current.progress).toBe(1);
    expect(result.current.result).not.toBeNull();
  });

  it('captures analysis errors', async () => {
    const analyze = jest.requireMock('@/lib/analysis/analyze');
    analyze.analyzeRaster.mockImplementationOnce(() => {
      throw new Error('segmentation failed');
    });
    const { result } = renderHook(() => useAnalysis());
    await act(async () => {
      await result.current.analyzeSingle(createSampleRaster());
    });
    expect(result.current.status).toBe('error');
    expect(result.current.error).toBe('segmentation failed');
  });

  it('reports batch progress through the callback', async () => {
    const batch = jest.requireMock('@/lib/analysis/batch');
    batch.analyzeBatch.mockImplementationOnce(
      async (
        _rasters: ImageRaster[],
        _options: Partial<AnalyzeOptions>,
        onProgress: (completed: number, total: number) => void
      ) => {
        onProgress(1, 2);
        return {
          results: [],
          aggregate: {
            imageCount: 2,
            totalPixels: 100,
            totalRegions: 4,
            meanDiversity: 0.5,
          },
        };
      }
    );
    const { result } = renderHook(() => useAnalysis());
    await act(async () => {
      await result.current.analyzeImages([createSampleRaster()]);
    });
    expect(result.current.status).toBe('done');
    expect(result.current.progress).toBe(1);
  });

  it('resets to the idle state', async () => {
    const { result } = renderHook(() => useAnalysis());
    await act(async () => {
      await result.current.analyzeSingle(createSampleRaster());
    });
    act(() => result.current.reset());
    expect(result.current.status).toBe('idle');
    expect(result.current.progress).toBe(0);
    expect(result.current.result).toBeNull();
  });
});
