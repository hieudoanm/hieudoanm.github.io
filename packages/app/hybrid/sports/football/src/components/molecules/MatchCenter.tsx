'use client';

import { EventLog } from '@/components/molecules/EventLog';
import { MatchClock } from '@/components/molecules/MatchClock';
import { ScoreTracker } from '@/components/molecules/ScoreTracker';
import { MatchController } from '@/hooks/useMatch';
import { substitutionsRemaining } from '@/lib/match';
import { FC } from 'react';

interface MatchCenterProps {
  controller: MatchController;
}

export const MatchCenter: FC<MatchCenterProps> = ({ controller }) => {
  const { match, start, pause, reset } = controller;
  const toggleStart = match.running ? pause : start;

  return (
    <div className="flex flex-col gap-3">
      <MatchClock
        running={match.running}
        elapsed={match.elapsed}
        onToggleStart={toggleStart}
        onReset={reset}
      />
      <ScoreTracker
        goalsFor={match.goalsFor}
        goalsAgainst={match.goalsAgainst}
        onGoal={controller.addGoal}
        onConcede={controller.addConcede}
        onUndoGoal={controller.undoGoal}
        onUndoConcede={controller.undoConcede}
      />
      <EventLog
        events={match.events}
        addedTime={match.addedTime}
        substitutions={match.substitutions}
        substitutionsRemaining={substitutionsRemaining(match)}
        onAddCard={controller.addCard}
        onSetAddedTime={controller.setAddedTime}
      />
    </div>
  );
};

MatchCenter.displayName = 'MatchCenter';
