import { FC } from 'react';
import { Move } from '@/games/economics/prisoners-dilemma/types';

interface MoveButtonsProps {
  onMove: (move: Move) => void;
}

export const MoveButtons: FC<MoveButtonsProps> = ({ onMove }) => (
  <>
    <div className="flex justify-center gap-3 py-4">
      <button
        onClick={() => onMove('cooperate')}
        className="btn btn-success btn-lg flex-col gap-0 px-6">
        <span className="text-2xl">🤝</span>
        <span className="text-xs">Cooperate</span>
      </button>
      <button
        onClick={() => onMove('defect')}
        className="btn btn-error btn-lg flex-col gap-0 px-6">
        <span className="text-2xl">🔪</span>
        <span className="text-xs">Defect</span>
      </button>
    </div>
    <p className="text-center text-xs opacity-40">C cooperate · D defect</p>
  </>
);
MoveButtons.displayName = 'MoveButtons';
