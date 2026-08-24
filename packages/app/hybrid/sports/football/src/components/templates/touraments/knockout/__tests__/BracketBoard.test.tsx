import { render, screen } from '@testing-library/react';
import { BracketBoard } from '../BracketBoard';
import { buildTree, computeAngles, getLeaves, collectNodes, resetMatchIdCounter } from '../tree';
import type { BracketNode, BracketMatch } from '@/data/touraments/types/bracket';

beforeEach(() => {
  resetMatchIdCounter();
});

const buildTestData = () => {
  const root = buildTree(['A', 'B'] as any) as BracketMatch;
  const leaves = getLeaves(root);
  leaves.forEach((l, i) => {
    l.angle = -90 + i * 180;
    l.angleIndex = i;
  });
  computeAngles(root);
  const allNodes = collectNodes(root);
  return { root, allNodes };
};

describe('BracketBoard', () => {
  it('renders without crashing', () => {
    const { root, allNodes } = buildTestData();
    const { container } = render(
      <BracketBoard
        root={root}
        winners={{}}
        allNodes={allNodes}
        teams={{}}
        resolvedTeam={(n) => (n.kind === 'leaf' ? n.team : null)}
        isEliminated={() => false}
        canPick={() => false}
        isInvited={() => false}
        handlePick={jest.fn()}
        champ={null}
        bracketRef={{ current: null }}
      />,
    );
    expect(container.querySelector('svg')).toBeInTheDocument();
  });

  it('renders with champ', () => {
    const { root, allNodes } = buildTestData();
    render(
      <BracketBoard
        root={root}
        winners={{ m0: 'A' }}
        allNodes={allNodes}
        teams={{}}
        resolvedTeam={(n) => (n.kind === 'leaf' ? n.team : n.id === 'm0' ? 'A' : null)}
        isEliminated={() => false}
        canPick={() => false}
        isInvited={() => false}
        handlePick={jest.fn()}
        champ="A"
        bracketRef={{ current: null }}
      />,
    );
    expect(screen.getByText('🏆')).toBeInTheDocument();
  });
});
