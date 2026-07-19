import {
  addFormationPreset,
  applyLineup,
  removeFormationPreset,
  removeLineup,
  renameLineup,
  saveLineup,
  toggleMirrored,
} from '@/lib/planning';
import { makeSquad } from '@/test/fixtures';

describe('planning', () => {
  it('saves the current formation as a preset', () => {
    const next = addFormationPreset(
      makeSquad({ formationId: '433' }),
      '  Plan A '
    );
    expect(next.presets).toHaveLength(1);
    expect(next.presets[0]).toMatchObject({
      name: 'Plan A',
      formationId: '433',
    });
  });

  it('ignores empty preset names', () => {
    expect(addFormationPreset(makeSquad(), '   ').presets).toHaveLength(0);
  });

  it('ignores duplicate presets for the same formation', () => {
    const squad = addFormationPreset(
      makeSquad({ formationId: '433' }),
      'Plan A'
    );
    expect(addFormationPreset(squad, 'Plan B').presets).toHaveLength(1);
  });

  it('removes a formation preset', () => {
    const squad = addFormationPreset(makeSquad(), 'Plan A');
    const next = removeFormationPreset(squad, squad.presets[0].id);
    expect(next.presets).toHaveLength(0);
  });

  it('snapshots the current formation and assignments as a lineup', () => {
    const squad = makeSquad({
      formationId: '433',
      assignments: { '433-0-0': ['p1'] },
    });
    const next = saveLineup(squad, '  Plan A ');
    expect(next.lineups).toHaveLength(1);
    expect(next.lineups[0]).toMatchObject({
      name: 'Plan A',
      formationId: '433',
      assignments: { '433-0-0': ['p1'] },
    });
  });

  it('ignores empty lineup names', () => {
    expect(saveLineup(makeSquad(), '   ').lineups).toHaveLength(0);
  });

  it('restores a saved lineup with its own formation', () => {
    const squad = makeSquad({
      formationId: '442',
      assignments: { '442-1-1': ['p1'] },
    });
    const withLineup = saveLineup(
      { ...squad, formationId: '433', assignments: { '433-3-8': ['p2'] } },
      'Plan A'
    );
    const next = applyLineup(withLineup, withLineup.lineups[0].id);
    expect(next.formationId).toBe('433');
    expect(next.assignments).toEqual({ '433-3-8': ['p2'] });
  });

  it('ignores applying an unknown lineup', () => {
    expect(applyLineup(makeSquad(), 'nope').assignments).toEqual({});
  });

  it('renames a lineup and ignores empty names', () => {
    const withLineup = saveLineup(makeSquad(), 'Plan A');
    const renamed = renameLineup(
      withLineup,
      withLineup.lineups[0].id,
      ' Plan B '
    );
    expect(renamed.lineups[0].name).toBe('Plan B');
    expect(
      renameLineup(renamed, withLineup.lineups[0].id, '   ').lineups[0].name
    ).toBe('Plan B');
  });

  it('removes a lineup', () => {
    const withLineup = saveLineup(makeSquad(), 'Plan A');
    expect(
      removeLineup(withLineup, withLineup.lineups[0].id).lineups
    ).toHaveLength(0);
  });

  it('toggles the mirrored flag', () => {
    expect(toggleMirrored(makeSquad()).mirrored).toBe(true);
    expect(toggleMirrored(toggleMirrored(makeSquad())).mirrored).toBe(false);
  });
});
