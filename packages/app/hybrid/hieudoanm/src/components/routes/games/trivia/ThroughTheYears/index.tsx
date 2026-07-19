import { FC } from 'react';

import { useGameStore } from './store';
import { Card } from './components/Card';
import { Timeline } from './components/Timeline';
import type { GameMode } from './types';
import { getComboMultiplier } from './engine';
import type { HintLevel } from './types';

const MODES: { mode: GameMode; label: string; description: string }[] = [
  { mode: 'practice', label: 'Practice', description: 'Unlimited, no score' },
  {
    mode: 'classic',
    label: 'Classic',
    description: '20 events, highest score',
  },
  {
    mode: 'endless',
    label: 'Endless',
    description: 'Infinite, ends on first mistake',
  },
  { mode: 'hardcore', label: 'Hardcore', description: 'One mistake only' },
];

export const ThroughTheYears: FC<{ onClose: () => void }> = ({ onClose }) => {
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
    startGame,
    placeCard,
    useHint,
    getHintText: getHint,
    nextRound,
    reset,
  } = useGameStore();

  if (phase === 'menu') {
    return (
      <div className="mx-auto flex w-full max-w-md flex-col items-center gap-6 py-8">
        <div className="text-center">
          <h1 className="text-xl font-light tracking-tight">
            Through the Years
          </h1>
          <p className="text-base-content/50 mt-1 text-xs">
            Place historical events on the timeline in the correct order.
          </p>
        </div>

        <div className="flex w-full flex-col gap-2">
          {MODES.map(({ mode: m, label, description }) => (
            <button
              key={m}
              onClick={() => startGame(m)}
              className="card border-base-300 bg-base-200 hover:border-base-content/30 flex w-full items-center justify-between border p-4 text-left transition-colors">
              <div>
                <div className="text-sm font-medium">{label}</div>
                <div className="text-base-content/50 text-xs">
                  {description}
                </div>
              </div>
              <div className="text-base-content/30 text-lg">→</div>
            </button>
          ))}
        </div>
      </div>
    );
  }

  const combo = getComboMultiplier(stats.currentStreak);
  const hintText = getHint();

  const handlePlace = (index: number) => {
    if (phase !== 'playing') return;
    placeCard(index);
  };

  if (phase === 'gameover') {
    const accuracy =
      stats.totalEvents > 0
        ? Math.round((stats.correctCount / stats.totalEvents) * 100)
        : 0;

    return (
      <div className="mx-auto flex w-full max-w-md flex-col items-center gap-6 py-8">
        <h2 className="text-lg font-light tracking-tight">Game Over</h2>

        <div className="grid w-full grid-cols-2 gap-3">
          <div className="bg-base-200 rounded-box flex flex-col items-center p-4">
            <span className="text-base-content/50 text-[10px] tracking-wider uppercase">
              Score
            </span>
            <span className="text-2xl font-light">{stats.score}</span>
          </div>
          <div className="bg-base-200 rounded-box flex flex-col items-center p-4">
            <span className="text-base-content/50 text-[10px] tracking-wider uppercase">
              Accuracy
            </span>
            <span className="text-2xl font-light">{accuracy}%</span>
          </div>
          <div className="bg-base-200 rounded-box flex flex-col items-center p-4">
            <span className="text-base-content/50 text-[10px] tracking-wider uppercase">
              Correct
            </span>
            <span className="text-2xl font-light">
              {stats.correctCount}/{stats.totalEvents}
            </span>
          </div>
          <div className="bg-base-200 rounded-box flex flex-col items-center p-4">
            <span className="text-base-content/50 text-[10px] tracking-wider uppercase">
              Best Streak
            </span>
            <span className="text-2xl font-light">{stats.bestStreak}</span>
          </div>
        </div>

        <div className="flex w-full gap-2">
          <button onClick={reset} className="btn btn-primary flex-1">
            Play Again
          </button>
          <button onClick={onClose} className="btn btn-ghost flex-1">
            Quit
          </button>
        </div>
      </div>
    );
  }

  const isReveal = phase === 'reveal';
  const correct = lastResult?.correct ?? false;

  return (
    <div className="mx-auto flex w-full max-w-md flex-col gap-4">
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

ThroughTheYears.displayName = 'ThroughTheYears';
