import { GAME_TREE } from '../constants';
import {
  bestContinuation,
  isSubgamePerfect,
  outcomeFor,
  rollbackPath,
  terminalPayoffs,
} from '../game';

describe('terminalPayoffs', () => {
  it('returns payoffs for a terminal node', () => {
    expect(terminalPayoffs(GAME_TREE.children!.out)).toEqual([4, 6]);
    expect(
      terminalPayoffs(GAME_TREE.children!.enter.children!.accommodate)
    ).toEqual([6, 6]);
    expect(
      terminalPayoffs(GAME_TREE.children!.enter.children!.fight.children!.stay)
    ).toEqual([-2, 8]);
    expect(
      terminalPayoffs(GAME_TREE.children!.enter.children!.fight.children!.leave)
    ).toEqual([2, 4]);
  });
});

describe('bestContinuation', () => {
  it('at Node 3 the entrant prefers Leave over Stay', () => {
    const node3 = GAME_TREE.children!.enter.children!.fight;
    const result = bestContinuation(node3);
    expect(result.action).toBe('leave');
    expect(result.payoffs).toEqual([2, 4]);
  });

  it('at Node 2 the incumbent prefers Accommodate over Fight', () => {
    const node2 = GAME_TREE.children!.enter;
    const result = bestContinuation(node2);
    expect(result.action).toBe('accommodate');
    expect(result.payoffs).toEqual([6, 6]);
  });

  it('at Node 1 the entrant prefers Enter over Out', () => {
    const result = bestContinuation(GAME_TREE);
    expect(result.action).toBe('enter');
    expect(result.payoffs).toEqual([6, 6]);
  });
});

describe('rollbackPath', () => {
  it('returns the SPNE decision list', () => {
    const path = rollbackPath();
    expect(path).toEqual([
      { nodeId: 'node1', action: 'enter' },
      { nodeId: 'node2', action: 'accommodate' },
    ]);
  });
});

describe('outcomeFor', () => {
  it('returns (6,6) for Enter then Accommodate', () => {
    expect(
      outcomeFor([
        { nodeId: 'node1', action: 'enter' },
        { nodeId: 'node2', action: 'accommodate' },
      ])
    ).toEqual([6, 6]);
  });

  it('returns (4,6) for Out', () => {
    expect(outcomeFor([{ nodeId: 'node1', action: 'out' }])).toEqual([4, 6]);
  });

  it('returns (-2,8) for Enter, Fight, Stay', () => {
    expect(
      outcomeFor([
        { nodeId: 'node1', action: 'enter' },
        { nodeId: 'node2', action: 'fight' },
        { nodeId: 'node3', action: 'stay' },
      ])
    ).toEqual([-2, 8]);
  });

  it('returns (2,4) for Enter, Fight, Leave', () => {
    expect(
      outcomeFor([
        { nodeId: 'node1', action: 'enter' },
        { nodeId: 'node2', action: 'fight' },
        { nodeId: 'node3', action: 'leave' },
      ])
    ).toEqual([2, 4]);
  });
});

describe('isSubgamePerfect', () => {
  it('returns true for the SPNE path', () => {
    expect(
      isSubgamePerfect([
        { nodeId: 'node1', action: 'enter' },
        { nodeId: 'node2', action: 'accommodate' },
      ])
    ).toBe(true);
  });

  it('returns false when entrant chooses Out', () => {
    expect(isSubgamePerfect([{ nodeId: 'node1', action: 'out' }])).toBe(false);
  });

  it('returns false when incumbent chooses Fight', () => {
    expect(
      isSubgamePerfect([
        { nodeId: 'node1', action: 'enter' },
        { nodeId: 'node2', action: 'fight' },
      ])
    ).toBe(false);
  });
});
