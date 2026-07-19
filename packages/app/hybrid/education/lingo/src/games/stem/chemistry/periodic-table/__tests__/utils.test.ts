import { periodicTable, specificNameColorMap, SpecificName } from '../utils';

describe('periodicTable', () => {
  it('contains all 118 elements with sequential atomic numbers', () => {
    const entries = Object.entries(periodicTable);
    expect(entries).toHaveLength(118);
    entries.forEach(([symbol, element], index) => {
      expect(element.number).toBe(index + 1);
      expect(symbol).toBeTruthy();
      expect(element.mass).toBeGreaterThan(0);
      expect(['solid', 'liquid', 'gas']).toContain(element.state);
    });
  });

  it('assigns a color to every specific name', () => {
    const specificNames = new Set<SpecificName>(
      Object.values(periodicTable).map((element) => element.specificName)
    );
    specificNames.forEach((name) => {
      expect(specificNameColorMap[name]).toBeTruthy();
    });
  });
});
