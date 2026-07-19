'use client';

import { useCallback, useState } from 'react';
import { analyzeRaster, type ImageAnalysis } from '@/lib/analysis/analyze';
import { analyzeBatch, type BatchResult } from '@/lib/analysis/batch';
import {
  createPreset,
  loadPresets,
  removePreset,
  savePreset,
  type AnalysisParameters,
  type AnalysisPreset,
} from '@/lib/analysis/presets';
import type { ImageRaster } from '@/types/image';

export type AnalysisStatus = 'idle' | 'running' | 'done' | 'error';

export interface AnalysisState {
  status: AnalysisStatus;
  progress: number;
  error: string | null;
  options: AnalysisParameters;
  result: ImageAnalysis | null;
  batch: BatchResult | null;
  presets: AnalysisPreset[];
}

const INITIAL_STATE: AnalysisState = {
  status: 'idle',
  progress: 0,
  error: null,
  options: { k: 5, iterations: 10, stride: 4, minRegionSize: 4 },
  result: null,
  batch: null,
  presets: loadPresets(),
};

export const useAnalysis = () => {
  const [state, setState] = useState<AnalysisState>(INITIAL_STATE);

  const setK = useCallback((k: number) => {
    setState((current) => ({
      ...current,
      options: { ...current.options, k },
    }));
  }, []);

  const setOptions = useCallback((patch: Partial<AnalysisParameters>) => {
    setState((current) => ({
      ...current,
      options: { ...current.options, ...patch },
    }));
  }, []);

  const applyPreset = useCallback((preset: AnalysisPreset) => {
    setState((current) => ({
      ...current,
      options: { ...preset.options },
    }));
  }, []);

  const saveCurrentPreset = useCallback(
    (name: string) => {
      const preset = createPreset(name, state.options);
      const presets = savePreset(preset);
      setState((current) => ({ ...current, presets }));
      return preset;
    },
    [state.options]
  );

  const deletePreset = useCallback((id: string) => {
    const presets = removePreset(id);
    setState((current) => ({ ...current, presets }));
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
        const result = analyzeRaster(raster, state.options);
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
    [state.options]
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
          state.options,
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
    [state.options]
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

  return {
    ...state,
    k: state.options.k,
    setK,
    setOptions,
    applyPreset,
    saveCurrentPreset,
    deletePreset,
    analyzeSingle,
    analyzeImages,
    reset,
  };
};

export type UseAnalysisReturn = ReturnType<typeof useAnalysis>;
