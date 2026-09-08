import { FC } from 'react';
import { CheckButton, NextButton } from './components';
import { POLICY_MAX, POLICY_MIN } from './constants';
import type { MedianResult, Voter } from './types';

export const PolicyLine: FC<{
  voters: Voter[];
  playerPlatform: number;
  botPlatform: number;
  median: number;
  onChange: (value: number) => void;
}> = ({ voters, playerPlatform, botPlatform, median, onChange }) => (
  <div className="flex flex-col gap-2" data-testid="policy-line">
    <div className="border-base-300 bg-base-200 relative h-8 rounded border">
      <span
        className="bg-error absolute top-0 bottom-0"
        title="median voter"
        style={{ left: `${median}%`, width: 2 }}
      />
      <span
        className="bg-primary absolute top-0 bottom-0"
        title="rival platform"
        style={{ left: `${botPlatform}%`, width: 2 }}
      />
      {voters.map((voter) => (
        <span
          key={voter.id}
          className="bg-base-content/70 absolute top-4 size-1.5 -translate-x-1/2 rounded-full"
          style={{ left: `${voter.ideal}%` }}
        />
      ))}
    </div>
    <div className="flex items-center gap-2 text-sm">
      <span data-testid="median" className="badge badge-outline">
        median {median}
      </span>
      <input
        type="range"
        min={POLICY_MIN}
        max={POLICY_MAX}
        value={playerPlatform}
        onChange={(e) => onChange(Number(e.target.value))}
        data-testid="my-platform"
        className="range range-primary w-full"
      />
      <span data-testid="bot-platform" className="badge badge-outline">
        rival {botPlatform}
      </span>
    </div>
    <div className="text-base-content/60 text-xs">
      <span data-testid="voters">{voters.length} voters</span> — dots mark ideal
      points along a 0–100 policy line.
    </div>
  </div>
);

export const MedianPlan: FC<{
  voters: Voter[];
  playerPlatform: number;
  botPlatform: number;
  median: number;
  onChange: (value: number) => void;
  onCheck: () => void;
}> = ({ voters, playerPlatform, botPlatform, median, onChange, onCheck }) => (
  <div className="card border-base-content/10 flex flex-col gap-3 border p-4">
    <p className="text-sm">
      Every voter backs the candidate whose platform is closest to their ideal
      point. Under majority rule, the candidate closest to the{' '}
      <strong>median voter</strong> wins (Downs&rsquo; median voter theorem).
    </p>
    <PolicyLine
      voters={voters}
      playerPlatform={playerPlatform}
      botPlatform={botPlatform}
      median={median}
      onChange={onChange}
    />
    <p className="text-base-content/60 text-xs">
      Set your platform, then hit Check. Start at the median voter&rsquo;s
      point, then nudge away to see the majority flip to your rival.
    </p>
    <CheckButton onCheck={onCheck} />
  </div>
);

export const MedianCheck: FC<{
  result: MedianResult;
  median: number;
  nextLabel: string;
  onNext: () => void;
}> = ({ result, median, nextLabel, onNext }) => {
  const playerWon = result.winner === 'player';
  const headline =
    result.winner === 'player'
      ? 'You won the election'
      : result.winner === 'bot'
        ? 'The rival won the election'
        : 'The election was a tie';
  return (
    <div className="flex flex-col items-center gap-3 py-4 text-center">
      <div className="text-3xl">{playerWon ? '🎉' : '📉'}</div>
      <div className="text-lg">{headline}</div>
      <div data-testid="winner" className="flex flex-col gap-1 text-sm">
        <span>
          Vote count — you {result.votesForPlayer}, rival {result.votesForBot}
        </span>
        <span>
          Distance to median — you {Math.abs(result.playerPlatform - median)},
          rival {Math.abs(result.botPlatform - median)}
        </span>
        <span>
          Median voter&rsquo;s ideal point: <strong>{median}</strong>
        </span>
      </div>
      <p className="text-base-content/60 max-w-md text-xs">
        The closer you are to the median voter, the more votes you win. Moving
        toward the median is the equilibrium — candidates converge there.
      </p>
      <NextButton label={nextLabel} onNext={onNext} />
    </div>
  );
};
