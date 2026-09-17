'use client';

import { useCallback, useMemo, useState } from 'react';
import { BET_AMOUNT, INITIAL_CREDITS } from './constants';
import { calcWinnings, randomSymbols } from './utils';

export interface UseSlotMachineResult {
  reels: number[];
  credits: number;
  message: string;
  winAmount: number;
  broke: boolean;
  spin: () => void;
  resetCredits: () => void;
}

export const useSlotMachine = (): UseSlotMachineResult => {
  const [reels, setReels] = useState<number[]>([0, 0, 0]);
  const [credits, setCredits] = useState(INITIAL_CREDITS);
  const [message, setMessage] = useState('');
  const [winAmount, setWinAmount] = useState(0);

  const spin = useCallback((): void => {
    if (credits < BET_AMOUNT) return;
    const target = randomSymbols();
    setCredits((balance) => balance - BET_AMOUNT);
    setReels(target);
    const won = calcWinnings(target, BET_AMOUNT);
    setWinAmount(won);
    setMessage(won > 0 ? `You won ${won}!` : 'No luck this time');
    if (won > 0) setCredits((balance) => balance + won);
  }, [credits]);

  const resetCredits = useCallback((): void => {
    setCredits(INITIAL_CREDITS);
    setMessage('');
    setWinAmount(0);
    setReels([0, 0, 0]);
  }, []);

  return useMemo(
    () => ({
      reels,
      credits,
      message,
      winAmount,
      broke: credits < BET_AMOUNT,
      spin,
      resetCredits,
    }),
    [credits, message, reels, resetCredits, spin, winAmount]
  );
};
