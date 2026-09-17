'use client';

import type { FC } from 'react';

import { ReadyStep } from './components/ReadyStep';
import { ResultStep } from './components/ResultStep';
import { RunningStep } from './components/RunningStep';
import { useNBack } from './useNBack';

export const NBack: FC = () => {
  const {
    n,
    setN,
    trials,
    currentIdx,
    phase,
    hits,
    misses,
    falseAlarms,
    showStimulus,
    totalTargets,
    accuracy,
    start,
    respond,
    onKeyDown,
  } = useNBack();

  return (
    <div
      tabIndex={0}
      onKeyDown={onKeyDown}
      className="flex flex-col gap-3 outline-none">
      <div className="flex items-center justify-between text-sm">
        <span className="opacity-50">N-back</span>
        <div className="flex gap-1">
          {[1, 2, 3].map((option) => (
            <button
              key={option}
              onClick={() => setN(option)}
              className={`btn btn-xs ${n === option ? 'btn-primary' : 'btn-ghost'}`}>
              {option}
            </button>
          ))}
        </div>
      </div>

      {phase === 'ready' && <ReadyStep n={n} onStart={start} />}

      {phase === 'running' && (
        <RunningStep
          trials={trials}
          currentIdx={currentIdx}
          hits={hits}
          showStimulus={showStimulus}
          onRespond={respond}
        />
      )}

      {phase === 'result' && (
        <ResultStep
          hits={hits}
          totalTargets={totalTargets}
          misses={misses}
          falseAlarms={falseAlarms}
          accuracy={accuracy}
          onRestart={start}
        />
      )}

      <p className="text-center text-xs opacity-40">A match · L no match</p>
    </div>
  );
};

NBack.displayName = 'NBack';
