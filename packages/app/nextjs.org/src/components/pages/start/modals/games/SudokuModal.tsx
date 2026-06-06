import { ModalWrapper } from '@hieudoanm.github.io/components/atoms/ModalWrapper';
import { FC, useCallback, useEffect, useMemo, useRef, useState } from 'react';

type Size = 4 | 9;
type Grid = number[][];

const BOX_ROWS: Record<Size, number> = { 4: 2, 9: 3 };
const BOX_COLS: Record<Size, number> = { 4: 2, 9: 3 };
const EMPTY = 0;

const shuffle = <T,>(arr: T[]): T[] => {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
};

const isValid = (
  grid: Grid,
  size: Size,
  row: number,
  col: number,
  num: number
): boolean => {
  for (let i = 0; i < size; i++) {
    if (grid[row][i] === num) return false;
    if (grid[i][col] === num) return false;
  }
  const br = BOX_ROWS[size];
  const bc = BOX_COLS[size];
  const sr = Math.floor(row / br) * br;
  const sc = Math.floor(col / bc) * bc;
  for (let r = sr; r < sr + br; r++) {
    for (let c = sc; c < sc + bc; c++) {
      if (grid[r][c] === num) return false;
    }
  }
  return true;
};

const solve = (grid: Grid, size: Size): boolean => {
  for (let r = 0; r < size; r++) {
    for (let c = 0; c < size; c++) {
      if (grid[r][c] === EMPTY) {
        for (const num of shuffle(
          Array.from({ length: size }, (_, i) => i + 1)
        )) {
          if (isValid(grid, size, r, c, num)) {
            grid[r][c] = num;
            if (solve(grid, size)) return true;
            grid[r][c] = EMPTY;
          }
        }
        return false;
      }
    }
  }
  return true;
};

const countSolutions = (grid: Grid, size: Size, limit: number): number => {
  let count = 0;
  const search = (g: Grid): void => {
    if (count >= limit) return;
    for (let r = 0; r < size; r++) {
      for (let c = 0; c < size; c++) {
        if (g[r][c] === EMPTY) {
          for (let n = 1; n <= size; n++) {
            if (isValid(g, size, r, c, n)) {
              g[r][c] = n;
              search(g);
              g[r][c] = EMPTY;
            }
          }
          return;
        }
      }
    }
    count++;
  };
  search(grid.map((r) => [...r]));
  return count;
};

const generatePuzzle = (
  size: Size,
  difficulty: number
): { puzzle: Grid; solution: Grid } => {
  const solution = Array.from({ length: size }, () => Array(size).fill(EMPTY));
  solve(solution, size);

  const puzzle = solution.map((r) => [...r]);
  const cells: [number, number][] = [];
  for (let r = 0; r < size; r++) {
    for (let c = 0; c < size; c++) {
      cells.push([r, c]);
    }
  }
  const shuffled = shuffle(cells);
  let removed = 0;
  const target = Math.floor((size * size * difficulty) / 100);

  for (const [r, c] of shuffled) {
    if (removed >= target) break;
    const backup = puzzle[r][c];
    puzzle[r][c] = EMPTY;
    if (countSolutions(puzzle, size, 2) === 1) {
      removed++;
    } else {
      puzzle[r][c] = backup;
    }
  }

  return { puzzle, solution };
};

const createEmptyGrid = (size: Size): Grid =>
  Array.from({ length: size }, () => Array(size).fill(EMPTY));

const formatTime = (s: number): string => {
  const m = Math.floor(s / 60);
  const sec = s % 60;
  return `${m}:${String(sec).padStart(2, '0')}`;
};

