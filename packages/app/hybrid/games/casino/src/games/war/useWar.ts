'use client';

import { useCallback, useMemo, useState } from 'react';
import { createDeck, shuffle, type Card } from '../_shared/cards';
import { MIN_DECK } from './utils';
import { STAKE, type WarRound } from './types';
import { INITIAL_CREDITS } from './types';
import { playWarRound } from './utils';

export interface UseWarResult {
  deckLeft: number;
  credits: number;
  round: WarRound | null;
  streak: number;
  play: () => void;
}

export const useWar = (): UseWarResult => {
  const [deck, setDeck] = useState<Card[]>(() => shuffle(createDeck()));
  const [credits, setCredits] = useState(INITIAL_CREDITS);
  const [round, setRound] = useState<WarRound | null>(null);
  const [streak, setStreak] = useState(0);

  const play = useCallback((): void => {
    if (credits < STAKE) return;
    const current = deck.length < MIN_DECK ? shuffle(createDeck()) : deck;
    const played = playWarRound(current);
    if (!played) return;
    const won = played.result === 'player' ? STAKE * played.multiplier : 0;
    setCredits((balance) => balance - STAKE + won);
    setStreak((currentStreak) => (won > 0 ? currentStreak + 1 : 0));
    setDeck(played.remaining);
    setRound(played);
  }, [credits, deck]);

  return useMemo(
    () => ({ deckLeft: deck.length, credits, round, streak, play }),
    [credits, deck.length, play, round, streak]
  );
};
