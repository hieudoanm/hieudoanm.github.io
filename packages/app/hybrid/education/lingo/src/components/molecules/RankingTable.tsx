import { FC } from 'react';
import { STRATEGIES } from '@/games/economics/prisoners-dilemma/constants';
import type { Stance } from '@/games/economics/prisoners-dilemma/types';
import type { Standing } from '@/games/economics/prisoners-dilemma/tournament';

const rankClass = (rank: number): string => {
  if (rank === 1) return 'text-yellow-500 font-bold';
  if (rank === 2) return 'text-slate-400 font-bold';
  if (rank === 3) return 'text-amber-700 font-bold';
  return '';
};

const stanceBadge: Record<Stance, string> = {
  cooperate: 'badge-success',
  defect: 'badge-error',
  other: 'badge-ghost',
};

export const RankingTable: FC<{ standings: Standing[] }> = ({ standings }) => {
  const meta = new Map(STRATEGIES.map((s) => [s.id, s]));

  if (standings.length === 0) {
    return null;
  }

  return (
    <div className="rounded-box border-base-content/10 overflow-x-auto border">
      <table className="table-xs table" data-testid="ranking-table">
        <thead>
          <tr>
            <th>#</th>
            <th>Bot</th>
            <th>Score</th>
            <th>W</th>
            <th>L</th>
            <th>D</th>
            <th>Win rate</th>
          </tr>
        </thead>
        <tbody>
          {standings.map((standing, index) => {
            const rank = index + 1;
            const def = meta.get(standing.strategyId);
            const winRate = standing.played
              ? Math.round((standing.wins / standing.played) * 100)
              : 0;
            return (
              <tr
                key={standing.strategyId}
                data-testid={`standing-${standing.strategyId}`}>
                <td className={`${rankClass(rank)}`}>{rank}</td>
                <td>
                  <span
                    title={def?.description ?? ''}
                    data-testid={`standing-bot-${standing.strategyId}`}
                    className="border-base-content/30 cursor-help border-b border-dotted">
                    {def?.emoji} {def?.label}
                  </span>
                  {def && (
                    <span
                      className={`badge badge-xs ml-2 ${stanceBadge[def.stance]}`}>
                      {def.stance}
                    </span>
                  )}
                </td>
                <td className="font-medium">{standing.score}</td>
                <td>{standing.wins}</td>
                <td>{standing.losses}</td>
                <td>{standing.draws}</td>
                <td>{winRate}%</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};
RankingTable.displayName = 'RankingTable';
