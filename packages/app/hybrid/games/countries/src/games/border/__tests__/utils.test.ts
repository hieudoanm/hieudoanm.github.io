import { borders } from '../../_shared/borders';
import { countries } from '../../_shared/countries-data';
import {
  buildBorderQuestion,
  isCorrectBorder,
  neighboursOf,
  OPTIONS_COUNT,
  VALID,
} from '../utils';

const NAMES = new Set(countries.map((entry) => entry.name));

describe('border utils', () => {
  it('VALID contains only known countries with at least two neighbours', () => {
    expect(VALID.length).toBeGreaterThan(0);
    for (const name of VALID) {
      expect(NAMES.has(name)).toBe(true);
      expect(borders[name].length).toBeGreaterThanOrEqual(2);
    }
  });

  it('neighboursOf returns the border list or empty for unknown countries', () => {
    expect(neighboursOf('Chile').length).toBeGreaterThan(0);
    expect(neighboursOf('Atlantis')).toEqual([]);
  });

  it('buildBorderQuestion picks a real neighbour as the answer', () => {
    for (let index = 0; index < 20; index += 1) {
      const question = buildBorderQuestion();
      expect(NAMES.has(question.currentName)).toBe(true);
      expect(neighboursOf(question.currentName)).toContain(question.correct);
      expect(question.options).toHaveLength(OPTIONS_COUNT);
      expect(question.options).toContain(question.correct);
      expect(new Set(question.options).size).toBe(OPTIONS_COUNT);
    }
  });

  it('buildBorderQuestion decoys are never neighbours of the current country', () => {
    for (let index = 0; index < 20; index += 1) {
      const question = buildBorderQuestion();
      const neighbours = neighboursOf(question.currentName);
      for (const option of question.options) {
        if (option !== question.correct) {
          expect(neighbours).not.toContain(option);
        }
      }
    }
  });

  it('isCorrectBorder compares exact names', () => {
    expect(isCorrectBorder('Argentina', 'Argentina')).toBe(true);
    expect(isCorrectBorder('Bolivia', 'Argentina')).toBe(false);
  });
});
