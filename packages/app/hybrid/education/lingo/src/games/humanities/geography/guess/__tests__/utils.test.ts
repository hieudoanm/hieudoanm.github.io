import { borders } from '../../_shared/borders';
import { countries } from '../../_shared/countries-data';
import {
  buildQuestion,
  BORDER_VALID,
  isCorrectGuess,
  MODES,
  neighboursOf,
  OPTIONS_COUNT,
} from '../utils';

const NAMES = new Set(countries.map((entry) => entry.name));

describe('guess utils', () => {
  it('exposes the three play modes', () => {
    expect(MODES).toEqual(['flag', 'emoji', 'border']);
  });

  it('builds a flag question with four unique options', () => {
    for (let index = 0; index < 20; index += 1) {
      const question = buildQuestion('flag');
      if (question.mode !== 'flag') throw new Error('expected flag question');
      expect(question.options).toHaveLength(OPTIONS_COUNT);
      expect(
        question.options.some((entry) => entry.name === question.current.name)
      ).toBe(true);
      expect(isCorrectGuess(question, question.current.name)).toBe(true);
    }
  });

  it('builds an emoji question that matches the flag', () => {
    for (let index = 0; index < 20; index += 1) {
      const question = buildQuestion('emoji');
      if (question.mode !== 'emoji') throw new Error('expected emoji question');
      expect(question.options).toHaveLength(OPTIONS_COUNT);
      expect(
        question.options.some((entry) => entry.flag === question.current.flag)
      ).toBe(true);
      expect(isCorrectGuess(question, question.current.flag)).toBe(true);
    }
  });

  it('builds a border question with a real neighbour as the answer', () => {
    for (let index = 0; index < 20; index += 1) {
      const question = buildQuestion('border');
      if (question.mode !== 'border')
        throw new Error('expected border question');
      expect(NAMES.has(question.currentName)).toBe(true);
      expect(neighboursOf(question.currentName)).toContain(question.correct);
      expect(question.options).toHaveLength(OPTIONS_COUNT);
      expect(question.options).toContain(question.correct);
      expect(new Set(question.options).size).toBe(OPTIONS_COUNT);
    }
  });

  it('border decoys are never neighbours of the current country', () => {
    for (let index = 0; index < 20; index += 1) {
      const question = buildQuestion('border');
      if (question.mode !== 'border')
        throw new Error('expected border question');
      const neighbours = neighboursOf(question.currentName);
      for (const option of question.options) {
        if (option !== question.correct) {
          expect(neighbours).not.toContain(option);
        }
      }
    }
  });

  it('BORDER_VALID contains only known countries with at least two neighbours', () => {
    expect(BORDER_VALID.length).toBeGreaterThan(0);
    for (const name of BORDER_VALID) {
      expect(NAMES.has(name)).toBe(true);
      expect(borders[name].length).toBeGreaterThanOrEqual(2);
    }
  });

  it('neighboursOf returns the border list or empty for unknown countries', () => {
    expect(neighboursOf('Chile').length).toBeGreaterThan(0);
    expect(neighboursOf('Atlantis')).toEqual([]);
  });
});
