import { FC } from 'react';
import { Move } from '@/games/economics/prisoners-dilemma/types';
import { formatScore } from '@/games/economics/prisoners-dilemma/game';

interface RoundRevealProps {
  playerMove: Move;
  opponentMove: Move;
  playerScore: number;
  opponentScore: number;
  round: number;
  totalRounds: number;
  onNext: () => void;
}

const MoveIcon: FC<{ item: string }> = ({ item }) => (
  <span className="text-3xl">{item === 'cooperate' ? '🤝' : '🔪'}</span>
);

export const RoundReveal: FC<RoundRevealProps> = ({
  playerMove,
  opponentMove,
  playerScore,
  opponentScore,
  round,
  totalRounds,
  onNext,
}) => (
  <div className="flex flex-col items-center gap-3 py-4">
    <div className="flex items-center gap-6 text-center">
      <div>
        <div className="text-xs uppercase opacity-40">You</div>
        <MoveIcon item={playerMove} />
        <div className="text-xs font-normal uppercase">
          {playerMove === 'cooperate' ? 'Cooperate' : 'Defect'}
        </div>
        <div className="text-xs opacity-60">{formatScore(playerScore)}</div>
      </div>
      <div className="text-2xl opacity-30">VS</div>
      <div>
        <div className="text-xs uppercase opacity-40">Bot</div>
        <MoveIcon item={opponentMove} />
        <div className="text-xs font-normal uppercase">
          {opponentMove === 'cooperate' ? 'Cooperate' : 'Defect'}
        </div>
        <div className="text-xs opacity-60">{formatScore(opponentScore)}</div>
      </div>
    </div>
    <button onClick={onNext} className="btn btn-primary btn-sm">
      {round >= totalRounds ? 'See Results' : 'Next Round'}
    </button>
    <p className="text-xs opacity-40">Enter to continue</p>
  </div>
);
RoundReveal.displayName = 'RoundReveal';
MoveIcon.displayName = 'MoveIcon';
