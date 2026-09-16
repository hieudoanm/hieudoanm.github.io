import { FC, useCallback, useReducer } from 'react';
import { PARTNERS, TOTAL_ROUNDS } from './constants';
import { createInitialState, gameReducer } from './reducer';
import type { Move, PartnerId, RoundResult } from './types';

const formatScore = (n: number): string => (n >= 0 ? `+${n}` : `${n}`);

const PartnerSelector: FC<{
  onSelect: (id: PartnerId) => void;
}> = ({ onSelect }) => (
  <div className="flex flex-col gap-2">
    <p className="text-base-content/60 text-sm">Choose your partner:</p>
    <div className="grid gap-2 sm:grid-cols-2">
      {PARTNERS.map((p) => (
        <button
          key={p.id}
          type="button"
          onClick={() => onSelect(p.id)}
          data-testid={`partner-${p.id}`}
          className="card border-base-content/10 border p-3 text-left transition-colors">
          <span className="text-lg">
            {p.emoji} {p.name}
          </span>
          <span className="text-base-content/60 block text-xs">
            {p.description}
          </span>
        </button>
      ))}
    </div>
  </div>
);

const RevealPanel: FC<{
  result: RoundResult;
  round: number;
  onNext: () => void;
}> = ({ result, round, onNext }) => {
  const { playerMove, partnerMove, playerPayoff, partnerPayoff } = result;
  const tie = playerMove === partnerMove;
  return (
    <div className="flex flex-col items-center gap-3 py-4">
      <div className="text-3xl">
        {tie ? '🤝' : playerPayoff > partnerPayoff ? '🦌' : '🐇'}
      </div>
      <div className="flex gap-6 text-sm">
        <span>
          You: <strong>{playerMove === 'stag' ? '🦌 Stag' : '🐇 Hare'}</strong>
        </span>
        <span>
          Partner:{' '}
          <strong>{partnerMove === 'stag' ? '🦌 Stag' : '🐇 Hare'}</strong>
        </span>
      </div>
      <div className="flex gap-6 text-sm">
        <span>
          You:{' '}
          <strong className={playerPayoff > 0 ? 'text-success' : ''}>
            {formatScore(playerPayoff)}
          </strong>
        </span>
        <span>
          Partner:{' '}
          <strong className={partnerPayoff > 0 ? 'text-success' : ''}>
            {formatScore(partnerPayoff)}
          </strong>
        </span>
      </div>
      <button type="button" onClick={onNext} className="btn btn-primary btn-sm">
        {round >= TOTAL_ROUNDS ? 'See Results' : 'Next Round'}
      </button>
    </div>
  );
};

const ResultsScreen: FC<{
  results: RoundResult[];
  playerTotal: number;
  partnerTotal: number;
  onReset: () => void;
}> = ({ results, playerTotal, partnerTotal, onReset }) => {
  const combined = playerTotal + partnerTotal;
  const benchmark = TOTAL_ROUNDS * 8;
  return (
    <div className="flex flex-col items-center gap-3 py-4">
      <div className="text-4xl">📊</div>
      <div className="text-lg">Game Results</div>
      <div className="flex flex-col gap-1 text-center text-sm">
        <span>
          Your total: <strong>{formatScore(playerTotal)}</strong>
        </span>
        <span>
          Partner total: <strong>{formatScore(partnerTotal)}</strong>
        </span>
        <span>
          Combined: <strong>{formatScore(combined)}</strong>
          <span className="text-base-content/60 ml-2">
            (benchmark if both played Stag: {benchmark})
          </span>
        </span>
      </div>
      <p className="text-base-content/60 max-w-md text-center text-xs leading-relaxed">
        Trust lets both chase the Stag; fear of betrayal pushes you both into
        the safer, worse Hare outcome.
      </p>
      <button
        type="button"
        onClick={onReset}
        className="btn btn-primary btn-sm">
        Play Again
      </button>
    </div>
  );
};

export const StagHuntGame: FC = () => {
  const [state, dispatch] = useReducer(gameReducer, {}, createInitialState);
  const {
    phase,
    round,
    partnerId,
    result,
    results,
    playerTotal,
    partnerTotal,
  } = state;

  const selectPartner = useCallback(
    (id: PartnerId) => dispatch({ type: 'SELECT_PARTNER', partnerId: id }),
    []
  );
  const makeMove = useCallback(
    (move: Move) => dispatch({ type: 'MAKE_MOVE', move }),
    []
  );
  const nextRound = useCallback(() => dispatch({ type: 'NEXT_ROUND' }), []);
  const reset = useCallback(() => dispatch({ type: 'RESET' }), []);

  const partnerMeta = partnerId
    ? PARTNERS.find((p) => p.id === partnerId)
    : null;

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-wrap items-center justify-between gap-2 text-sm">
        <span>
          Round <strong>{round}</strong> / {TOTAL_ROUNDS}
        </span>
        {partnerMeta && (
          <span>
            Partner:{' '}
            <strong>
              {partnerMeta.emoji} {partnerMeta.name}
            </strong>
          </span>
        )}
        <span>
          Your score: <strong>{formatScore(playerTotal)}</strong>
        </span>
        <span>
          Partner score: <strong>{formatScore(partnerTotal)}</strong>
        </span>
      </div>

      {!partnerId && <PartnerSelector onSelect={selectPartner} />}

      {phase === 'choose' && partnerId && (
        <div className="flex flex-col items-center gap-3">
          <p className="text-base-content/60 text-sm">
            Will you hunt the Stag together, or play it safe with Hare?
          </p>
          <div className="flex gap-3">
            <button
              type="button"
              onClick={() => makeMove('stag')}
              data-testid="move-stag"
              className="btn btn-outline btn-lg">
              🦌 Stag
            </button>
            <button
              type="button"
              onClick={() => makeMove('hare')}
              data-testid="move-hare"
              className="btn btn-outline btn-lg">
              🐇 Hare
            </button>
          </div>
        </div>
      )}

      {phase === 'reveal' && result && (
        <RevealPanel result={result} round={round} onNext={nextRound} />
      )}

      {phase === 'done' && (
        <ResultsScreen
          results={results}
          playerTotal={playerTotal}
          partnerTotal={partnerTotal}
          onReset={reset}
        />
      )}
    </div>
  );
};
StagHuntGame.displayName = 'StagHuntGame';
