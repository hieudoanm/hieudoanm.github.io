import { useCallback, useEffect, useRef, useState } from 'react';
import { Clue, Point, PlacedRegion, Region } from './types';
import {
  ROWS,
  COLS,
  generateRegions,
  placeClues,
  validateRegion,
} from './utils';

export const useShikaku = () => {
  const [clues, setClues] = useState<Clue[]>([]);
  const [solution, setSolution] = useState<Region[]>([]);
  const [placed, setPlaced] = useState<PlacedRegion[]>([]);
  const [selectedClue, setSelectedClue] = useState<Clue | null>(null);
  const [assigned, setAssigned] = useState<boolean[][]>([]);
  const [wrongFlash, setWrongFlash] = useState<Point[] | null>(null);
  const [autoSolving, setAutoSolving] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const assignedRef = useRef(assigned);

  useEffect(() => {
    assignedRef.current = assigned;
  }, [assigned]);

  const initBoard = useCallback(() => {
    if (timerRef.current) clearTimeout(timerRef.current);
    const regions = generateRegions(ROWS, COLS);
    const c = placeClues(regions);
    setClues(c);
    setSolution(regions);
    setPlaced([]);
    setSelectedClue(null);
    const empty = Array.from({ length: ROWS }, () => Array(COLS).fill(false));
    setAssigned(empty);
    assignedRef.current = empty;
    setWrongFlash(null);
    setAutoSolving(false);
  }, []);

  useEffect(() => {
    initBoard();
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [initBoard]);

  const isComplete = clues.length > 0 && placed.length === clues.length;

  const placeRegion = useCallback(
    (region: Region) => {
      const clue = clues.find(
        (c) =>
          c.row === region.row + Math.floor(region.height / 2) &&
          c.col === region.col + Math.floor(region.width / 2)
      );
      if (!clue) return;

      const cells: Point[] = [];
      const newAssigned = assigned.map((r) => [...r]);
      for (let r = region.row; r < region.row + region.height; r++) {
        for (let c = region.col; c < region.col + region.width; c++) {
          newAssigned[r][c] = true;
          cells.push([r, c]);
        }
      }

      setAssigned(newAssigned);
      setPlaced((prev) => [...prev, { id: prev.length, cells, clue }]);
    },
    [clues, assigned]
  );

  const undo = useCallback(() => {
    if (placed.length === 0 || autoSolving) return;
    const last = placed[placed.length - 1];
    const newAssigned = assigned.map((r) => [...r]);
    for (const [r, c] of last.cells) {
      newAssigned[r][c] = false;
    }
    setAssigned(newAssigned);
    setPlaced((prev) => prev.slice(0, -1));
  }, [placed, assigned, autoSolving]);

  const stopAutoSolve = useCallback(() => {
    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = null;
    setAutoSolving(false);
  }, []);

  const autoSolve = useCallback(() => {
    if (autoSolving) {
      stopAutoSolve();
      return;
    }
    if (isComplete) return;

    const remaining = solution.filter(
      (sol) =>
        !placed.some(
          (p) =>
            p.clue.row === sol.row + Math.floor(sol.height / 2) &&
            p.clue.col === sol.col + Math.floor(sol.width / 2)
        )
    );

    if (remaining.length === 0) return;

    setAutoSolving(true);
    let idx = 0;

    const play = () => {
      if (idx >= remaining.length) {
        setAutoSolving(false);
        return;
      }
      timerRef.current = setTimeout(() => {
        const region = remaining[idx];
        const clue = clues.find(
          (c) =>
            c.row === region.row + Math.floor(region.height / 2) &&
            c.col === region.col + Math.floor(region.width / 2)
        );
        if (clue) {
          const current = assignedRef.current;
          const cells: Point[] = [];
          const newAssigned = current.map((r) => [...r]);
          for (let r = region.row; r < region.row + region.height; r++) {
            for (let c = region.col; c < region.col + region.width; c++) {
              newAssigned[r][c] = true;
              cells.push([r, c]);
            }
          }
          setAssigned(newAssigned);
          setPlaced((prev) => [...prev, { id: prev.length, cells, clue }]);
        }
        idx++;
        play();
      }, 150);
    };

    play();
  }, [autoSolving, isComplete, solution, placed, clues, stopAutoSolve]);

  const handleCellClick = useCallback(
    (row: number, col: number) => {
      if (isComplete || autoSolving) return;

      const clue = clues.find((c) => c.row === row && c.col === col);
      if (clue && !assigned[row]?.[col]) {
        setSelectedClue(clue);
        return;
      }

      if (!selectedClue || assigned[row]?.[col]) return;

      const result = validateRegion(
        clues,
        [selectedClue.row, selectedClue.col],
        [row, col],
        assigned
      );

      if (result.valid && result.clue) {
        const minR = Math.min(selectedClue.row, row);
        const maxR = Math.max(selectedClue.row, row);
        const minC = Math.min(selectedClue.col, col);
        const maxC = Math.max(selectedClue.col, col);

        const cells: Point[] = [];
        const newAssigned = assigned.map((r) => [...r]);
        for (let r = minR; r <= maxR; r++) {
          for (let c = minC; c <= maxC; c++) {
            newAssigned[r][c] = true;
            cells.push([r, c]);
          }
        }

        setAssigned(newAssigned);
        setPlaced((prev) => [
          ...prev,
          { id: prev.length, cells, clue: result.clue! },
        ]);
        setSelectedClue(null);
      } else {
        setWrongFlash([
          [selectedClue.row, selectedClue.col],
          [row, col],
        ]);
        setTimeout(() => setWrongFlash(null), 400);
      }
    },
    [clues, selectedClue, assigned, isComplete, autoSolving]
  );

  return {
    clues,
    placed,
    selectedClue,
    wrongFlash,
    isComplete,
    autoSolving,
    handleCellClick,
    undo,
    autoSolve,
    newGame: initBoard,
  };
};
