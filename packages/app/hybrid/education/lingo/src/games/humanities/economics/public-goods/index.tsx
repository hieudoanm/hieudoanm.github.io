import { ChangeEvent, FC, useCallback, useReducer, useState } from 'react';
import {
  BOT_BY_ID,
  BOTS,
  LESSON,
  MAX_CONTRIBUTION,
  TOTAL_ROUNDS,
} from './constants';
import { buildRanking, createInitialState, gameReducer } from './reducer';
import { PLAYER_ID } from './constants';
import type { RoundResult } from './types';

const formatPoints = (n: number): string => `$${Math.round(n)}`;

const entryRow = (id: string, name: string, emoji: string, amount: number) => {
  const isPlayer = id === PLAYER_ID;
  return (
    <div
      key={id}
      className="border-base-200 flex items-center justify-between gap-2 border-b py-1 last:border-0">
      <span className="flex items-center gap-2">
        <span>{emoji}</span>
        <span>{name}</span>
      </span>
      {!isPlayer && (
        <span className="text-base-content/40 text-xs">
          ({BOT_BY_ID[id as keyof typeof BOT_BY_ID]?.name})
        </span>
      )}
      <span>{formatPoints(amount)}</span>
    </div>
  );
};

const contributionsPanel = (result: RoundResult) => (
  <div className="border-base-300 w-full max-w-sm rounded-lg border p-3 text-sm">
    <div className="border-base-200 flex items-center justify-between border-b py-1">
      <span className="flex items-center gap-2">
        <span>🙋</span>
        <span>You</span>
      </span>
      <span>{formatPoints(result.myContribution)}</span>
    </div>
    {BOTS.map((b) =>
      entryRow(b.id, b.name, b.emoji, result.contributions[b.id])
    )}
  </div>
);

const payoffsPanel = (result: RoundResult) => (
  <div className="border-base-300 w-full max-w-sm rounded-lg border p-3 text-sm">
    <div className="border-base-200 flex items-center justify-between border-b py-1">
      <span className="flex items-center gap-2">
        <span>🙋</span>
        <span>You</span>
      </span>
      <span>{formatPoints(result.payoffs.you)}</span>
    </div>
    {BOTS.map((b) => entryRow(b.id, b.name, b.emoji, result.payoffs[b.id]))}
  </div>
);

const RevealPanel: FC<{
  round: number;
  result: RoundResult;
  onNext: () => void;
}> = ({ round, result, onNext }) => (
  <div className="flex flex-col items-center gap-3 py-4">
    <div className="text-3xl">🤝</div>
    <div className="text-lg">Round {result.round} contribution</div>
    {contributionsPanel(result)}
    <span className="text-base-content/60 text-xs">Payoffs this round</span>
    {payoffsPanel(result)}
    <span className={result.myPayoff >= 0 ? 'text-success' : 'text-error'}>
      Your payoff: <strong>{formatPoints(result.myPayoff)}</strong>
    </span>
    <button type="button" onClick={onNext} className="btn btn-primary btn-sm">
      {round >= TOTAL_ROUNDS ? 'See Results' : 'Next Round'}
    </button>
  </div>
);

export const PublicGoodsGame: FC = () => {
  const [state, dispatch] = useReducer(gameReducer, {}, createInitialState);
  const [amount, setAmount] = useState<string>('100');
  const { phase, round, result, history, myTotal } = state;

  const submitContribution = useCallback(() => {
    const value = Number(amount);
    if (!Number.isFinite(value) || value < 0) return;
    dispatch({ type: 'SUBMIT_CONTRIBUTION', amount: Math.round(value) });
  }, [amount]);

  const onAmountChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => setAmount(e.target.value),
    []
  );

  const nextRound = useCallback(() => dispatch({ type: 'NEXT_ROUND' }), []);
  const reset = useCallback(() => {
    dispatch({ type: 'RESET' });
    setAmount('100');
  }, []);

  const ranking = phase === 'done' ? buildRanking(history, myTotal) : [];
  const myRank = ranking.findIndex((r) => r.id === PLAYER_ID) + 1;

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-wrap items-center justify-between gap-2 text-sm">
        <span>
          Round <strong>{round}</strong> / {TOTAL_ROUNDS}
        </span>
        <span>
          Your total so far: <strong>{formatPoints(myTotal)}</strong>
        </span>
      </div>

      {phase === 'choose' && (
        <div className="card border-base-content/10 flex flex-col gap-3 border p-4">
          <p className="text-sm">
            You have <strong className="text-primary">$100</strong> this round.
            How much will you contribute to the public good?
          </p>
          <p className="text-base-content/60 text-xs">
            Your payoff = 100 − contribution + (total contributions × 2) ÷ 4.
            Contribute 0 to free ride, 100 to cooperate fully.
          </p>
          <input
            type="range"
            min={0}
            max={MAX_CONTRIBUTION}
            value={amount}
            onChange={onAmountChange}
            data-testid="contribution-slider"
            className="range range-primary range-sm"
          />
          <div className="flex flex-wrap items-center gap-2">
            <input
              type="number"
              min={0}
              max={MAX_CONTRIBUTION}
              value={amount}
              onChange={onAmountChange}
              data-testid="contribution-input"
              className="input input-sm input-bordered w-24"
            />
            <button
              type="button"
              onClick={submitContribution}
              data-testid="contribute"
              className="btn btn-primary btn-sm">
              Contribute {formatPoints(Number(amount))}
            </button>
          </div>
        </div>
      )}

      {phase === 'reveal' && result && (
        <RevealPanel round={round} result={result} onNext={nextRound} />
      )}

      {phase === 'done' && (
        <div className="flex flex-col items-center gap-3 py-4">
          <div className="text-4xl">📊</div>
          <div className="text-lg">Results</div>
          <div className="text-sm">
            Your total: <strong>{formatPoints(myTotal)}</strong> · Rank{' '}
            <strong>
              #{myRank} of {ranking.length}
            </strong>
          </div>
          <div className="border-base-300 w-full max-w-sm rounded-lg border p-3 text-sm">
            {ranking.map((r, i) => (
              <div
                key={r.id}
                className="border-base-200 flex items-center justify-between gap-2 border-b py-1 last:border-0">
                <span className="flex items-center gap-2">
                  <span>{i + 1}.</span>
                  <span>{r.emoji}</span>
                  <span>{r.name}</span>
                </span>
                <span>{formatPoints(r.total)}</span>
              </div>
            ))}
          </div>
          <p className="text-base-content/70 max-w-md text-center text-xs">
            {LESSON}
          </p>
          <button
            type="button"
            onClick={reset}
            className="btn btn-primary btn-sm">
            Play Again
          </button>
        </div>
      )}
    </div>
  );
};
PublicGoodsGame.displayName = 'PublicGoodsGame';
