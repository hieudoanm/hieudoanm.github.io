import { FC, useCallback, useReducer, useState } from 'react';
import {
  DEFAULT_PRESET,
  PRESETS,
  PRESET_ORDER,
  STEP_OPTIONS,
} from './constants';
import { FitnessPanel, ShareBar } from './components';
import { createInitialState, gameReducer } from './reducer';
import type { PresetId } from './types';

export const ReplicatorGame: FC = () => {
  const [state, dispatch] = useReducer(gameReducer, {}, createInitialState);
  const [start, setStart] = useState<number>(PRESETS[DEFAULT_PRESET].startP);
  const { preset, p, generation, lastFitness, converged } = state;
  const presetMeta = PRESETS[preset];
  const pctA = Math.round(p * 100);
  const pctB = 100 - pctA;

  const selectPreset = useCallback((id: PresetId) => {
    dispatch({ type: 'SELECT_PRESET', preset: id });
    setStart(PRESETS[id].startP);
  }, []);

  const changeStart = useCallback((value: number) => {
    const finite = Number.isFinite(value);
    const next = finite ? Math.min(1, Math.max(0, value)) : 0;
    setStart(next);
    dispatch({ type: 'SET_START', p: next });
  }, []);

  const step = useCallback((n: number) => dispatch({ type: 'STEP', n }), []);

  const reset = useCallback(() => {
    dispatch({ type: 'RESET' });
    setStart(PRESETS[DEFAULT_PRESET].startP);
  }, []);

  return (
    <div className="flex flex-col gap-5">
      <div className="flex flex-wrap items-center justify-between gap-2 text-sm">
        <span>
          Generation <strong data-testid="generation">{generation}</strong>
        </span>
        <div className="flex gap-2">
          {STEP_OPTIONS.map((n) => (
            <button
              key={n}
              type="button"
              onClick={() => step(n)}
              data-testid={`step-${n}`}
              className="btn btn-primary btn-sm">
              Step {n}
            </button>
          ))}
          <button
            type="button"
            onClick={reset}
            data-testid="reset"
            className="btn btn-outline btn-sm">
            Reset
          </button>
        </div>
      </div>

      <div>
        <p className="text-base-content/60 mb-2 text-sm">Choose a preset:</p>
        <div className="grid gap-2 sm:grid-cols-3">
          {PRESET_ORDER.map((id) => (
            <button
              key={id}
              type="button"
              onClick={() => selectPreset(id)}
              data-testid={`preset-${id}`}
              className={`card border p-3 text-left transition-colors ${
                id === preset
                  ? 'border-primary bg-primary/5'
                  : 'border-base-content/10'
              }`}>
              <span className="text-lg">
                {PRESETS[id].emoji} {PRESETS[id].label}
              </span>
              <span className="text-base-content/60 block text-xs">
                {PRESETS[id].description}
              </span>
            </button>
          ))}
        </div>
      </div>

      <div className="card border-base-content/10 flex flex-col gap-3 border p-4">
        <ShareBar
          labelA={presetMeta.strategyA}
          labelB={presetMeta.strategyB}
          pctA={pctA}
          pctB={pctB}
        />
        <div className="flex flex-wrap items-center gap-4">
          <label className="text-base-content/60 text-sm">
            Initial share of {presetMeta.strategyA}:{' '}
            <strong>{Math.round(start * 100)}%</strong>
          </label>
          <input
            type="range"
            min={0}
            max={1}
            step={0.01}
            value={start}
            onChange={(e) => changeStart(Number(e.target.value))}
            data-testid="start-slider"
            className="range range-primary range-xs"
          />
          <FitnessPanel fitness={lastFitness} />
        </div>
      </div>

      <div className="flex items-center gap-3">
        {converged && (
          <span className="badge badge-success" data-testid="converged-badge">
            Converged
          </span>
        )}
        <p className="text-base-content/60 text-sm leading-relaxed">
          {presetMeta.essText}
        </p>
      </div>
    </div>
  );
};
ReplicatorGame.displayName = 'ReplicatorGame';
