'use client';

import { useCallback, useState } from 'react';
import { analyzeRaster, type ImageAnalysis } from '@/lib/analysis/analyze';
import { analyzeBatch, type BatchResult } from '@/lib/analysis/batch';
import type { ImageRaster } from '@/types/image';

export type AnalysisStatus = 'idle' | 'running' | 'done' | 'error';

export interface AnalysisState {
  status: AnalysisStatus;
  progress: number;
  error: string | null;
  k: number;
  result: ImageAnalysis | null;
  batch: BatchResult | null;
}

const INITIAL_STATE: AnalysisState = {
  status: 'idle',
  progress: 0,
  error: null,
  k: 5,
  result: null,
  batch: null,
};

export const useAnalysis = () => {
  const [state, setState] = useState<AnalysisState>(INITIAL_STATE);

  const setK = useCallback((k: number) => {
    setState((current) => ({ ...current, k }));
  }, []);

  const analyzeSingle = useCallback(
    async (raster: ImageRaster) => {
      setState((current) => ({
        ...current,
        status: 'running',
        progress: 0,
        error: null,
      }));
      await new Promise((resolve) => setTimeout(resolve, 0));
      try {
        const result = analyzeRaster(raster, { k: state.k });
        setState((current) => ({
          ...current,
          status: 'done',
          progress: 1,
          result,
          batch: null,
        }));
      } catch (error) {
        setState((current) => ({
          ...current,
          status: 'error',
          error: error instanceof Error ? error.message : 'Analysis failed',
        }));
      }
    },
    [state.k]
  );

  const analyzeImages = useCallback(
    async (rasters: ImageRaster[], onDone?: (batch: BatchResult) => void) => {
      setState((current) => ({
        ...current,
        status: 'running',
        progress: 0,
        error: null,
      }));
      try {
        const batch = await analyzeBatch(
          rasters,
          { k: state.k },
          (completed, total) =>
            setState((current) => ({
              ...current,
              progress: total === 0 ? 1 : completed / total,
            }))
        );
        setState((current) => ({
          ...current,
          status: 'done',
          progress: 1,
          batch,
          result: null,
        }));
        onDone?.(batch);
      } catch (error) {
        setState((current) => ({
          ...current,
          status: 'error',
          error: error instanceof Error ? error.message : 'Analysis failed',
        }));
      }
    },
    [state.k]
  );

  const reset = useCallback(() => {
    setState((current) => ({
      ...current,
      status: 'idle',
      progress: 0,
      error: null,
      result: null,
      batch: null,
    }));
  }, []);

  return { ...state, setK, analyzeSingle, analyzeImages, reset };
};

export type UseAnalysisReturn = ReturnType<typeof useAnalysis>;
