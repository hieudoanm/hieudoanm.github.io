import {
  createPreset,
  DEFAULT_PRESETS,
  loadPresets,
  removePreset,
  savePreset,
} from '@/lib/analysis/presets';

describe('presets', () => {
  beforeEach(() => {
    window.localStorage.clear();
  });

  it('returns the built-in presets when nothing is stored', () => {
    expect(loadPresets()).toEqual(DEFAULT_PRESETS);
  });

  it('creates presets with a unique id and copied options', () => {
    const preset = createPreset('Lab A', {
      k: 4,
      iterations: 12,
      stride: 3,
      minRegionSize: 5,
    });
    expect(preset.name).toBe('Lab A');
    expect(preset.options).toEqual({
      k: 4,
      iterations: 12,
      stride: 3,
      minRegionSize: 5,
    });
  });

  it('persists saved presets and restores them', () => {
    const preset = createPreset('Lab A', {
      k: 4,
      iterations: 12,
      stride: 3,
      minRegionSize: 5,
    });
    const saved = savePreset(preset);
    expect(saved.some((item) => item.id === preset.id)).toBe(true);
    expect(loadPresets().some((item) => item.id === preset.id)).toBe(true);
  });

  it('replaces a preset with the same id instead of duplicating it', () => {
    const first = createPreset('Lab A', {
      k: 4,
      iterations: 12,
      stride: 3,
      minRegionSize: 5,
    });
    const second = { ...first, options: { ...first.options, k: 6 } };
    savePreset(first);
    const saved = savePreset(second);
    expect(saved.filter((item) => item.id === first.id)).toHaveLength(1);
    const restored = loadPresets().find((item) => item.id === first.id);
    expect(restored?.options.k).toBe(6);
  });

  it('removes presets by id', () => {
    const preset = createPreset('Lab A', {
      k: 4,
      iterations: 12,
      stride: 3,
      minRegionSize: 5,
    });
    savePreset(preset);
    const remaining = removePreset(preset.id);
    expect(remaining.some((item) => item.id === preset.id)).toBe(false);
  });

  it('falls back to defaults when stored data is corrupt', () => {
    window.localStorage.setItem(
      'brainbow.analysis.presets',
      '{"version":1,"presets":[{"id":1}]}'
    );
    expect(loadPresets()).toEqual(DEFAULT_PRESETS);
  });
});
