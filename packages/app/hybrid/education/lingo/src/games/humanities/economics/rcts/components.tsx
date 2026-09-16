import { MAX_SCORE, ROUNDS, TOTAL_ROUNDS } from './constants';
import {
  isRandomizedStudy,
  meanDiff,
  roundInfo,
  scoreRound,
  withinTolerance,
} from './game';
import type { FC } from 'react';
import type {
  Phase,
  Round,
  RoundResult,
  Study,
  StudyId,
  TrialRun,
} from './types';

export interface GameState {
  phase: Phase;
  round: number;
  score: number;
  results: RoundResult[];
  chosenStudy: StudyId | null;
  estimate: number | null;
  result: RoundResult | null;
}

export type GameAction =
  | { type: 'SUBMIT'; studyId: StudyId; estimate: number }
  | { type: 'NEXT_ROUND' }
  | { type: 'RESET' };

export const createInitialState = (): GameState => ({
  phase: 'choose',
  round: 1,
  score: 0,
  results: [],
  chosenStudy: null,
  estimate: null,
  result: null,
});

const findStudy = (round: Round, id: StudyId): Study =>
  round.studies.find((s) => s.id === id)!;

export const gameReducer = (
  state: GameState,
  action: GameAction
): GameState => {
  switch (action.type) {
    case 'SUBMIT': {
      if (state.phase !== 'choose') return state;
      const round = roundInfo(state.round);
      const study = findStudy(round, action.studyId);
      const result: RoundResult = {
        round: state.round,
        topic: round.topic,
        chosenStudy: action.studyId,
        estimate: action.estimate,
        diff: meanDiff(study),
        correctStudy: isRandomizedStudy(study),
        correctEstimate: withinTolerance(action.estimate, round),
        points: scoreRound(study, action.estimate, round),
        reveal: round.reveal,
      };
      return {
        ...state,
        phase: 'reveal',
        chosenStudy: action.studyId,
        estimate: action.estimate,
        result,
      };
    }
    case 'NEXT_ROUND': {
      if (state.phase !== 'reveal' || !state.result) return state;
      const results = [...state.results, state.result];
      const score = results.reduce((sum, r) => sum + r.points, 0);
      if (state.round >= TOTAL_ROUNDS) {
        return { ...state, phase: 'done', score, results };
      }
      return {
        ...state,
        phase: 'choose',
        round: state.round + 1,
        score,
        results,
        chosenStudy: null,
        estimate: null,
        result: null,
      };
    }
    case 'RESET':
      return createInitialState();
    default:
      const _exhaustive: never = action;
      return state;
  }
};

export const fmt = (value: number): string => value.toFixed(3);

const randomizedLabel = (study: Study): string =>
  isRandomizedStudy(study) ? 'Randomized' : 'Non-random comparison';

export const TrialStats: FC<{ trial: TrialRun }> = ({ trial }) => (
  <div className="grid grid-cols-2 gap-2 text-sm sm:grid-cols-3">
    <div
      className="border-base-content/10 rounded-lg border p-2"
      data-testid="ate">
      <div className="text-base-content/60 text-xs">Observed ATE</div>
      <strong>{fmt(trial.observedAte)}</strong>
    </div>
    <div
      className="border-base-content/10 rounded-lg border p-2"
      data-testid="ci">
      <div className="text-base-content/60 text-xs">95% CI</div>
      <strong>
        {fmt(trial.ciLower)} to {fmt(trial.ciUpper)}
      </strong>
    </div>
    <div
      className="border-base-content/10 rounded-lg border p-2"
      data-testid="significant">
      <div className="text-base-content/60 text-xs">Significant at 5%?</div>
      <strong>{trial.significant ? 'Yes' : 'No'}</strong>
    </div>
    <div
      className="border-base-content/10 rounded-lg border p-2"
      data-testid="power">
      <div className="text-base-content/60 text-xs">Study power</div>
      <strong>{(trial.power * 100).toFixed(0)}%</strong>
    </div>
    <div className="border-base-content/10 rounded-lg border p-2">
      <div className="text-base-content/60 text-xs">Groups</div>
      <strong>
        {trial.treatedN} T / {trial.controlN} C
      </strong>
    </div>
    <div className="border-base-content/10 rounded-lg border p-2">
      <div className="text-base-content/60 text-xs">t-stat / SE</div>
      <strong>
        {fmt(trial.t)} / {fmt(trial.se)}
      </strong>
    </div>
  </div>
);

