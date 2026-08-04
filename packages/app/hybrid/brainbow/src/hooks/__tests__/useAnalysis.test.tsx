import { act, renderHook } from '@testing-library/react';
import { useAnalysis } from '@/hooks/useAnalysis';
import { createSampleRaster } from '@/data/sample';

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
