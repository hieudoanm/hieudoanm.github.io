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

  it('exports only starters as JSON', () => {
    const squad = makeSquad({
      players: [
        { id: 'p1', name: 'Ada', number: 10, role: 'MID' },
        { id: 'p2', name: 'Bob', number: 7, role: 'FWD', bench: true },
      ],
      assignments: { '442-1-1': ['p1'], '442-3-9': ['p2'] },
    });
    const exported = JSON.parse(exportSquadJson(squad, 'starters'));
    expect(exported.players.map((p: { name: string }) => p.name)).toEqual([
      'Ada',
    ]);
    expect(exported.assignments).toEqual({ '442-1-1': ['p1'] });
  });

  it('exports only bench players as JSON', () => {
    const squad = makeSquad({
      players: [
        { id: 'p1', name: 'Ada', number: 10, role: 'MID' },
        { id: 'p2', name: 'Bob', number: 7, role: 'FWD', bench: true },
      ],
      assignments: { '442-1-1': ['p1'], '442-3-9': ['p2'] },
    });
    const exported = JSON.parse(exportSquadJson(squad, 'bench'));
    expect(exported.players.map((p: { name: string }) => p.name)).toEqual([
      'Bob',
    ]);
    expect(exported.assignments).toEqual({ '442-3-9': ['p2'] });
  });
});
