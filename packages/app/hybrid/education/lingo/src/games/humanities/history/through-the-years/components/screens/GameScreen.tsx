import { FC } from 'react';
import { Card } from '../components/Card';
import { Timeline } from '../components/Timeline';
import { getComboMultiplier } from '../../engine';
import { useGameStore } from '../../store';
import type { HintLevel } from '../../types';

export const GameScreen: FC = () => {
  const {
    mode,
    phase,
    timeline,
    currentCard,
    stats,
    hintsUsedThisRound,
    lastResult,
    totalRounds,
    maxRounds,
    placeCard,
    useHint,
    getHintText: getHint,
    nextRound,
    reset,
  } = useGameStore();

  const combo = getComboMultiplier(stats.currentStreak);
  const hintText = getHint();
  const isReveal = phase === 'reveal';
  const correct = lastResult?.correct ?? false;

  const handlePlace = (index: number) => {
    if (phase !== 'playing') return;
    placeCard(index);
  };

  return (
    <div className="mx-auto flex w-full max-w-md flex-col gap-4 p-4 md:p-8">
      <div className="flex items-center justify-between text-xs">
        <span className="text-base-content/50">
          Round {totalRounds}
          {maxRounds < Infinity ? `/${maxRounds}` : ''}
        </span>
        <span className="font-mono tabular-nums">Score: {stats.score}</span>
        {stats.currentStreak > 1 && (
          <span className="text-warning font-mono tabular-nums">
            {stats.currentStreak}x streak
            {combo > 1 && <span className="ml-0.5">×{combo}</span>}
          </span>
        )}
      </div>

      <div className="flex justify-end">
        <button onClick={reset} className="btn btn-ghost btn-xs">
          Change mode
        </button>
      </div>

      {currentCard && (
        <Card
          event={currentCard}
          showYear={isReveal}
          hintText={hintText}
          hintLevel={hintsUsedThisRound as HintLevel}
          onHint={useHint}
        />
      )}

      <Timeline
        events={timeline}
        currentCard={currentCard}
        phase={isReveal ? 'reveal' : 'playing'}
        lastResult={lastResult}
        onPlace={handlePlace}
      />

      {isReveal && (
        <div className="flex flex-col gap-2">
          <div
            className={`rounded-box flex items-center justify-between px-3 py-2 text-sm ${correct ? 'bg-success/20 text-success' : 'bg-error/20 text-error'}`}>
            <span>{correct ? 'Correct!' : 'Incorrect'}</span>
            {lastResult && !correct && (
              <span className="text-base-content/50 text-xs">
                Would go at position {lastResult.correctIndex + 1}
              </span>
            )}
          </div>
          <button onClick={nextRound} className="btn btn-primary">
            {mode === 'classic' && totalRounds >= maxRounds
              ? 'See Results'
              : 'Next'}
          </button>
        </div>
      )}
    </div>
  );
};

GameScreen.displayName = 'GameScreen';
