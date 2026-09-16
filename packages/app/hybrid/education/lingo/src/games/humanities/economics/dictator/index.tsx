import { FC, useCallback, useReducer, useState } from 'react';
import { BOTS, ENDOWMENT, PLAYER_ID, TOTAL_ROUNDS } from './constants';
import { average, keep } from './game';
import { createInitialState, gameReducer } from './reducer';
import type { RoundResult } from './types';

const formatMoney = (n: number): string => `$${n}`;

const formatAverage = (n: number): string =>
  `$${n % 1 === 0 ? n : n.toFixed(2)}`;

interface GiveRowProps {
  emoji: string;
  name: string;
  give: number;
  highlight?: boolean;
}

const GiveRow: FC<GiveRowProps> = ({
  emoji,
  name,
  give,
  highlight = false,
}) => (
  <div className="border-base-200 flex items-center justify-between border-b py-1 last:border-0">
    <span className="flex items-center gap-1">
      <span>{emoji}</span>
      <span>{name}</span>
      {highlight && <span className="text-xs">🙋</span>}
    </span>
    <span>
      Gave <strong>{formatMoney(give)}</strong> · kept{' '}
      <strong className={highlight ? 'text-primary' : ''}>
        {formatMoney(keep(give))}
      </strong>
    </span>
  </div>
);

const RevealPanel: FC<{ result: RoundResult; onNext: () => void }> = ({
  result,
  onNext,
}) => (
  <div className="flex flex-col items-center gap-3 py-4">
    <div className="text-3xl">🔍</div>
    <div className="text-lg">Round {result.round} — everyone&apos;s giving</div>
    <div className="border-base-300 w-full max-w-sm rounded-lg border p-3 text-sm">
      <GiveRow emoji="🙋" name="You" give={result.playerGive} highlight />
      {BOTS.map((bot) => (
        <GiveRow
          key={bot.id}
          emoji={bot.emoji}
          name={bot.name}
          give={result.gives[bot.id]}
        />
      ))}
    </div>
    <p className="text-base-content/60 text-xs">
      No consequence, no retaliation — only what you chose to give.
    </p>
    <button
      type="button"
      onClick={onNext}
      data-testid="next-round"
      className="btn btn-primary btn-sm">
      {result.round >= TOTAL_ROUNDS ? 'See Results' : 'Next Round'}
    </button>
  </div>
);

const ResultsPanel: FC<{
  results: RoundResult[];
  onReset: () => void;
}> = ({ results, onReset }) => {
  const playerAverage = average(results.map((r) => r.playerGive));
  return (
    <div className="flex flex-col items-center gap-3 py-4">
      <div className="text-4xl">📊</div>
      <div className="text-lg">Your results</div>
      <div className="flex flex-wrap justify-center gap-6 text-sm">
        <span>
          Your average giving:{' '}
          <strong className="text-primary">
            {formatAverage(playerAverage)}
          </strong>
        </span>
        <span>
          AI benchmark:{' '}
          <strong>
            {BOTS.map((bot) => formatMoney(bot.give)).join(' / ')}
          </strong>
        </span>
      </div>
      <p className="text-base-content/80 max-w-md text-center text-xs leading-relaxed">
        In an anonymous, single-shot game with no consequences, any giving
        reflects social preferences, not strategy.
      </p>
      <button
        type="button"
        onClick={onReset}
        data-testid="play-again"
        className="btn btn-primary btn-sm">
        Play Again
      </button>
    </div>
  );
};

export const DictatorGame: FC = () => {
  const [state, dispatch] = useReducer(gameReducer, {}, createInitialState);
  const [give, setGive] = useState<number>(50);
  const { phase, round, result, results } = state;

  const submitGive = useCallback(() => {
    if (phase !== 'choose') return;
    dispatch({ type: 'SUBMIT_GIVE', amount: give });
  }, [phase, give]);

  const nextRound = useCallback(() => dispatch({ type: 'NEXT_ROUND' }), []);

  const reset = useCallback(() => {
    dispatch({ type: 'RESET' });
    setGive(50);
  }, []);

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-wrap items-center justify-between gap-2 text-sm">
        <span>
          Round <strong>{round}</strong> / {TOTAL_ROUNDS}
        </span>
        <span>
          You have given{' '}
          <strong className="text-primary">
            {formatMoney(state.totalGiven)}
          </strong>{' '}
          in total
        </span>
      </div>

      {phase === 'choose' && (
        <div className="card border-base-content/10 flex flex-col gap-3 border p-4">
          <div className="flex flex-wrap items-center justify-between gap-2 text-sm">
            <span>
              Your endowment:{' '}
              <strong className="text-primary">{formatMoney(ENDOWMENT)}</strong>
            </span>
            <span className="text-base-content/60 text-xs">
              Give any amount to an anonymous receiver. No punishment, no
              retaliation.
            </span>
          </div>
          <div className="flex items-center gap-3">
            <input
              type="range"
              min={0}
              max={ENDOWMENT}
              value={give}
              onChange={(e) => setGive(Number(e.target.value))}
              data-testid="give-slider"
              className="range range-primary"
            />
            <span className="w-24 text-sm">
              Give <strong className="text-primary">{formatMoney(give)}</strong>
            </span>
          </div>
          <p className="text-center text-sm">
            You keep <strong>{formatMoney(keep(give, ENDOWMENT))}</strong>
          </p>
          <button
            type="button"
            onClick={submitGive}
            data-testid="submit-give"
            className="btn btn-primary btn-sm">
            Give
          </button>
        </div>
      )}

      {phase === 'reveal' && result && (
        <RevealPanel result={result} onNext={nextRound} />
      )}

      {phase === 'done' && <ResultsPanel results={results} onReset={reset} />}
    </div>
  );
};
DictatorGame.displayName = 'DictatorGame';
