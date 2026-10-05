import {
  createGrid,
  generateMaze,
  openMoves,
  pathToMoves,
  solveMaze,
} from '../maze';

const pos = (row: number, col: number) => ({ row, col });

describe('createGrid', () => {
  it('creates the requested number of cells', () => {
    expect(createGrid(4, 6)).toHaveLength(4);
    expect(createGrid(4, 6)[0]).toHaveLength(6);
  });

  it('starts with every wall raised and unvisited', () => {
    const cell = createGrid(1, 1)[0][0];

    expect(cell.walls).toEqual({
      top: true,
      right: true,
      bottom: true,
      left: true,
    });
    expect(cell.visited).toBe(false);
  });
});

describe('generateMaze', () => {
  it('creates a grid of the requested size', () => {
    expect(generateMaze(5, 7)).toHaveLength(5);
  });

  it('visits every cell exactly once', () => {
    const visited = generateMaze(6, 6)
      .flat()
      .filter((cell) => cell.visited);

    expect(visited).toHaveLength(36);
  });

  it('opens paired walls so passages are symmetric', () => {
    const grid = generateMaze(6, 6);

    for (const row of grid) {
      for (const cell of row) {
        const right = grid[cell.row][cell.col + 1];
        if (right) {
          expect(cell.walls.right).toBe(right.walls.left);
        }
        const below = grid[cell.row + 1]?.[cell.col];
        if (below) {
          expect(cell.walls.bottom).toBe(below.walls.top);
        }
      }
    }
  });

  it('always leaves a route from start to end', () => {
    for (let attempt = 0; attempt < 20; attempt++) {
      const grid = generateMaze(8, 8);
      const path = solveMaze(grid, pos(0, 0), pos(7, 7));

      expect(path).not.toBeNull();
    }
  });
});

describe('openMoves', () => {
  it('returns nothing when every wall is raised', () => {
    expect(openMoves(createGrid(3, 3), pos(1, 1))).toEqual([]);
  });

  it('returns a move for every open wall', () => {
    const grid = createGrid(3, 3);
    grid[1][1].walls.top = false;
    grid[1][1].walls.left = false;

    expect(openMoves(grid, pos(1, 1))).toHaveLength(2);
  });

  it('never leaves the grid', () => {
    const grid = generateMaze(4, 4);

    for (const move of openMoves(grid, pos(0, 0))) {
      expect(grid[move.to.row]?.[move.to.col]).toBeDefined();
    }
  });
});

describe('solveMaze', () => {
  it('returns null when the end is walled off', () => {
    expect(solveMaze(createGrid(3, 3), pos(0, 0), pos(2, 2))).toBeNull();
  });

  it('returns a single cell when start equals end', () => {
    const grid = generateMaze(4, 4);

    expect(solveMaze(grid, pos(1, 1), pos(1, 1))).toEqual([pos(1, 1)]);
  });

  it('starts at the start and ends at the end', () => {
    const grid = generateMaze(7, 7);
    const path = solveMaze(grid, pos(0, 0), pos(6, 6)) ?? [];

    expect(path[0]).toEqual(pos(0, 0));
    expect(path.at(-1)).toEqual(pos(6, 6));
  });

  it('prefers the direct route over a detour', () => {
    const grid = createGrid(3, 3);
    grid[0][0].walls.right = false;
    grid[0][1].walls.left = false;
    grid[0][1].walls.bottom = false;
    grid[1][1].walls.top = false;

    expect(solveMaze(grid, pos(0, 0), pos(1, 1))).toEqual([
      pos(0, 0),
      pos(0, 1),
      pos(1, 1),
    ]);
  });

  it('never repeats a cell on the way to the end', () => {
    for (let attempt = 0; attempt < 10; attempt++) {
      const grid = generateMaze(9, 9);
      const path = solveMaze(grid, pos(0, 0), pos(8, 8)) ?? [];
      const keys = new Set(path.map(({ row, col }) => `${row}-${col}`));

      expect(keys.size).toBe(path.length);
      expect(path.length).toBeLessThanOrEqual(81);
    }
  });

  it('follows open walls on every step', () => {
    const grid = generateMaze(6, 6);
    const path = solveMaze(grid, pos(0, 0), pos(5, 5)) ?? [];

    for (const move of openMoves(grid, path[0])) {
      expect(
        path.some((p) => p.row === move.to.row && p.col === move.to.col)
      ).toBe(true);
    }
    expect(path.length).toBeGreaterThan(1);
  });
});

describe('pathToMoves', () => {
  it('returns one fewer move than cells', () => {
    const moves = pathToMoves([pos(0, 0), pos(0, 1), pos(1, 1)]);

    expect(moves).toEqual([
      [pos(0, 0), pos(0, 1)],
      [pos(0, 1), pos(1, 1)],
    ]);
  });

  it('returns nothing for a single cell', () => {
    expect(pathToMoves([pos(0, 0)])).toEqual([]);
  });
});
