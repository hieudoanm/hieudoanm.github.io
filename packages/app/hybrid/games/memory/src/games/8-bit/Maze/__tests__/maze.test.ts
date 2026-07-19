import { createGrid, generateMaze, solveMaze } from '../maze';

describe('createGrid', () => {
  it('creates a grid with correct dimensions', () => {
    const grid = createGrid(3, 4);
    expect(grid.length).toBe(3);
    expect(grid[0].length).toBe(4);
  });

  it('initializes all cells with walls and unvisited', () => {
    const grid = createGrid(2, 2);
    for (const row of grid) {
      for (const cell of row) {
        expect(cell.walls).toEqual({
          top: true,
          right: true,
          bottom: true,
          left: true,
        });
        expect(cell.visited).toBe(false);
      }
    }
  });

  it('sets correct row and col on each cell', () => {
    const grid = createGrid(3, 3);
    expect(grid[1][2]).toEqual(expect.objectContaining({ row: 1, col: 2 }));
    expect(grid[0][0]).toEqual(expect.objectContaining({ row: 0, col: 0 }));
  });
});

describe('generateMaze', () => {
  it('visits every cell', () => {
    const grid = generateMaze(5, 5);
    for (const row of grid) {
      for (const cell of row) {
        expect(cell.visited).toBe(true);
      }
    }
  });

  it('creates a perfect maze (removes walls between all connected cells)', () => {
    const grid = generateMaze(5, 5);
    let openWalls = 0;
    for (const row of grid) {
      for (const cell of row) {
        if (!cell.walls.top) openWalls++;
        if (!cell.walls.right) openWalls++;
        if (!cell.walls.bottom) openWalls++;
        if (!cell.walls.left) openWalls++;
      }
    }
    const totalCells = 5 * 5;
    const expectedOpenWalls = (totalCells - 1) * 2;
    expect(openWalls).toBe(expectedOpenWalls);
  });

  it('works for 1x1 grid', () => {
    const grid = generateMaze(1, 1);
    expect(grid.length).toBe(1);
    expect(grid[0][0].visited).toBe(true);
  });
});

describe('solveMaze', () => {
  it('finds a path from start to end', () => {
    const grid = generateMaze(10, 10);
    const path = solveMaze(grid, { row: 0, col: 0 }, { row: 9, col: 9 });
    expect(path).not.toBeNull();
    expect(path![0]).toEqual({ row: 0, col: 0 });
    expect(path![path!.length - 1]).toEqual({ row: 9, col: 9 });
  });

  it('returns a single cell path when start equals end', () => {
    const grid = generateMaze(5, 5);
    const path = solveMaze(grid, { row: 2, col: 2 }, { row: 2, col: 2 });
    expect(path).toEqual([{ row: 2, col: 2 }]);
  });

  it('returns null when no path exists (impossible with perfect maze, but tests logic)', () => {
    const grid = createGrid(3, 3);
    const path = solveMaze(grid, { row: 0, col: 0 }, { row: 2, col: 2 });
    expect(path).toBeNull();
  });

  it('path only uses valid moves through open walls', () => {
    const grid = generateMaze(8, 8);
    const path = solveMaze(grid, { row: 0, col: 0 }, { row: 7, col: 7 });
    expect(path).not.toBeNull();

    for (let i = 1; i < path!.length; i++) {
      const prev = path![i - 1];
      const curr = path![i];
      const dr = curr.row - prev.row;
      const dc = curr.col - prev.col;

      const isAdjacent =
        (Math.abs(dr) === 1 && dc === 0) || (dr === 0 && Math.abs(dc) === 1);
      expect(isAdjacent).toBe(true);
    }
  });
});
