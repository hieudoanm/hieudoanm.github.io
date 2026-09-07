import { FC } from 'react';
import { STRATEGIES } from '@/games/prisoners-dilemma/constants';
import type { StrategyDef } from '@/games/prisoners-dilemma/constants';

export const StrategyList: FC<{ strategies?: StrategyDef[] }> = ({
  strategies = STRATEGIES,
}) => (
  <div className="flex flex-col gap-3">
    <h2 className="text-primary text-lg font-bold tracking-tight">Bots</h2>
    <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-3">
      {strategies.map(({ id, label, emoji, description }) => (
        <div
          key={id}
          data-testid={`strategy-${id}`}
          className="card bg-base-200 border-base-content/10 flex flex-col gap-1 border p-3">
          <div className="flex items-center gap-2">
            <span className="text-xl">{emoji}</span>
            <span className="text-sm font-normal">{label}</span>
          </div>
          <p className="text-base-content/60 text-xs">{description}</p>
        </div>
      ))}
    </div>
  </div>
);
StrategyList.displayName = 'StrategyList';
