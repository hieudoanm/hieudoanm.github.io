import { SIZE, generatePuzzle, checkWin } from '../utils';
import { Grid, Room } from '../types';

describe('Heyawake utils', () => {
  describe('SIZE', () => {
    it('is 6', () => {
      expect(SIZE).toBe(6);
    });
  });

  describe('generatePuzzle', () => {
    beforeEach(() => {
      jest.spyOn(Math, 'random').mockReturnValue(0.5);
    });

    afterEach(() => {
      jest.restoreAllMocks();
    });

    it('returns grid and rooms', () => {
      const { grid, rooms } = generatePuzzle();
      expect(grid).toHaveLength(SIZE);
      expect(rooms.length).toBeGreaterThan(0);
    });

    it('grid has correct dimensions', () => {
      const { grid } = generatePuzzle();
      for (const row of grid) expect(row).toHaveLength(SIZE);
    });

    it('each room has cells and a clue', () => {
      const { rooms } = generatePuzzle();
      for (const room of rooms) {
        expect(room.cells.length).toBeGreaterThan(0);
        expect(typeof room.clue).toBe('number');
      }
    });

    it('all cells have a room assignment', () => {
      const { grid } = generatePuzzle();
      for (const row of grid) {
        for (const cell of row) {
          expect(cell.roomId).toBeGreaterThanOrEqual(0);
        }
      }
    });
  });

  describe('checkWin', () => {
    const makeCell = (
      shaded: boolean
    ): { shaded: boolean; roomId: number } => ({
      shaded,
      roomId: 0,
    });

    it('returns false for all-unshaded grid with clues', () => {
      const { grid, rooms } = generatePuzzle();
      expect(checkWin(grid, rooms)).toBe(false);
    });

    it('returns false when room shaded count mismatches clue', () => {
      const grid: Grid = Array.from({ length: SIZE }, () =>
        Array.from({ length: SIZE }, () => makeCell(false))
      );
      const rooms: Room[] = [
        {
          id: 0,
          cells: [
            [0, 0],
            [0, 1],
          ],
          clue: 2,
        },
      ];
      expect(checkWin(grid, rooms)).toBe(false);
    });

    it('returns false when adjacent cells are shaded', () => {
      const grid: Grid = Array.from({ length: SIZE }, () =>
        Array.from({ length: SIZE }, () => makeCell(false))
      );
      grid[0][0] = makeCell(true);
      grid[0][1] = makeCell(true);
      const rooms: Room[] = [
        {
          id: 0,
          cells: [
            [0, 0],
            [0, 1],
          ],
          clue: 2,
        },
      ];
      expect(checkWin(grid, rooms)).toBe(false);
    });

    it('returns false when white cells are disconnected', () => {
      const grid: Grid = Array.from({ length: SIZE }, () =>
        Array.from({ length: SIZE }, () => makeCell(true))
      );
      grid[0][0] = makeCell(false);
      grid[5][5] = makeCell(false);
      const rooms: Room[] = [
        { id: 0, cells: [[0, 0]], clue: 0 },
        { id: 1, cells: [[5, 5]], clue: 0 },
      ];
      expect(checkWin(grid, rooms)).toBe(false);
    });

    it('returns false when 2x2 block of white cells exists', () => {
      const grid: Grid = Array.from({ length: SIZE }, () =>
        Array.from({ length: SIZE }, () => makeCell(true))
      );
      grid[0][0] = makeCell(false);
      grid[0][1] = makeCell(false);
      grid[1][0] = makeCell(false);
      grid[1][1] = makeCell(false);
      const rooms: Room[] = [
        { id: 0, cells: [[0, 0]], clue: 0 },
        { id: 1, cells: [[0, 1]], clue: 0 },
        { id: 2, cells: [[1, 0]], clue: 0 },
        { id: 3, cells: [[1, 1]], clue: 0 },
      ];
      expect(checkWin(grid, rooms)).toBe(false);
    });

    it('returns false when all cells are shaded', () => {
      const grid: Grid = Array.from({ length: SIZE }, () =>
        Array.from({ length: SIZE }, () => makeCell(true))
      );
      const rooms: Room[] = [
        {
          id: 0,
          cells: [
            [0, 0],
            [0, 1],
          ],
          clue: 2,
        },
      ];
      expect(checkWin(grid, rooms)).toBe(false);
    });

    it('returns true for valid winning grid', () => {
      const grid: Grid = Array.from({ length: SIZE }, () =>
        Array.from({ length: SIZE }, () => makeCell(false))
      );
      const shadedPositions: [number, number][] = [
        [0, 1], [0, 3], [0, 5],
        [2, 1], [2, 3], [2, 5],
        [3, 2],
        [4, 1], [4, 4],
        [5, 3],
      ];
      for (const [r, c] of shadedPositions) grid[r][c] = makeCell(true);
      const rooms: Room[] = shadedPositions.map(([r, c], i) => ({
        id: i,
        cells: [[r, c]],
        clue: 1,
      }));
      expect(checkWin(grid, rooms)).toBe(true);
    });

    it('returns false when room clue is null and shaded count wrong', () => {
      const grid: Grid = Array.from({ length: SIZE }, () =>
        Array.from({ length: SIZE }, () => makeCell(false))
      );
      grid[0][0] = makeCell(true);
      const rooms: Room[] = [
        { id: 0, cells: [[0, 0], [0, 1]], clue: null },
      ];
      expect(checkWin(grid, rooms)).toBe(false);
    });

    it('returns true when all rooms have clue 0 and no shaded cells match', () => {
      const grid: Grid = Array.from({ length: SIZE }, () =>
        Array.from({ length: SIZE }, () => makeCell(false))
      );
      grid[0][1] = makeCell(true);
      grid[0][3] = makeCell(true);
      grid[0][5] = makeCell(true);
      grid[2][1] = makeCell(true);
      grid[2][3] = makeCell(true);
      grid[2][5] = makeCell(true);
      grid[3][2] = makeCell(true);
      grid[4][1] = makeCell(true);
      grid[4][4] = makeCell(true);
      grid[5][3] = makeCell(true);
      const rooms: Room[] = [
        { id: 0, cells: [[0, 1]], clue: 1 },
        { id: 1, cells: [[0, 3]], clue: 1 },
        { id: 2, cells: [[0, 5]], clue: 1 },
        { id: 3, cells: [[2, 1]], clue: 1 },
        { id: 4, cells: [[2, 3]], clue: 1 },
        { id: 5, cells: [[2, 5]], clue: 1 },
        { id: 6, cells: [[3, 2]], clue: 1 },
        { id: 7, cells: [[4, 1]], clue: 1 },
        { id: 8, cells: [[4, 4]], clue: 1 },
        { id: 9, cells: [[5, 3]], clue: 1 },
      ];
      expect(checkWin(grid, rooms)).toBe(true);
    });

    it('generatePuzzle with Math.random returning 0', () => {
      jest.restoreAllMocks();
      jest.spyOn(Math, 'random').mockReturnValue(0);
      const { grid, rooms } = generatePuzzle();
      expect(grid).toHaveLength(SIZE);
      expect(rooms.length).toBeGreaterThan(0);
      for (const row of grid) {
        for (const cell of row) {
          expect(cell.roomId).toBeGreaterThanOrEqual(0);
        }
      }
    });

    it('generatePuzzle with Math.random returning 0.9', () => {
      jest.restoreAllMocks();
      jest.spyOn(Math, 'random').mockReturnValue(0.9);
      const { grid, rooms } = generatePuzzle();
      expect(grid).toHaveLength(SIZE);
      expect(rooms.length).toBeGreaterThan(0);
    });
  });
});
