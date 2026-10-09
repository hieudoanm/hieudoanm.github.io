import {
  ROWS,
  COLS,
  getRegionColor,
  generateRegions,
  placeClues,
  getRectangleCells,
  validateRegion,
} from '../utils';
import { Clue, Point } from '../types';

describe('Shikaku utils', () => {
  describe('constants', () => {
    it('ROWS and COLS are 6', () => {
      expect(ROWS).toBe(6);
      expect(COLS).toBe(6);
    });
  });

  describe('getRegionColor', () => {
    it('returns a color string', () => {
      const color = getRegionColor(0);
      expect(typeof color).toBe('string');
      expect(color.length).toBeGreaterThan(0);
    });

    it('wraps around color list', () => {
      const c1 = getRegionColor(0);
      const c2 = getRegionColor(12);
      expect(c1).toBe(c2);
    });
  });

  describe('generateRegions', () => {
    beforeEach(() => {
      jest.spyOn(Math, 'random').mockReturnValue(0.5);
    });

    afterEach(() => {
      jest.restoreAllMocks();
    });

    it('returns non-empty array of regions', () => {
      const regions = generateRegions(ROWS, COLS);
      expect(regions.length).toBeGreaterThan(0);
    });

    it('each region has valid dimensions', () => {
      const regions = generateRegions(ROWS, COLS);
      for (const region of regions) {
        expect(region.width).toBeGreaterThan(0);
        expect(region.height).toBeGreaterThan(0);
        expect(region.row).toBeGreaterThanOrEqual(0);
        expect(region.col).toBeGreaterThanOrEqual(0);
      }
    });

    it('regions have unique ids', () => {
      const regions = generateRegions(ROWS, COLS);
      const ids = regions.map((r) => r.id);
      expect(new Set(ids).size).toBe(ids.length);
    });
  });

  describe('placeClues', () => {
    it('creates one clue per region', () => {
      jest.spyOn(Math, 'random').mockReturnValue(0.5);
      const regions = generateRegions(ROWS, COLS);
      const clues = placeClues(regions);
      expect(clues.length).toBe(regions.length);
      jest.restoreAllMocks();
    });

    it('clue value equals region area', () => {
      jest.spyOn(Math, 'random').mockReturnValue(0.5);
      const regions = generateRegions(ROWS, COLS);
      const clues = placeClues(regions);
      for (let i = 0; i < regions.length; i++) {
        expect(clues[i].value).toBe(regions[i].width * regions[i].height);
      }
      jest.restoreAllMocks();
    });
  });

  describe('getRectangleCells', () => {
    it('returns cells in a rectangle', () => {
      const cells = getRectangleCells([0, 0], [1, 2]);
      expect(cells).toHaveLength(6);
    });

    it('works with reversed coordinates', () => {
      const cells = getRectangleCells([1, 2], [0, 0]);
      expect(cells).toHaveLength(6);
    });

    it('returns single cell for same point', () => {
      const cells = getRectangleCells([2, 3], [2, 3]);
      expect(cells).toHaveLength(1);
    });
  });

  describe('validateRegion', () => {
    it('returns valid for correct rectangle with matching clue', () => {
      const clues: Clue[] = [{ row: 0, col: 0, value: 4 }];
      const assigned = Array.from({ length: ROWS }, () =>
        Array(COLS).fill(false)
      );
      const result = validateRegion(clues, [0, 0], [1, 1], assigned);
      expect(result.valid).toBe(true);
    });

    it('returns invalid when no clue in rectangle', () => {
      const clues: Clue[] = [{ row: 3, col: 3, value: 4 }];
      const assigned = Array.from({ length: ROWS }, () =>
        Array(COLS).fill(false)
      );
      const result = validateRegion(clues, [0, 0], [1, 1], assigned);
      expect(result.valid).toBe(false);
    });

    it('returns invalid when area mismatches clue', () => {
      const clues: Clue[] = [{ row: 0, col: 0, value: 6 }];
      const assigned = Array.from({ length: ROWS }, () =>
        Array(COLS).fill(false)
      );
      const result = validateRegion(clues, [0, 0], [1, 1], assigned);
      expect(result.valid).toBe(false);
    });

    it('returns invalid when cells already assigned', () => {
      const clues: Clue[] = [{ row: 0, col: 0, value: 4 }];
      const assigned = Array.from({ length: ROWS }, () =>
        Array(COLS).fill(false)
      );
      assigned[0][0] = true;
      const result = validateRegion(clues, [0, 0], [1, 1], assigned);
      expect(result.valid).toBe(false);
    });
  });
});