export const SudokuModal: FC<{ onClose: () => void }> = ({ onClose }) => {
  const [size, setSize] = useState<Size>(9);
  const [difficulty, setDifficulty] = useState(45);
  const [puzzle, setPuzzle] = useState<Grid>(createEmptyGrid(9));
  const [solution, setSolution] = useState<Grid>(createEmptyGrid(9));
  const [playerGrid, setPlayerGrid] = useState<Grid>(createEmptyGrid(9));
  const [givens, setGivens] = useState<Set<string>>(new Set());
  const [selected, setSelected] = useState<[number, number] | null>(null);
  const [noteMode, setNoteMode] = useState(false);
  const [notes, setNotes] = useState<Map<string, Set<number>>>(new Map());
  const [timer, setTimer] = useState(0);
  const [solved, setSolved] = useState(false);
  const [revealed, setRevealed] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [mistakes, setMistakes] = useState<Set<string>>(new Set());
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const sizeStr = useMemo(() => `${size}×${size}`, [size]);

  const newGame = useCallback(
    (s?: Size, d?: number) => {
      const ns = s ?? size;
      const nd = d ?? difficulty;
      const { puzzle: pz, solution: sol } = generatePuzzle(ns, nd);
      setSize(ns);
      setDifficulty(nd);
      setPuzzle(pz);
      setSolution(sol);
      setPlayerGrid(pz.map((r) => [...r]));
      const g = new Set<string>();
      for (let r = 0; r < ns; r++) {
        for (let c = 0; c < ns; c++) {
          if (pz[r][c] !== EMPTY) g.add(`${r},${c}`);
        }
      }
      setGivens(g);
      setNotes(new Map());
      setSelected(null);
      setSolved(false);
      setRevealed(false);
      setMessage(null);
      setMistakes(new Set());
      setTimer(0);
      if (timerRef.current) clearInterval(timerRef.current);
      timerRef.current = setInterval(() => setTimer((t) => t + 1), 1000);
      containerRef.current?.focus();
    },
    [size, difficulty]
  );

  useEffect(() => {
    newGame();
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const placeNumber = useCallback(
    (num: number) => {
      if (!selected || solved) return;
      const [r, c] = selected;
      if (givens.has(`${r},${c}`)) return;

      setPlayerGrid((prev) => {
        const next = prev.map((row) => [...row]);
        if (noteMode) {
          const key = `${r},${c}`;
          setNotes((prevNotes) => {
            const nextNotes = new Map(prevNotes);
            const existing = nextNotes.get(key) ?? new Set();
            if (existing.has(num)) {
              existing.delete(num);
              if (existing.size === 0) nextNotes.delete(key);
              else nextNotes.set(key, new Set(existing));
            } else {
              nextNotes.set(key, new Set([...existing, num]));
            }
            return nextNotes;
          });
          return prev;
        }
        next[r][c] = next[r][c] === num ? EMPTY : num;
        return next;
      });
      setMistakes((prev) => {
        const next = new Set(prev);
        next.delete(`${r},${c}`);
        return next;
      });
    },
    [selected, solved, givens, noteMode]
  );

  const erase = useCallback(() => {
    if (!selected || solved) return;
    const [r, c] = selected;
    if (givens.has(`${r},${c}`)) return;
    const key = `${r},${c}`;
    setPlayerGrid((prev) => {
      const next = prev.map((row) => [...row]);
      next[r][c] = EMPTY;
      return next;
    });
    setNotes((prev) => {
      const next = new Map(prev);
      next.delete(key);
      return next;
    });
    setMistakes((prev) => {
      const next = new Set(prev);
      next.delete(key);
      return next;
    });
  }, [selected, solved, givens]);

  const check = useCallback(() => {
    let correct = true;
    const newMistakes = new Set<string>();
    for (let r = 0; r < size; r++) {
      for (let c = 0; c < size; c++) {
        if (playerGrid[r][c] !== solution[r][c]) {
          if (playerGrid[r][c] !== EMPTY) {
            newMistakes.add(`${r},${c}`);
          }
          correct = false;
        }
      }
    }
    setMistakes(newMistakes);
    if (correct) {
      setSolved(true);
      setMessage('Puzzle solved!');
      if (timerRef.current) clearInterval(timerRef.current);
    } else {
      setMessage(
        newMistakes.size > 0 ? 'Some cells are wrong' : 'Fill all cells first'
      );
    }
  }, [playerGrid, solution, size]);

  const reveal = useCallback(() => {
    setRevealed(true);
    setPlayerGrid(solution.map((r) => [...r]));
    setSolved(true);
    if (timerRef.current) clearInterval(timerRef.current);
    setMessage('Solution revealed');
  }, [solution]);

  const hint = useCallback(() => {
    if (!selected || solved || revealed) return;
    const [r, c] = selected;
    if (givens.has(`${r},${c}`) || playerGrid[r][c] === solution[r][c]) return;
    setPlayerGrid((prev) => {
      const next = prev.map((row) => [...row]);
      next[r][c] = solution[r][c];
      return next;
    });
  }, [selected, solved, revealed, givens, playerGrid, solution]);

  const onKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
        return;
      }
      if (e.key === 'n' || e.key === 'N') {
        newGame();
        return;
      }
      const num = Number(e.key);
      if (num >= 1 && num <= size) {
        placeNumber(num);
        return;
      }
      if (e.key === 'Backspace' || e.key === 'Delete') {
        erase();
        return;
      }
      if (e.key === 'ArrowUp' && selected) {
        e.preventDefault();
        setSelected((prev) => {
          if (!prev) return prev;
          const [r, c] = prev;
          return [(r - 1 + size) % size, c];
        });
      }
      if (e.key === 'ArrowDown' && selected) {
        e.preventDefault();
        setSelected((prev) => {
          if (!prev) return prev;
          const [r, c] = prev;
          return [(r + 1) % size, c];
        });
      }
      if (e.key === 'ArrowLeft' && selected) {
        e.preventDefault();
        setSelected((prev) => {
          if (!prev) return prev;
          const [r, c] = prev;
          return [r, (c - 1 + size) % size];
        });
      }
      if (e.key === 'ArrowRight' && selected) {
        e.preventDefault();
        setSelected((prev) => {
          if (!prev) return prev;
          const [r, c] = prev;
          return [r, (c + 1) % size];
        });
      }
    },
    [onClose, size, placeNumber, erase, newGame, selected]
  );

  const getNoteDisplay = (r: number, c: number): number[] => {
    const key = `${r},${c}`;
    return notes.has(key) ? Array.from(notes.get(key)!).sort() : [];
  };

  const isSingle = size === 4;

  return (
    <ModalWrapper onClose={onClose} title="Sudoku" size="max-w-3xl" fullHeight>
      <div
        ref={containerRef}
        tabIndex={0}
        onKeyDown={onKeyDown}
        className="flex flex-1 flex-col gap-3 overflow-y-auto p-4 outline-none">
        {/* Controls */}
        <div className="grid grid-cols-2 gap-x-2">
          <select
            className="select select-bordered select-sm"
            value={size}
            onChange={(e) =>
              newGame(Number(e.target.value) as Size, difficulty)
            }>
            <option value={4}>4×4</option>
            <option value={9}>9×9</option>
          </select>
          <select
            className="select select-bordered select-sm"
            value={difficulty}
            onChange={(e) => newGame(size, Number(e.target.value))}>
            <option value={30}>Easy</option>
            <option value={45}>Medium</option>
            <option value={55}>Hard</option>
          </select>
        </div>
        <div className="flex items-center justify-center">
          <span className="font-mono tabular-nums opacity-60">
            {formatTime(timer)}
          </span>
        </div>

        {/* Grid */}
        <div className="w-full">
          <div className="border-base-content/20 overflow-hidden rounded-lg border-2">
            <div
              className="grid w-full select-none"
              style={{
                gridTemplateColumns: `repeat(${size}, minmax(0, 1fr))`,
                aspectRatio: '1',
              }}>
              {Array.from({ length: size }, (_, r) =>
                Array.from({ length: size }, (_, c) => {
                  const val = playerGrid[r][c];
                  const isGiven = givens.has(`${r},${c}`);
                  const isSelected = selected?.[0] === r && selected?.[1] === c;
                  const isSameNum =
                    selected &&
                    !isSelected &&
                    val !== EMPTY &&
                    val === playerGrid[selected[0]]?.[selected[1]];
                  const isMistake = mistakes.has(`${r},${c}`);
                  const noteDisplay = getNoteDisplay(r, c);
                  const isRevealed = revealed && isGiven;
                  const br = BOX_ROWS[size];
                  const bc = BOX_COLS[size];
                  const borderRight = (c + 1) % bc === 0 && c + 1 < size;
                  const borderBottom = (r + 1) % br === 0 && r + 1 < size;

                  return (
                    <div
                      key={`${r}-${c}`}
                      onClick={() => setSelected([r, c])}
                      className={`relative flex cursor-pointer items-center justify-center text-lg font-bold transition-colors ${isSelected ? 'bg-primary/20' : isSameNum ? 'bg-primary/10' : ''} ${isMistake ? 'bg-error/15' : ''} ${borderRight ? 'border-r-base-content/20 border-r-2' : ''} ${borderBottom ? 'border-b-base-content/20 border-b-2' : ''} ${c === 0 ? 'border-l-0' : ''} ${r === 0 ? 'border-t-0' : ''} border-base-200 text-base-content border`}
                      style={{ aspectRatio: '1' }}>
                      {noteMode &&
                      !isGiven &&
                      val === EMPTY &&
                      noteDisplay.length > 0 ? (
                        <div
                          className="grid h-full w-full place-items-center p-0.5"
                          style={{
                            gridTemplateColumns: `repeat(${Math.ceil(Math.sqrt(size))}, minmax(0, 1fr))`,
                            gridTemplateRows: `repeat(${Math.ceil(Math.sqrt(size))}, minmax(0, 1fr))`,
                          }}>
                          {Array.from({ length: size }, (_, n) => (
                            <span
                              key={n}
                              className={`flex items-center justify-center text-[8px] leading-none ${
                                noteDisplay.includes(n + 1)
                                  ? 'text-base-content/60 font-bold'
                                  : 'text-transparent'
                              }`}>
                              {n + 1}
                            </span>
                          ))}
                        </div>
                      ) : (
                        <span
                          className={`leading-none ${
                            isGiven || isRevealed
                              ? ''
                              : 'text-primary font-black'
                          }`}
                          style={{ fontSize: isSingle ? '1.5rem' : '1.25rem' }}>
                          {val !== EMPTY ? val : ''}
                        </span>
                      )}
                    </div>
                  );
                })
              )}
            </div>
          </div>
        </div>

        {/* Message */}
        {message && (
          <div
            className={`flex items-center justify-between rounded-lg px-3 py-1.5 text-sm ${
              solved
                ? 'bg-success/15 text-success'
                : 'bg-warning/15 text-warning'
            }`}>
            <span>{message}</span>
            <button
              onClick={() => setMessage(null)}
              className="btn btn-ghost btn-xs btn-square opacity-60 hover:opacity-100">
              ✕
            </button>
          </div>
        )}

        {/* Number pad */}
        <div className="flex flex-wrap justify-center gap-1">
          <button
            onClick={() => setNoteMode(!noteMode)}
            className={`btn btn-xs ${noteMode ? 'btn-accent' : 'btn-ghost'}`}>
            Note
          </button>
          <div className="join">
            {Array.from({ length: size }, (_, i) => (
              <button
                key={i}
                onClick={() => placeNumber(i + 1)}
                className="btn btn-outline btn-sm join-item px-3">
                {i + 1}
              </button>
            ))}
          </div>
          <button
            onClick={erase}
            className="btn btn-ghost btn-sm"
            disabled={!selected}>
            ✕
          </button>
        </div>

        {/* Actions */}
        <div className="flex flex-wrap justify-center gap-2">
          <button onClick={() => newGame()} className="btn btn-primary btn-sm">
            New Game
          </button>
          <button
            onClick={check}
            className="btn btn-secondary btn-sm"
            disabled={solved || revealed}>
            Check
          </button>
          <button
            onClick={hint}
            className="btn btn-sm"
            disabled={!selected || solved || revealed}>
            Hint
          </button>
          <button
            onClick={reveal}
            className="btn btn-ghost btn-sm"
            disabled={solved}>
            Reveal
          </button>
        </div>

        <p className="text-center text-xs opacity-40">
          Arrow keys navigate · 1–{size} place · Del erase · N new · Esc close
        </p>
      </div>
    </ModalWrapper>
  );
};
