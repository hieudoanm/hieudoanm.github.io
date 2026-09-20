export const TOTAL_ROUNDS = 5;

export interface TreeNode {
  id: string;
  actor: 'entrant' | 'incumbent' | 'terminal';
  actions?: string[];
  children?: Record<string, TreeNode>;
  payoffs?: [number, number];
}

export const GAME_TREE: TreeNode = {
  id: 'node1',
  actor: 'entrant',
  actions: ['enter', 'out'],
  children: {
    out: { id: 'term-out', actor: 'terminal', payoffs: [4, 6] },
    enter: {
      id: 'node2',
      actor: 'incumbent',
      actions: ['accommodate', 'fight'],
      children: {
        accommodate: {
          id: 'term-accommodate',
          actor: 'terminal',
          payoffs: [6, 6],
        },
        fight: {
          id: 'node3',
          actor: 'entrant',
          actions: ['stay', 'leave'],
          children: {
            stay: { id: 'term-stay', actor: 'terminal', payoffs: [-2, 8] },
            leave: { id: 'term-leave', actor: 'terminal', payoffs: [2, 4] },
          },
        },
      },
    },
  },
};

export const TERMINAL_PAYOFFS: Record<string, [number, number]> = {
  'term-out': [4, 6],
  'term-accommodate': [6, 6],
  'term-stay': [-2, 8],
  'term-leave': [2, 4],
};
