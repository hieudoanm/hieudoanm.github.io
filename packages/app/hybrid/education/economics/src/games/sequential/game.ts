import { GAME_TREE } from './constants';
import type { TreeNode } from './constants';

export const terminalPayoffs = (node: TreeNode): [number, number] => {
  if (node.payoffs) return node.payoffs;
  throw new Error(`Node ${node.id} is not terminal`);
};

export const bestContinuation = (
  node: TreeNode
): { action: string; payoffs: [number, number] } => {
  if (!node.children || !node.actions) {
    throw new Error(`Node ${node.id} has no children`);
  }
  const isEntrant = node.actor === 'entrant';
  let bestAction = node.actions[0];
  let bestPayoff = -Infinity;
  for (const action of node.actions) {
    const child = node.children[action];
    if (!child) continue;
    const payoffs = child.payoffs ?? bestContinuation(child).payoffs;
    const value = isEntrant ? payoffs[0] : payoffs[1];
    if (value > bestPayoff) {
      bestPayoff = value;
      bestAction = action;
    }
  }
  const child = node.children[bestAction];
  const payoffs = child?.payoffs ?? bestContinuation(child!).payoffs;
  return { action: bestAction, payoffs };
};

export const rollbackPath = (): { nodeId: string; action: string }[] => {
  const node3 = GAME_TREE.children!.enter.children!.fight;
  const n3Best = bestContinuation(node3);

  const node2 = GAME_TREE.children!.enter;
  let bestAction2 = 'accommodate';
  let bestPayoff2 = -Infinity;
  for (const action of node2.actions!) {
    const child = node2.children![action];
    const p = child?.payoffs ?? bestContinuation(child!).payoffs;
    if (p[1] > bestPayoff2) {
      bestPayoff2 = p[1];
      bestAction2 = action;
    }
  }

  const node1 = GAME_TREE;
  const outPayoffs = node1.children!.out.payoffs!;
  const enterChild = node1.children!.enter;
  const enterPayoffs = enterChild.payoffs ?? [6, 6];
  const bestAction1 = enterPayoffs[0] >= outPayoffs[0] ? 'enter' : 'out';

  return [
    { nodeId: 'node1', action: bestAction1 },
    { nodeId: 'node2', action: bestAction2 },
  ];
};

export const outcomeFor = (
  actions: { nodeId: string; action: string }[]
): [number, number] => {
  let node: TreeNode | undefined = GAME_TREE;
  for (const { action } of actions) {
    if (!node?.children) break;
    node = node.children[action];
  }
  if (node?.payoffs) return node.payoffs;
  throw new Error('Invalid action path');
};

export const isSubgamePerfect = (
  path: { nodeId: string; action: string }[]
): boolean => {
  const spne = rollbackPath();
  for (const step of spne) {
    const match = path.find((p) => p.nodeId === step.nodeId);
    if (!match || match.action !== step.action) return false;
  }
  return true;
};
