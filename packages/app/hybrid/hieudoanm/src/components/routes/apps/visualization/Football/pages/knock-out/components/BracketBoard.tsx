import type { FC, RefObject } from 'react';

import { nodePos } from '../tree';
import type { BracketMatch, BracketNode, TeamInfo } from '../types';
import { R_OUTER, rotation } from '../constants';
import { BracketPill } from './BracketPill';
import { BranchLines } from './BranchLines';
import { RingsLayer } from './RingsLayer';

export const BracketBoard: FC<{
  root: BracketNode;
  winners: Record<string, string>;
  allNodes: BracketNode[];
  teams: Record<string, TeamInfo>;
  resolvedTeam: (node: BracketNode) => string | null;
  isEliminated: (node: BracketNode) => boolean;
  canPick: (node: BracketNode) => boolean;
  isInvited: (node: BracketNode) => boolean;
  handlePick: (node: BracketNode) => void;
  champ: string | null;
  bracketRef: RefObject<HTMLDivElement | null>;
}> = ({
  root,
  winners,
  allNodes,
  teams,
  resolvedTeam,
  isEliminated,
  canPick,
  isInvited,
  handlePick,
  champ,
  bracketRef,
}) => {
  const maxLevel = (root as BracketMatch).level;
  const step = R_OUTER / maxLevel;
  const rings = maxLevel + 1;
  const leafCount = allNodes.filter((n) => n.kind === 'leaf').length;
  const rot = rotation(leafCount);
  return (
    <div
      className="relative mx-auto mb-8 w-full max-w-screen-sm"
      ref={bracketRef}>
      <div className="relative aspect-square">
        <div className="absolute inset-0">
          <svg
            viewBox="0 0 100 100"
            className="absolute inset-0 h-full w-full overflow-visible">
            <g>
              <RingsLayer
                rings={rings}
                ticks={leafCount}
                ringStep={step}
                rotation={rot}
              />
              <BranchLines root={root} winners={winners} ringStep={step} />
            </g>
          </svg>

          <div className="absolute inset-0 h-full w-full">
            {allNodes.map((node) => (
              <BracketPill
                key={node.kind === 'leaf' ? `l-${node.team}` : node.id}
                node={node}
                pos={nodePos(node, step)}
                team={resolvedTeam(node)}
                info={resolvedTeam(node) ? teams[resolvedTeam(node)!] : null}
                eliminated={isEliminated(node)}
                canPick={canPick(node)}
                invited={isInvited(node)}
                decided={node.kind === 'match' && !!winners[node.id]}
                isChampion={node === root && !!champ}
                onPick={() => handlePick(node)}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
BracketBoard.displayName = 'BracketBoard';
