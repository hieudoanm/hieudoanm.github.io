'use client';

import type { FC } from 'react';

interface ReadyStepProps {
  n: number;
  onStart: () => void;
}

export const ReadyStep: FC<ReadyStepProps> = ({ n, onStart }) => (
  <div className="flex flex-col items-center gap-3 py-8">
    <p className="text-center text-sm opacity-70">
      Watch the grid. Press <kbd className="kbd kbd-xs">A</kbd> when the
      position matches what you saw {n} steps ago.
    </p>
    <button onClick={onStart} className="btn btn-primary">
      Start
    </button>
    <p className="text-xs opacity-40">Press Enter</p>
  </div>
);

ReadyStep.displayName = 'ReadyStep';
