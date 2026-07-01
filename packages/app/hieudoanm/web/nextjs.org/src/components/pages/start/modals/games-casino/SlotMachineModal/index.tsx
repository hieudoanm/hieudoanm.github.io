import { FC, useCallback, useEffect, useRef, useState } from 'react';
import { ModalWrapper } from '@hieudoanm.github.io/components/atoms/ModalWrapper';

import {
  SYMBOLS,
  SPIN_DURATION,
  TICK_INTERVAL,
  INITIAL_CREDITS,
  BET_AMOUNT,
} from './constants';
import { calcWinnings, randomSymbols } from './game';

export const SlotMachineModal: FC<{ onClose: () => void }> = ({ onClose }) => {
  const [reels, setReels] = useState<number[]>([0, 0, 0]);
  const [spinning, setSpinning] = useState(false);
  const [credits, setCredits] = useState(INITIAL_CREDITS);
  const [message, setMessage] = useState('');
  const [winAmount, setWinAmount] = useState(0);

  const spin = useCallback(() => {
    if (spinning || credits < BET_AMOUNT) return;
    setSpinning(true);
    setMessage('');
    setWinAmount(0);
    setCredits((c) => c - BET_AMOUNT);

    const target = randomSymbols();
    const start = Date.now();

    const tick = () => {
      const elapsed = Date.now() - start;
      if (elapsed >= SPIN_DURATION) {
        setReels(target);
        setSpinning(false);
        const won = calcWinnings(target, BET_AMOUNT);
        if (won > 0) {
          setWinAmount(won);
          setCredits((c) => c + won);
          setMessage(`You won ${won}!`);
        } else {
          setMessage('No luck this time');
        }
        return;
      }
      setReels(randomSymbols());
      setTimeout(tick, TICK_INTERVAL);
    };
    tick();
  }, [spinning, credits]);

  const onKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
        return;
      }
      if (e.key === ' ' && !spinning) {
        e.preventDefault();
        spin();
      }
    },
    [onClose, spin, spinning]
  );

  return (
    <ModalWrapper onClose={onClose} title="Slot Machine" size="max-w-xs">
      <div
        tabIndex={0}
        onKeyDown={onKeyDown}
        className="flex flex-col gap-4 outline-none">
        <div className="flex items-center justify-between text-sm">
          <span>
            Credits: <strong className="text-success">{credits}</strong>
          </span>
          <span className="opacity-60">Bet: {BET_AMOUNT}</span>
        </div>

        <div className="bg-base-200 flex items-center justify-center gap-3 rounded-xl py-8">
          {reels.map((idx, i) => (
            <div
              key={i}
              className={`bg-base-300 flex h-20 w-20 items-center justify-center rounded-xl text-4xl shadow-inner ${spinning ? 'animate-pulse' : ''}`}>
              {SYMBOLS[idx].emoji}
            </div>
          ))}
        </div>

        <button
          onClick={spin}
          disabled={spinning || credits < BET_AMOUNT}
          className="btn btn-primary w-full">
          {spinning ? (
            <span className="loading loading-spinner loading-xs" />
          ) : (
            'Spin'
          )}
        </button>

        {message && (
          <div
            className={`text-center text-sm font-normal ${winAmount > 0 ? 'text-success' : 'opacity-50'}`}>
            {message}
            {winAmount > 0 && <span className="ml-2 text-lg">{'🎉'}</span>}
          </div>
        )}

        {credits < BET_AMOUNT && (
          <div className="alert alert-warning py-2 text-center text-xs">
            Out of credits! Reset to play again.
          </div>
        )}

        <button
          onClick={() => setCredits(INITIAL_CREDITS)}
          className="btn btn-ghost btn-xs">
          Reset Credits
        </button>

        <p className="text-center text-xs opacity-40">Space spin · Esc close</p>
      </div>
    </ModalWrapper>
  );
};
SlotMachineModal.displayName = 'SlotMachineModal';
