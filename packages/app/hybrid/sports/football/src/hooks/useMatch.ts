'use client';

import {
  addCard,
  addConcede,
  addGoal,
  defaultMatch,
  loadMatch,
  MatchState,
  recordSubstitution,
  saveMatch,
  setAddedTime,
  tick,
  undoConcede,
  undoGoal,
} from '@/lib/match';
import { matchPhase } from '@/lib/clock';
import { useCallback, useEffect, useRef, useState } from 'react';

export interface UseMatchOptions {
  onHalfTime?: () => void;
}

export interface MatchController {
  match: MatchState;
  start: () => void;
  pause: () => void;
  reset: () => void;
  addGoal: () => void;
  addConcede: () => void;
  undoGoal: () => void;
  undoConcede: () => void;
  addCard: (kind: 'yellow' | 'red') => void;
  setAddedTime: (minutes: number) => void;
  recordSubstitution: (playerName?: string) => void;
}

export const useMatch = (options: UseMatchOptions = {}): MatchController => {
  const [match, setMatch] = useState<MatchState>(
    () => loadMatch() ?? defaultMatch()
  );
  const onHalfTimeRef = useRef<() => void>(() => {});
  const halfTimeFiredRef = useRef(false);
  onHalfTimeRef.current = options.onHalfTime ?? (() => {});

  useEffect(() => {
    saveMatch(match);
  }, [match]);

  useEffect(() => {
    if (!match.running) return;
    const timer = setInterval(() => {
      setMatch((current) => (current.running ? tick(current) : current));
    }, 1000);
    return () => clearInterval(timer);
  }, [match.running]);

  useEffect(() => {
    if (
      !halfTimeFiredRef.current &&
      match.events.some((event) => event.type === 'half-time-whistle')
    ) {
      halfTimeFiredRef.current = true;
      onHalfTimeRef.current();
    }
  }, [match.events]);

  const start = useCallback(() => {
    setMatch((current) => {
      if (current.running) return current;
      if (matchPhase(current.elapsed) === 'full-time') {
        return { ...defaultMatch(), running: true };
      }
      if (matchPhase(current.elapsed) === 'half-time') {
        return { ...current, running: true, addedTime: 0 };
      }
      return { ...current, running: true };
    });
  }, []);

  const pause = useCallback(() => {
    setMatch((current) =>
      current.running ? { ...current, running: false } : current
    );
  }, []);

  const reset = useCallback(() => {
    halfTimeFiredRef.current = false;
    setMatch(defaultMatch());
  }, []);

  const handleAddGoal = useCallback(() => {
    setMatch((current) => addGoal(current));
  }, []);

  const handleAddConcede = useCallback(() => {
    setMatch((current) => addConcede(current));
  }, []);

  const handleUndoGoal = useCallback(() => {
    setMatch((current) => undoGoal(current));
  }, []);

  const handleUndoConcede = useCallback(() => {
    setMatch((current) => undoConcede(current));
  }, []);

  const handleAddCard = useCallback((kind: 'yellow' | 'red') => {
    setMatch((current) => addCard(current, kind));
  }, []);

  const handleSetAddedTime = useCallback((minutes: number) => {
    setMatch((current) => setAddedTime(current, minutes));
  }, []);

  const handleRecordSubstitution = useCallback((playerName?: string) => {
    setMatch((current) => recordSubstitution(current, playerName));
  }, []);

  return {
    match,
    start,
    pause,
    reset,
    addGoal: handleAddGoal,
    addConcede: handleAddConcede,
    undoGoal: handleUndoGoal,
    undoConcede: handleUndoConcede,
    addCard: handleAddCard,
    setAddedTime: handleSetAddedTime,
    recordSubstitution: handleRecordSubstitution,
  };
};
