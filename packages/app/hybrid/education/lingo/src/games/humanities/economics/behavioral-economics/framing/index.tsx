import { FC, useCallback, useReducer } from 'react';
import { OPTION_X_LABEL, OPTION_Y_LABEL, SCENARIOS } from './constants';
import { createInitialState, gameReducer } from './reducer';
import type { Choice, Scenario } from './types';

const CLASSIC_NOTE =
  'Most people pick the sure saving in gains and the gamble in losses.';

const patternLabel = (gainChoice: Choice, lossChoice: Choice): string =>
  `${gainChoice} in gains · ${lossChoice} in losses`;

const QuestionPanel: FC<{
  scenario: Scenario;
  onChoose: (choice: Choice) => void;
}> = ({ scenario, onChoose }) => (
  <div className="flex flex-col gap-3 py-4">
    <h2 className="text-primary text-lg font-bold">{scenario.title}</h2>
    <p className="text-base-content/80">{scenario.context}</p>
    <p className="border-base-200 text-success border-l-4 pl-3 text-sm">
      {scenario.programX}
    </p>
    <p className="border-base-200 text-error border-l-4 pl-3 text-sm">
      {scenario.programY}
    </p>
    <div className="sans mt-2 flex flex-col gap-2 sm:flex-row">
      <button
        type="button"
        onClick={() => onChoose('X')}
        data-testid={`choice-x-${scenario.id}`}
        className="btn btn-success">
        {OPTION_X_LABEL}
      </button>
      <button
        type="button"
        onClick={() => onChoose('Y')}
        data-testid={`choice-y-${scenario.id}`}
        className="btn btn-error">
        {OPTION_Y_LABEL}
      </button>
    </div>
  </div>
);

const RevealPanel: FC<{
  gainChoice: Choice;
  lossChoice: Choice;
  framingScore: number;
  onDone: () => void;
}> = ({ gainChoice, lossChoice, framingScore, onDone }) => (
  <div className="flex flex-col items-center gap-3 py-4">
    <div className="text-4xl">{framingScore === 1 ? '🧠' : '🌀'}</div>
    <div className="text-lg">Your reflection effect</div>
    <div className="text-base-content/60 border-info bg-info/10 rounded-lg border px-4 py-2 text-center text-sm">
      {patternLabel(gainChoice, lossChoice)}
    </div>
    <div className="text-base-content/80 text-sm italic">{CLASSIC_NOTE}</div>
    <div className="card border-base-content/10 flex max-w-lg flex-col gap-2 border p-4 text-sm">
      <span className="text-center font-bold">
        {framingScore === 1
          ? 'You matched the classic pattern 🎯'
          : 'You did not copy the classic pattern'}
      </span>
      <span className="text-center">
        Expected outcomes are identical in both framings — only the wording
        changed. Most people flip from risk-averse to risk-seeking.
      </span>
      <span className="text-center">
        Our choices flip with framing even though expected outcomes are
        identical — losses hurt more than gains feel good.
      </span>
    </div>
    <button type="button" onClick={onDone} className="btn btn-primary btn-sm">
      See Results
    </button>
  </div>
);

const DonePanel: FC<{
  framingScore: number;
  onReset: () => void;
}> = ({ framingScore, onReset }) => (
  <div className="flex flex-col items-center gap-3 py-4">
    <div className="text-4xl">📊</div>
    <div className="text-lg">Framing effect score</div>
    <div className="flex gap-6 text-sm">
      <span>
        Your score:{' '}
        <strong
          className={framingScore === 1 ? 'text-success' : 'text-warning'}>
          {framingScore} / 1
        </strong>
      </span>
      <span>
        Classic pattern: <strong>X in gains · Y in losses</strong>
      </span>
    </div>
    <p className="text-base-content/80 max-w-lg text-center text-sm">
      Most people choose the sure program in the gain frame (risk-averse) but
      the gamble in the loss frame (risk-seeking). Same fact set, flipped
      choices — losses hurt more than gains feel good.
    </p>
    <button type="button" onClick={onReset} className="btn btn-primary btn-sm">
      Play Again
    </button>
  </div>
);

export const FramingGame: FC = () => {
  const [state, dispatch] = useReducer(gameReducer, {}, createInitialState);
  const { phase, current, gainChoice, lossChoice, framingScore } = state;
  const scenario = SCENARIOS.find((s) => s.id === current) as Scenario;

  const choose = useCallback(
    (choice: Choice) => {
      dispatch({ type: 'CHOOSE', scenario: current, choice });
    },
    [current]
  );
  const reveal = useCallback(() => dispatch({ type: 'REVEAL' }), []);
  const reset = useCallback(() => dispatch({ type: 'RESET' }), []);

  return (
    <div className="flex flex-col gap-2">
      {phase === 'question' && (
        <QuestionPanel scenario={scenario} onChoose={choose} />
      )}

      {phase === 'reveal' && gainChoice && lossChoice && (
        <RevealPanel
          gainChoice={gainChoice}
          lossChoice={lossChoice}
          framingScore={framingScore}
          onDone={reveal}
        />
      )}

      {phase === 'done' && (
        <DonePanel framingScore={framingScore} onReset={reset} />
      )}
    </div>
  );
};
FramingGame.displayName = 'FramingGame';
