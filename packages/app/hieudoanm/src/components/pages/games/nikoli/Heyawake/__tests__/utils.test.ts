import { SIZE, generatePuzzle, checkWin } from '../utils';
import { Grid } from '../types';

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
    it('returns false for all-unshaded grid with clues', () => {
      const { grid, rooms } = generatePuzzle();
      expect(checkWin(grid, rooms)).toBe(false);
    });
  });
});
