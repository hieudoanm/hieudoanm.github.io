import { download } from '@hieudoanm.github.io/utils/canvas';
import type { FC } from 'react';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';

import type { TournamentSlug } from '../../../data/tournament';
import type { KnockoutYearData } from '../../../data/world-cup/types';
import {
  buildParentMap,
  buildTree,
  collectNodes,
  computeAngles,
  getAllMatches,
  getLeaves,
  resetMatchIdCounter,
} from '../tree';
import type { BracketNode } from '../types';
import { rotation } from '../constants';
import { BracketActions } from './BracketActions';
import { BracketBoard } from './BracketBoard';
import { FooterNote } from './FooterNote';
import { Header } from './Header';
import { Legend } from './Legend';
import { StatusBar } from './StatusBar';

export const BracketContent: FC<{
  yearData: KnockoutYearData;
  year: number;
  tournament: TournamentSlug;
}> = ({ yearData, year, tournament }) => {
  const { teams, bracket, predetermined } = yearData;
  const bracketRef = useRef<HTMLDivElement>(null);
  const captureRef = useRef<HTMLDivElement>(null);

  const root = useMemo(() => {
    resetMatchIdCounter();
    const tree = buildTree(bracket);
    const leaves = getLeaves(tree);
    leaves.forEach((leaf, i) => {
      leaf.angle = -90 + rotation(leaves.length) + i * (360 / leaves.length);
      leaf.angleIndex = i;
    });
    computeAngles(tree);
    return tree;
  }, []);

  const allNodes = useMemo(() => collectNodes(root), [root]);
  const parentMap = useMemo(() => buildParentMap(root), [root]);
  const allMatches = useMemo(() => getAllMatches(root), [root]);

  const initialWinners = useMemo(() => {
    const w: Record<string, string> = {};
    for (const m of allMatches) {
      const resolve = (k: BracketNode): string | null =>
        k.kind === 'leaf' ? k.team : (w[k.id] ?? null);
      const [t0, t1] = m.kids.map(resolve);
      if (t0 && t1) {
        const key = [t0, t1].sort().join('_');
        if (predetermined[key]) w[m.id] = predetermined[key];
      }
    }

    let added = true;
    while (added) {
      added = false;
      for (const m of allMatches) {
        if (w[m.id]) continue;
        const resolve = (k: BracketNode): string | null =>
          k.kind === 'leaf' ? k.team : (w[k.id] ?? null);
        const [t0, t1] = m.kids.map(resolve);
        if (t0 && t1) {
          const key = [t0, t1].sort().join('_');
          if (predetermined[key]) {
            w[m.id] = predetermined[key];
            added = true;
          }
        }
      }
    }

    return w;
  }, [allMatches]);

  const [winners, setWinners] =
    useState<Record<string, string>>(initialWinners);

  const resolvedTeam = useCallback(
    (node: BracketNode): string | null => {
      if (node.kind === 'leaf') return node.team;
      return winners[node.id] ?? null;
    },
    [winners]
  );

  const isEliminated = useCallback(
    (node: BracketNode): boolean => {
      const parent = parentMap.get(node);
      if (!parent || !winners[parent.id]) return false;
      return resolvedTeam(node) !== winners[parent.id];
    },
    [parentMap, resolvedTeam, winners]
  );

  const canPick = useCallback(
    (node: BracketNode): boolean => {
      const parent = parentMap.get(node);
      if (!parent) return false;
      const other = parent.kids.find((k) => k !== node)!;
      return resolvedTeam(node) != null && resolvedTeam(other) != null;
    },
    [parentMap, resolvedTeam]
  );

  const isInvited = useCallback(
    (node: BracketNode): boolean => {
      const parent = parentMap.get(node);
      if (!parent) return false;
      return canPick(node) && !winners[parent.id];
    },
    [parentMap, canPick, winners]
  );

  const handlePick = useCallback(
    (node: BracketNode) => {
      const parent = parentMap.get(node);
      if (!parent) return;
      const team = resolvedTeam(node);
      if (!team) return;
      const other = parent.kids.find((k) => k !== node);
      if (other == null || resolvedTeam(other) == null) return;
      setWinners((prev) => {
        const next = { ...prev };
        if (prev[parent.id]) {
          let ancestor = parentMap.get(parent);
          while (ancestor) {
            delete next[ancestor.id];
            ancestor = parentMap.get(ancestor);
          }
        }
        next[parent.id] = team;
        return next;
      });
    },
    [parentMap, resolvedTeam]
  );

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const raw = params.get('w');
    if (!raw) return;
    const restored: Record<string, string> = {};
    for (const pair of raw.split(',')) {
      const [id, team] = pair.split('.');
      if (id && team) restored[id] = team;
    }
    setWinners((prev) => ({ ...prev, ...restored }));
  }, []);

  const [copied, setCopied] = useState(false);

  const handleShare = useCallback(async () => {
    const entries = Object.entries(winners)
      .map(([id, team]) => `${id}.${team}`)
      .join(',');
    const url = `${window.location.origin}${window.location.pathname}?w=${encodeURIComponent(entries)}`;
    if (navigator.share) {
      await navigator.share({ title: 'Knockout Bracket', url });
      return;
    }
    try {
      await navigator.clipboard.writeText(url);
    } catch {
      const el = document.createElement('input');
      el.value = url;
      document.body.appendChild(el);
      el.select();
      document.execCommand('copy');
      el.remove();
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }, [winners]);

  const champ = resolvedTeam(root);
  const decided = allMatches.filter((m) => winners[m.id]).length;
  const total = allMatches.length;
  const progress = (decided / total) * 100;

  const frontier = allMatches.filter(
    (m) => !winners[m.id] && m.kids.every((k) => resolvedTeam(k) != null)
  );
  const currentLevel = frontier.length
    ? Math.min(...frontier.map((m) => m.level))
    : null;

  return (
    <>
      <div ref={captureRef}>
        <Header year={year} tournament={tournament} />
        <StatusBar
          champ={champ}
          currentLevel={currentLevel}
          maxLevel={allMatches.reduce((m, x) => Math.max(m, x.level), 0)}
          decided={decided}
          total={total}
          progress={progress}
          teams={teams}
        />

        <BracketBoard
          root={root}
          winners={winners}
          allNodes={allNodes}
          teams={teams}
          resolvedTeam={resolvedTeam}
          isEliminated={isEliminated}
          canPick={canPick}
          isInvited={isInvited}
          handlePick={handlePick}
          champ={champ}
          bracketRef={bracketRef}
        />
      </div>

      <BracketActions
        onReset={() => setWinners({})}
        onDownload={() =>
          download({
            ref: captureRef,
            output: 'knockout-bracket',
            square: true,
            backgroundColor: '#09090b',
          })
        }
        onShare={handleShare}
        copied={copied}
      />

      <Legend />
      <FooterNote />
    </>
  );
};
BracketContent.displayName = 'BracketContent';