const badgeClass = (study: Study): string =>
  study.randomized ? 'badge-success' : 'badge-ghost';

export const StudyCard: FC<{
  study: Study;
  selected: boolean;
  onPick: () => void;
}> = ({ study, selected, onPick }) => (
  <button
    type="button"
    onClick={onPick}
    className={`card border p-3 text-left transition-colors ${
      selected ? 'border-primary' : 'border-base-content/10'
    }`}>
    <span className="flex items-center justify-between">
      <strong>Study {study.id}</strong>
      <span className={`badge badge-sm ${badgeClass(study)}`}>
        {randomizedLabel(study)}
      </span>
    </span>
    <span className="text-base-content/60 block text-xs">{study.label}</span>
    <span className="mt-1 block text-xs">
      T {study.treatedMean} ± {study.treatedSd} · C {study.controlMean} ±{' '}
      {study.controlSd}
    </span>
  </button>
);

export const RevealCard: FC<{
  round: Round;
  result: RoundResult;
  correctCall: boolean;
  onNext: () => void;
}> = ({ round, result, correctCall, onNext }) => (
  <div className="card border-base-content/10 flex w-full flex-col gap-3 border p-4">
    <div className="text-lg">
      Study {result.chosenStudy}: observed ATE{' '}
      <strong>{fmt(result.diff)}</strong>
    </div>
    <div className="flex flex-wrap gap-2 text-sm">
      <span className={result.correctStudy ? 'text-success' : 'text-error'}>
        {result.correctStudy ? 'Randomized design' : 'Non-random comparison'}
      </span>
      <span className={result.correctEstimate ? 'text-success' : 'text-error'}>
        Estimate {result.correctEstimate ? 'within' : 'outside'} tolerance
      </span>
      <span className={correctCall ? 'text-success' : 'text-error'}>
        Significance call {correctCall ? 'correct' : 'incorrect'}
      </span>
    </div>
    <p className="text-base-content/80 text-sm">{result.reveal}</p>
    <div className="flex items-center justify-between gap-2">
      <span className="text-sm">+{result.points} pts</span>
      <button type="button" onClick={onNext} className="btn btn-primary btn-sm">
        {round.number >= TOTAL_ROUNDS ? 'See Results' : 'Next Study'}
      </button>
    </div>
  </div>
);

export const DonePanel: FC<{
  score: number;
  results: RoundResult[];
  onReset: () => void;
}> = ({ score, results, onReset }) => (
  <div className="flex flex-col items-center gap-3 py-4">
    <div className="text-4xl">🧪</div>
    <div className="text-lg">RCT Simulator results</div>
    <div className="flex gap-6 text-sm">
      <span>
        Score: <strong>{score}</strong> / {MAX_SCORE}
      </span>
      <span>
        Studies: <strong>{results.length}</strong> / {TOTAL_ROUNDS}
      </span>
    </div>
    <div className="flex w-full max-w-md flex-col gap-1 text-xs">
      {results.map((r) => (
        <div
          key={r.round}
          className="border-base-200 flex items-center justify-between border-b py-1 last:border-0">
          <span>{r.topic}</span>
          <span>
            {r.chosenStudy} · +{r.points} pts
          </span>
        </div>
      ))}
    </div>
    <button type="button" onClick={onReset} className="btn btn-primary btn-sm">
      Play Again
    </button>
  </div>
);
