import { FC, useCallback, useReducer } from 'react';
import {
  ActionBar,
  EpisodeSummary,
  OutcomePanel,
  PriceBoard,
  ResultsPanel,
} from './components';
import { STARTING_CASH, FUNDAMENTALS, TOTAL_ROUNDS } from './constants';
import { episodePrice, pnlOf } from './game';
import { createInitialState, gameReducer } from './reducer';
import type { BubbleAction } from './types';

export const BubbleLabGame: FC = () => {
  const [state, dispatch] = useReducer(gameReducer, {}, createInitialState);
  const { phase, episode, round, fundamental, cash, units } = state;

  const price = episodePrice(round, fundamental);
  const pnl = pnlOf(state, price);

  const onAction = useCallback(
    (action: BubbleAction) => dispatch({ type: 'SUBMIT_ACTION', action }),
    []
  );
  const nextRound = useCallback(() => dispatch({ type: 'NEXT_ROUND' }), []);
  const nextEpisode = useCallback(() => dispatch({ type: 'NEXT_EPISODE' }), []);
  const reset = useCallback(() => dispatch({ type: 'RESET' }), []);

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-wrap items-center justify-between gap-2 text-sm">
        <span>
          Episode <strong>{episode}</strong> / {FUNDAMENTALS.length}
        </span>
        <span>
          Round <strong>{round}</strong> / {TOTAL_ROUNDS}
        </span>
      </div>

      <PriceBoard
        round={round}
        price={price}
        fundamental={fundamental}
        cash={cash}
        units={units}
        pnl={pnl}
      />

      {phase === 'play' && (
        <>
          <p className="text-base-content/60 text-sm">
            Prices can diverge from the asset&rsquo;s fundamental value as
            investors chase gains. Sell before the crash to lock in profits.
          </p>
          <ActionBar onAction={onAction} />
        </>
      )}

      {phase === 'outcome' && (
        <OutcomePanel
          round={round}
          price={price}
          lastAction={state.lastAction ?? 'hold'}
          cash={cash}
          units={units}
          pnl={pnl}
          onNext={nextRound}
        />
      )}

      {phase === 'episode' && (
        <EpisodeSummary
          episode={episode}
          fundamental={fundamental}
          score={state.episodeScores[state.episodeScores.length - 1]}
          onNext={nextEpisode}
        />
      )}

      {phase === 'done' && (
        <ResultsPanel
          scores={state.episodeScores}
          startingCash={STARTING_CASH}
          onReset={reset}
        />
      )}
    </div>
  );
};

BubbleLabGame.displayName = 'BubbleLabGame';
