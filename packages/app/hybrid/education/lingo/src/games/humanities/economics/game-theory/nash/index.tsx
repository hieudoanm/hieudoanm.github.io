import { FC, useCallback, useReducer } from 'react';
import { GAME_ORDER, GAMES, TOTAL_PLAYS } from './constants';
import { createInitialState, gameReducer } from './reducer';
import { mixedEquilibrium } from './game';
import type { GameModule, Row } from './types';
import { PayoffTable, RowPicker, Verdict } from './components';

export const NashEquilibriumGame: FC = () => {
  const [state, dispatch] = useReducer(gameReducer, {}, createInitialState);
  const {
    phase,
    round,
    game,
    matrix,
    selectedRow,
    aiCol,
    lastResult,
    plays,
    neCount,
  } = state;

  const startGame = useCallback(
    (g: GameModule) => dispatch({ type: 'START_GAME', game: g }),
    []
  );
  const playRow = useCallback(
    (row: Row) => dispatch({ type: 'PLAY_ROW', row }),
    []
  );
  const nextPlay = useCallback(() => dispatch({ type: 'NEXT' }), []);
  const reset = useCallback(() => dispatch({ type: 'RESET' }), []);

  const summaryGame = (
    plays.length > 0 ? plays[0].game : null
  ) as GameModule | null;

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-wrap items-center justify-between gap-2 text-sm">
        <span>
          Play <strong>{Math.min(round, TOTAL_PLAYS)}</strong> / {TOTAL_PLAYS}
        </span>
        <span>
          Nash equilibria hit: <strong>{neCount}</strong>
        </span>
      </div>

      {phase === 'choose' && (
        <div>
          <p className="text-base-content/60 mb-2 text-sm">Choose a game:</p>
          <div className="grid gap-2 sm:grid-cols-3">
            {GAME_ORDER.map((id) => (
              <button
                key={id}
                type="button"
                onClick={() => startGame(id)}
                data-testid={`game-${id}`}
                className="card border-base-content/10 border p-3 text-left transition-colors">
                <span className="text-sm font-medium">{GAMES[id].label}</span>
              </button>
            ))}
          </div>
        </div>
      )}

      {phase === 'pick-row' && matrix && (
        <div className="flex flex-col gap-3">
          <PayoffTable
            matrix={matrix}
            selectedRow={null}
            aiCol={null}
            highlightNE={false}
            onPickRow={playRow}
          />
          <RowPicker onPickRow={playRow} />
        </div>
      )}

      {phase === 'verdict' && matrix && selectedRow && aiCol && lastResult && (
        <Verdict
          matrix={matrix}
          selectedRow={selectedRow}
          aiCol={aiCol}
          isNE={lastResult.isNE}
          playerPayoff={lastResult.playerPayoff}
          aiPayoff={lastResult.aiPayoff}
          onNext={nextPlay}
          round={round}
          totalPlays={TOTAL_PLAYS}
        />
      )}

      {phase === 'summary' && (
        <div className="flex flex-col items-center gap-3 py-4">
          <div className="text-3xl">
            {neCount === TOTAL_PLAYS ? '🏆' : '📊'}
          </div>
          <div className="text-lg">Game complete</div>
          <div className="flex gap-6 text-sm">
            <span>
              Plays on NE: <strong>{neCount}</strong> / {TOTAL_PLAYS}
            </span>
          </div>
          {plays.some((p) => !p.isNE) && (
            <p className="text-base-content/60 text-xs">
              {mixedEquilibrium('matching-pennies')}
            </p>
          )}
          <button
            type="button"
            onClick={reset}
            data-testid="play-again"
            className="btn btn-primary btn-sm">
            Play Again
          </button>
        </div>
      )}
    </div>
  );
};
NashEquilibriumGame.displayName = 'NashEquilibriumGame';
