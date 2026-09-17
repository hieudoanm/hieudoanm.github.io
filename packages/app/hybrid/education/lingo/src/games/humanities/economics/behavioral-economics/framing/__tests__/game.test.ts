import { findScenario, frameOk, scenarioLabel } from '../game';

describe('frameOk', () => {
  it('detects the classic reflection pattern (X in gains, Y in losses)', () => {
    expect(frameOk('X', 'Y')).toBe(true);
  });

  it('rejects every non-classic combination', () => {
    expect(frameOk('X', 'X')).toBe(false);
    expect(frameOk('Y', 'Y')).toBe(false);
    expect(frameOk('Y', 'X')).toBe(false);
  });
});

describe('scenarioLabel', () => {
  it('returns the title for a known scenario', () => {
    expect(scenarioLabel('A')).toBe('Scenario A — Gains');
    expect(scenarioLabel('B')).toBe('Scenario B — Losses');
  });

  it('falls back to the id for an unknown scenario', () => {
    expect(scenarioLabel('C' as never)).toBe('C');
  });
});

describe('findScenario', () => {
  it('returns the matching scenario metadata', () => {
    expect(findScenario('A').programX).toMatch(/200 people will be saved/);
    expect(findScenario('B').programX).toMatch(/400 people will DIE/);
  });

  it('throws for an unknown scenario', () => {
    expect(() => findScenario('C' as never)).toThrow('Unknown scenario: C');
  });
});
