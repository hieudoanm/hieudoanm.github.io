import type { FC } from 'react';
import { useMemo } from 'react';

import type { BracketNode } from '../types';
import { getAllMatches, nodePos } from '../tree';

export const BranchLines: FC<{
  root: BracketNode;
  winners: Record<string, string>;
  ringStep: number;
}> = ({ root, winners, ringStep }) => {
  const matches = useMemo(() => getAllMatches(root), [root]);

  const resolvedTeam = (node: BracketNode): string | null => {
    if (node.kind === 'leaf') return node.team;
    return winners[node.id] ?? null;
  };

  const elbowPath = (
    p1: { x: number; y: number },
    p2: { x: number; y: number }
  ) => `M ${p1.x} ${p1.y} L ${p2.x} ${p2.y}`;

  const lines = matches.flatMap((m) =>
    m.kids.map((kid) => {
      const p1 = nodePos(kid, ringStep);
      const p2 = nodePos(m, ringStep);
      const kidTeam = resolvedTeam(kid);
      const lit = kidTeam != null && winners[m.id] === kidTeam;
      return { d: elbowPath(p1, p2), lit };
    })
  );

  return (
    <g>
      {lines.map((line, i) => (
        <path
          key={i}
          d={line.d}
          className={`fill-none transition-all duration-500 ${
            line.lit
              ? 'stroke-red-500 opacity-90'
              : 'stroke-white/12 opacity-40'
          }`}
          strokeWidth={0.4}
        />
      ))}
    </g>
  );
};
