import type { AnalyzeOptions } from '@/lib/analysis/analyze';

export type AnalysisParameters = Pick<
  AnalyzeOptions,
  'k' | 'iterations' | 'stride' | 'minRegionSize'
>;

export interface AnalysisPreset {
  id: string;
  name: string;
  options: AnalysisParameters;
}

const STORAGE_KEY = 'brainbow.analysis.presets';
const STORAGE_VERSION = 1;

export const DEFAULT_PRESETS: AnalysisPreset[] = [
  {
    id: 'fast',
    name: 'Fast',
    options: { k: 3, iterations: 5, stride: 8, minRegionSize: 8 },
  },
  {
    id: 'standard',
    name: 'Standard',
    options: { k: 5, iterations: 10, stride: 4, minRegionSize: 4 },
  },
  {
    id: 'fine',
    name: 'Fine',
    options: { k: 8, iterations: 15, stride: 2, minRegionSize: 2 },
  },
  {
    id: 'coarse',
    name: 'Coarse',
    options: { k: 3, iterations: 8, stride: 16, minRegionSize: 16 },
  },
];

export const createPreset = (
  name: string,
  options: AnalysisParameters
): AnalysisPreset => ({
  id: `preset-${Date.now().toString(36)}-${Math.random()
    .toString(36)
    .slice(2, 7)}`,
  name,
  options: { ...options },
});

const isPreset = (value: unknown): value is AnalysisPreset => {
  if (typeof value !== 'object' || value === null) return false;
  const preset = value as Record<string, unknown>;
  const options = preset.options as Record<string, unknown> | undefined;
  return (
    typeof preset.id === 'string' &&
    typeof preset.name === 'string' &&
    typeof options === 'object' &&
    options !== null &&
    typeof options.k === 'number' &&
    typeof options.iterations === 'number' &&
    typeof options.stride === 'number' &&
    typeof options.minRegionSize === 'number'
  );
};

export const loadPresets = (): AnalysisPreset[] => {
  if (typeof window === 'undefined') {
    return DEFAULT_PRESETS;
  }
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return DEFAULT_PRESETS;
    const parsed: unknown = JSON.parse(raw);
    if (
      typeof parsed !== 'object' ||
      parsed === null ||
      (parsed as Record<string, unknown>).version !== STORAGE_VERSION ||
      !Array.isArray((parsed as Record<string, unknown>).presets)
    ) {
      return DEFAULT_PRESETS;
    }
    const presets = (
      (parsed as Record<string, unknown>).presets as unknown[]
    ).filter(isPreset);
    return presets.length > 0 ? presets : DEFAULT_PRESETS;
  } catch {
    return DEFAULT_PRESETS;
  }
};

const persist = (presets: AnalysisPreset[]): void => {
  if (typeof window === 'undefined') return;
  window.localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify({ version: STORAGE_VERSION, presets })
  );
};

export const savePreset = (preset: AnalysisPreset): AnalysisPreset[] => {
  const presets = loadPresets();
  const next = [...presets.filter((item) => item.id !== preset.id), preset];
  persist(next);
  return next;
};

export const removePreset = (id: string): AnalysisPreset[] => {
  const next = loadPresets().filter((preset) => preset.id !== id);
  persist(next);
  return next;
};
