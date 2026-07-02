import { FC, useCallback, useState } from 'react';
import { ModalWrapper } from '@hieudoanm.github.io/components/atoms/ModalWrapper';

import {
  Bet,
  Phase,
  DICE_FACES,
  INITIAL_CREDITS,
  BET_AMOUNT,
  playRound,
} from './game';

export const DiceGameModal: FC<{ onClose: () => void }> = ({ onClose }) => {
  const [phase, setPhase] = useState<Phase>('bet');
  const [credits, setCredits] = useState(INITIAL_CREDITS);
  const [dice, setDice] = useState<[number, number]>([1, 1]);
  const [bet, setBet] = useState<Bet | null>(null);
  const [lastWon, setLastWon] = useState(0);
  const [rolling, setRolling] = useState(false);

  const doRoll = useCallback(() => {
    if (!bet || credits < BET_AMOUNT || rolling) return;
    setRolling(true);
    setCredits((c) => c - BET_AMOUNT);

    const outcome = playRound(bet);

    setTimeout(() => {
      setDice(outcome.dice);
      setRolling(false);
      setLastWon(outcome.won);
      if (outcome.won > 0) setCredits((c) => c + outcome.won);
      setPhase('result');
    }, 600);
  }, [bet, credits, rolling]);

  const resetRound = useCallback(() => {
    setBet(null);
    setLastWon(0);
    setDice([1, 1]);
    setPhase('bet');
  }, []);

  return (
    <ModalWrapper onClose={onClose} title="Dice Game" size="max-w-xs">
      <div className="flex flex-col gap-4 outline-none">
        <div className="flex items-center justify-between text-sm">
          <span>
            Credits: <strong className="text-success">{credits}</strong>
          </span>
          <span className="opacity-60">Bet: {BET_AMOUNT}</span>
        </div>

        {phase === 'bet' && (
          <div className="flex flex-col gap-2">
            <p className="text-xs opacity-50">Place your bet:</p>
            <div className="flex gap-2">
              {(
                [
                  { id: 'under' as Bet, label: 'Under 7', payout: '2:1' },
                  { id: 'seven' as Bet, label: '7', payout: '5:1' },
                  { id: 'over' as Bet, label: 'Over 7', payout: '2:1' },
                ] as const
              ).map((b) => (
                <button
                  key={b.id}
                  onClick={() => setBet(b.id)}
                  className={`btn btn-sm flex-1 ${bet === b.id ? 'btn-primary' : 'btn-ghost'}`}>
                  <span className="flex flex-col items-center gap-0.5">
                    <span>{b.label}</span>
                    <span className="text-[10px] opacity-60">{b.payout}</span>
                  </span>
                </button>
              ))}
            </div>
            <button
              onClick={doRoll}
              disabled={!bet || credits < BET_AMOUNT}
              className="btn btn-primary btn-sm mt-2">
              Roll Dice
            </button>
          </div>
        )}

        {phase === 'result' && (
          <div className="flex flex-col items-center gap-3">
            <div className="bg-base-200 flex items-center justify-center gap-4 rounded-xl py-6">
              <span className="text-5xl">{DICE_FACES[dice[0]]}</span>
              <span className="text-2xl opacity-30">+</span>
              <span className="text-5xl">{DICE_FACES[dice[1]]}</span>
            </div>
            <div className="text-center text-sm font-normal">
              Total: <strong>{dice[0] + dice[1]}</strong>
            </div>
            <div
              className={`text-center text-sm font-normal ${lastWon > 0 ? 'text-success' : 'opacity-50'}`}>
              {lastWon > 0 ? 'You win!' : 'You lose'}
              {lastWon > 0 && <span className="ml-2">+{lastWon}</span>}
            </div>
            <button
              onClick={resetRound}
              className="btn btn-secondary btn-sm w-full">
              Next Round
            </button>
          </div>
        )}

        <p className="text-center text-xs opacity-40">
          Two dice · Bet on under 7, exactly 7, or over 7
        </p>
      </div>
    </ModalWrapper>
  );
};
DiceGameModal.displayName = 'DiceGameModal';
