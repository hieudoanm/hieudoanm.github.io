import { exportSquadJson, importSquadJson } from '@/lib/json';
import { makeSquad } from '@/test/fixtures';

describe('json', () => {
  it('exports a squad as pretty-printed JSON', () => {
    const squad = makeSquad({ name: 'Liverpool', formationId: '433' });
    const exported = exportSquadJson(squad);
    expect(JSON.parse(exported)).toEqual(squad);
    expect(exported).toContain('\n');
  });

  it('imports a valid squad and keeps the formation', () => {
    const squad = makeSquad({
      name: 'Import',
      formationId: '433',
      players: [{ id: 'p1', name: 'Ada', number: 10, role: 'MID' }],
      assignments: { '433-2-5': ['p1'] },
    });
    const imported = importSquadJson(JSON.stringify(squad));
    expect(imported).toEqual(squad);
  });

  it('returns null for malformed JSON', () => {
    expect(importSquadJson('{nope')).toBeNull();
  });

  it('returns null for a value that is not a squad', () => {
    expect(importSquadJson(JSON.stringify({ nope: true }))).toBeNull();
    expect(importSquadJson(JSON.stringify([]))).toBeNull();
    expect(importSquadJson(JSON.stringify(null))).toBeNull();
  });

  it('falls back to the default formation for unknown formations', () => {
    const imported = importSquadJson(
      JSON.stringify(makeSquad({ formationId: '0-0-0' }))
    );
    expect(imported?.formationId).toBe('442');
  });
});
