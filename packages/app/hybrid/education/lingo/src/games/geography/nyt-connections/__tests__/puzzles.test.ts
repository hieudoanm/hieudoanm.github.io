import { isCountry } from '../../_shared/countries';
import { PUZZLES, puzzleForDate } from '../puzzles';
import { validatePuzzle } from '../utils';

describe('PUZZLES', () => {
  it('has unique ids', () => {
    const ids = PUZZLES.map((puzzle) => puzzle.id);
    expect(new Set(ids).size).toBe(PUZZLES.length);
  });

  it.each(PUZZLES.map((puzzle) => [puzzle.id, puzzle] as const))(
    'puzzle %i is a disjoint partition of real countries',
    (_id, puzzle) => {
      expect(validatePuzzle(puzzle)).toEqual([]);
    }
  );

  it('uses only countries from the shared dataset', () => {
    for (const puzzle of PUZZLES) {
      for (const group of puzzle.groups) {
        for (const member of group.members) {
          expect(isCountry(member)).toBe(true);
        }
      }
    }
  });
});

describe('validatePuzzle', () => {
  it('flags unknown countries', () => {
    const errors = validatePuzzle({
      id: 99,
      groups: [
        {
          label: 'Bad',
          members: ['Atlantis', 'Wakanda', 'Chile', 'Peru'],
        },
        { label: 'B', members: ['Japan', 'Fiji', 'Malta', 'Chad'] },
        { label: 'C', members: ['Egypt', 'India', 'Oman', 'Cuba'] },
        { label: 'D', members: ['France', 'Ghana', 'Laos', 'Mali'] },
      ],
    });
    expect(errors).toContain('unknown country Atlantis');
    expect(errors).toContain('unknown country Wakanda');
  });

  it('flags duplicate countries across groups', () => {
    const errors = validatePuzzle({
      id: 98,
      groups: [
        { label: 'A', members: ['Chile', 'Peru', 'Japan', 'Fiji'] },
        { label: 'B', members: ['Chile', 'Malta', 'Oman', 'Cuba'] },
        { label: 'C', members: ['Egypt', 'India', 'Laos', 'Mali'] },
        { label: 'D', members: ['France', 'Ghana', 'Togo', 'Chad'] },
      ],
    });
    expect(errors).toContain('duplicate country Chile');
  });

  it('flags groups without exactly four members', () => {
    const shortGroup = {
      id: 97,
      groups: [
        { label: 'A', members: ['Chile', 'Peru', 'Japan'] },
        { label: 'B', members: ['Malta', 'Oman', 'Cuba', 'Mali'] },
        { label: 'C', members: ['Egypt', 'India', 'Laos', 'Togo'] },
        { label: 'D', members: ['France', 'Ghana', 'Fiji', 'Chad'] },
      ],
    } as unknown as Parameters<typeof validatePuzzle>[0];
    const errors = validatePuzzle(shortGroup);
    expect(errors).toContain('A: expected 4 members');
  });
});

describe('puzzleForDate', () => {
  it('is deterministic per date key', () => {
    expect(puzzleForDate('2026-08-22')).toBe(puzzleForDate('2026-08-22'));
  });

  it('always returns a published puzzle', () => {
    expect(PUZZLES).toContain(puzzleForDate('2026-01-01'));
    expect(PUZZLES).toContain(puzzleForDate('1999-12-31'));
  });
});
