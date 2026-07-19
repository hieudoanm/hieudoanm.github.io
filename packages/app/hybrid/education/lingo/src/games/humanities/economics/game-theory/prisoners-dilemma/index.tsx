import { FC, useCallback, useEffect, useMemo, useReducer, useRef } from 'react';
import { GameResult, ResultKind } from '@/components/molecules/GameResult';
import { MoveButtons } from '@/components/molecules/MoveButtons';
import { PayoffMatrix } from '@/components/molecules/PayoffMatrix';
import { RoundHistory } from '@/components/molecules/RoundHistory';
import { RoundReveal } from '@/components/molecules/RoundReveal';
import { ScoreBar } from '@/components/molecules/ScoreBar';
import { PAYOFF, TOTAL_ROUNDS } from './constants';
import { createInitialState, gameReducer } from './reducer';
import { Move } from './types';
import { chooseOpponent } from './game';

export const PrisonerDilemma: FC = () => {
  const [state, dispatch] = useReducer(
    gameReducer,
    undefined,
    createInitialState
  );
  const containerRef = useRef<HTMLDivElement>(null);
  const {
    phase,
    round,
    playerMove,
    opponentMove,
    playerScore,
    opponentScore,
    history,
    strategy,
  } = state;

  const playerHistory = useMemo(() => history.map((r) => r.player), [history]);

  useEffect(() => {
    containerRef.current?.focus();
  }, []);

  const handleMove = useCallback(
    (move: Move) => {
      if (phase !== 'choose') return;
      const opp = chooseOpponent(strategy, history, playerHistory);
      const [pAdd, oAdd] = PAYOFF[move][opp];
      dispatch({
        type: 'SUBMIT_MOVE',
        playerMove: move,
        opponentMove: opp,
        pAdd,
        oAdd,
      });
    },
    [phase, strategy, history, playerHistory]
  );

  const nextRound = useCallback(() => {
    dispatch({ type: 'NEXT_ROUND', totalRounds: TOTAL_ROUNDS });
    if (round < TOTAL_ROUNDS) containerRef.current?.focus();
  }, [round]);

  const reset = useCallback(() => {
    dispatch({ type: 'RESET' });
    containerRef.current?.focus();
  }, []);

  const onKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === 'r') {
        reset();
        return;
      }
      if (e.key === 'c') handleMove('cooperate');
      if (e.key === 'd') handleMove('defect');
      if (e.key === 'Enter' && phase === 'reveal') nextRound();
    },
    [handleMove, nextRound, phase, reset]
  );

  const result: ResultKind | null =
    phase === 'done'
      ? playerScore < opponentScore
        ? 'win'
        : playerScore > opponentScore
          ? 'lose'
          : 'draw'
      : null;

  return (
    <div
      ref={containerRef}
      tabIndex={0}
      onKeyDown={onKeyDown}
      className="flex flex-col gap-3 outline-none">
      <ScoreBar
        phase={phase}
        round={round}
        playerScore={playerScore}
        opponentScore={opponentScore}
      />
      <PayoffMatrix />
      {phase === 'choose' && <MoveButtons onMove={handleMove} />}
      {phase === 'reveal' && playerMove && opponentMove && (
        <RoundReveal
          playerMove={playerMove}
          opponentMove={opponentMove}
          playerScore={playerScore}
          opponentScore={opponentScore}
          round={round}
          totalRounds={TOTAL_ROUNDS}
          onNext={nextRound}
        />
      )}
      {phase === 'done' && result && (
        <GameResult
          result={result}
          playerScore={playerScore}
          opponentScore={opponentScore}
          strategy={strategy}
          onReset={reset}
        />
      )}

      <RoundHistory history={history} phase={phase} />

      <p className="text-center text-xs opacity-40">
        C cooperate · D defect · R reset
      </p>
    </div>
  );
};
PrisonerDilemma.displayName = 'PrisonerDilemma';
