import { FC, useCallback, useReducer, useState } from 'react';
import {
  DEFAULT_SAMPLE,
  MAX_SCORE,
  SAMPLE_MAX,
  SAMPLE_MIN,
  TOTAL_ROUNDS,
} from './constants';
import {
  createInitialState,
  DonePanel,
  gameReducer,
  RevealCard,
  StudyCard,
  TrialStats,
} from './components';
import { roundInfo, runTrial } from './game';
import type { Allocation, StudyId, TrialRun } from './types';

export const RctSimulatorGame: FC = () => {
  const [state, dispatch] = useReducer(gameReducer, {}, createInitialState);
  const [studyId, setStudyId] = useState<StudyId | null>(null);
  const [sampleSize, setSampleSize] = useState<number>(DEFAULT_SAMPLE);
  const [allocation, setAllocation] = useState<Allocation>('50/50');
  const [trial, setTrial] = useState<TrialRun | null>(null);
  const [history, setHistory] = useState<TrialRun[]>([]);
  const [significanceAnswer, setSignificanceAnswer] = useState<boolean | null>(
    null
  );

  const round = roundInfo(state.round);
  const study = round.studies.find((s) => s.id === studyId) ?? null;
  const correctCall = trial ? significanceAnswer === trial.significant : false;

  const selectStudy = useCallback((id: StudyId) => {
    setStudyId(id);
    setTrial(null);
    setSignificanceAnswer(null);
  }, []);

  const run = useCallback(() => {
    if (!study) return;
    const treatedShare = allocation === '50/50' ? 0.5 : 0.7;
    const next = runTrial(study, sampleSize, treatedShare);
    setTrial(next);
    setHistory((items) => [next, ...items]);
  }, [study, sampleSize, allocation]);

  const submit = useCallback(() => {
    if (!study || !trial || significanceAnswer === null) return;
    dispatch({
      type: 'SUBMIT',
      studyId: study.id,
      estimate: trial.observedAte,
    });
  }, [study, trial, significanceAnswer]);

  const clearTrials = useCallback(() => {
    setStudyId(null);
    setTrial(null);
    setHistory([]);
    setSignificanceAnswer(null);
  }, []);

  const nextStudy = useCallback(() => {
    dispatch({ type: 'NEXT_ROUND' });
    clearTrials();
  }, [clearTrials]);

  const reset = useCallback(() => {
    dispatch({ type: 'RESET' });
    clearTrials();
  }, [clearTrials]);

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-wrap items-center justify-between gap-2 text-sm">
        <span>
          Study <strong>{state.round}</strong> / {TOTAL_ROUNDS}
        </span>
        <span>
          Score: <strong>{state.score}</strong> / {MAX_SCORE}
        </span>
      </div>

      {state.phase === 'choose' && (
        <div className="flex flex-col gap-4">
          <div className="card border-base-content/10 flex flex-col gap-2 border p-4">
            <h2 className="text-lg">{round.topic}</h2>
            <p className="text-base-content/80 text-sm">{round.question}</p>
            <p className="text-base-content/60 text-xs">
              Outcome: {round.outcome} · Unit: {round.unit}
            </p>
          </div>

          <div className="grid gap-2 sm:grid-cols-2">
            {round.studies.map((s) => (
              <StudyCard
                key={s.id}
                study={s}
                selected={studyId === s.id}
                onPick={() => selectStudy(s.id)}
              />
            ))}
          </div>

          {study && (
            <div className="card border-base-content/10 flex flex-col gap-3 border p-4">
              <div className="flex flex-wrap items-end gap-4">
                <label className="form-control max-w-xs flex-1">
                  <span className="label-text text-xs">Sample size N</span>
                  <input
                    type="range"
                    min={SAMPLE_MIN}
                    max={SAMPLE_MAX}
                    step={10}
                    value={sampleSize}
                    onChange={(e) => setSampleSize(Number(e.target.value))}
                    data-testid="sample-size"
                    className="range range-primary range-xs"
                  />
                  <span className="label-text-alt">Current: {sampleSize}</span>
                </label>
                <label className="form-control w-32">
                  <span className="label-text text-xs">T/C allocation</span>
                  <select
                    value={allocation}
                    onChange={(e) =>
                      setAllocation(e.target.value as Allocation)
                    }
                    data-testid="allocation"
                    className="select select-bordered select-sm">
                    <option>50/50</option>
                    <option>70/30</option>
                  </select>
                </label>
                <button
                  type="button"
                  onClick={run}
                  data-testid="run"
                  className="btn btn-primary btn-sm">
                  Run Trial
                </button>
              </div>

              {trial && <TrialStats trial={trial} />}

              {trial && (
                <>
                  <div
                    className="flex flex-wrap items-center gap-2"
                    data-testid="significance-call">
                    <span className="text-sm">Is it significant?</span>
                    <button
                      type="button"
                      onClick={() => setSignificanceAnswer(true)}
                      data-testid="significant-yes"
                      className={`btn btn-sm ${significanceAnswer === true ? 'btn-primary' : 'btn-ghost'}`}>
                      Yes
                    </button>
                    <button
                      type="button"
                      onClick={() => setSignificanceAnswer(false)}
                      data-testid="significant-no"
                      className={`btn btn-sm ${significanceAnswer === false ? 'btn-primary' : 'btn-ghost'}`}>
                      No
                    </button>
                  </div>
                  <div className="flex flex-wrap items-center gap-2">
                    <button
                      type="button"
                      onClick={submit}
                      disabled={significanceAnswer === null}
                      data-testid="submit-study"
                      className="btn btn-secondary btn-sm">
                      Submit Study
                    </button>
                    {history.length > 1 && (
                      <span className="text-base-content/60 text-xs">
                        {history.length} trial runs this study — noise can fake
                        significance.
                      </span>
                    )}
                  </div>
                </>
              )}
            </div>
          )}
        </div>
      )}

      {state.phase === 'reveal' && state.result && trial && (
        <RevealCard
          round={round}
          result={state.result}
          correctCall={correctCall}
          onNext={nextStudy}
        />
      )}

      {state.phase === 'done' && (
        <DonePanel
          score={state.score}
          results={state.results}
          onReset={reset}
        />
      )}
    </div>
  );
};
RctSimulatorGame.displayName = 'RctSimulatorGame';
