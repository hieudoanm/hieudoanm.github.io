import { useCallback, useEffect, useMemo, useState } from 'react';
import { createGame, fromSan, getMoves, makeMove, toFen } from '@chess/ts';
import type { Opening } from '@hieudoanm.github.io/data/chess/openings';
import { ecoGroups, ecoOpenings, ecoSubgroups } from '../utils/eco';

export const useEcoData = () => {
  const [group, setGroup] = useState<string>(ecoGroups[0] ?? '');
  const [subgroup, setSubgroup] = useState<string>(
    ecoSubgroups(ecoGroups[0] ?? '')[0] ?? ''
  );
  const [ecoIndex, setEcoIndex] = useState<number>(0);
  const [cursor, setCursor] = useState<number>(0);

  const subgroups = useMemo(() => ecoSubgroups(group), [group]);
  const ecoList = useMemo(
    () => ecoOpenings(group, subgroup),
    [group, subgroup]
  );
  const ecoOpening: Opening | undefined = ecoList[ecoIndex];
  const moves = useMemo(
    () => (ecoOpening ? getMoves(ecoOpening.pgn) : []),
    [ecoOpening]
  );
  const total = moves.length;

  useEffect(() => {
    setCursor(0);
  }, [ecoOpening?.pgn]);

  const ecoFen = useCallback((): string => {
    let state = createGame();
    for (let i = 0; i < cursor; i++) {
      const san = moves[i];
      if (!san) break;
      const move = fromSan(
        san,
        state.board,
        state.turn,
        state.castlingRights,
        state.enPassant
      );
      if (!move) break;
      state = makeMove(state, move);
    }
    return toFen(state);
  }, [cursor, moves]);

  const handleGroupChange = useCallback((g: string) => {
    setGroup(g);
    const subs = ecoSubgroups(g);
    setSubgroup(subs[0] ?? '');
    setEcoIndex(0);
    setCursor(0);
  }, []);

  const handleSubgroupChange = useCallback((s: string) => {
    setSubgroup(s);
    setEcoIndex(0);
    setCursor(0);
  }, []);

  const handleOpeningChange = useCallback((i: number) => {
    setEcoIndex(i);
    setCursor(0);
  }, []);

  const prev = useCallback(() => setCursor((c) => Math.max(0, c - 1)), []);
  const next = useCallback(
    () => setCursor((c) => Math.min(total, c + 1)),
    [total]
  );
  const start = useCallback(() => setCursor(0), []);
  const end = useCallback(() => setCursor(total), [total]);

  return {
    group,
    setGroup,
    subgroup,
    setSubgroup,
    ecoIndex,
    setEcoIndex,
    cursor,
    setCursor,
    subgroups,
    ecoList,
    ecoOpening,
    moves,
    total,
    ecoFen,
    handleGroupChange,
    handleSubgroupChange,
    handleOpeningChange,
    prev,
    next,
    start,
    end,
  };
};
