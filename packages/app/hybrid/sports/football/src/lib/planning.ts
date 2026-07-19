import { FormationPreset, Lineup, Squad } from '@/types/football';
import { uid } from '@/lib/squad';

export const addFormationPreset = (squad: Squad, name: string): Squad => {
  const trimmed = name.trim();
  if (trimmed === '') return squad;
  const exists = squad.presets.some(
    (preset) => preset.formationId === squad.formationId
  );
  if (exists) return squad;
  const preset: FormationPreset = {
    id: uid(),
    name: trimmed,
    formationId: squad.formationId,
  };
  return { ...squad, presets: [...squad.presets, preset] };
};

export const removeFormationPreset = (
  squad: Squad,
  presetId: string
): Squad => ({
  ...squad,
  presets: squad.presets.filter((preset) => preset.id !== presetId),
});

export const saveLineup = (squad: Squad, name: string): Squad => {
  const trimmed = name.trim();
  if (trimmed === '') return squad;
  const lineup: Lineup = {
    id: uid(),
    name: trimmed,
    formationId: squad.formationId,
    assignments: squad.assignments,
  };
  return { ...squad, lineups: [...squad.lineups, lineup] };
};

export const applyLineup = (squad: Squad, lineupId: string): Squad => {
  const lineup = squad.lineups.find((item) => item.id === lineupId);
  if (!lineup) return squad;
  return {
    ...squad,
    formationId: lineup.formationId,
    assignments: lineup.assignments,
  };
};

export const renameLineup = (
  squad: Squad,
  lineupId: string,
  name: string
): Squad => ({
  ...squad,
  lineups: squad.lineups.map((item) =>
    item.id === lineupId
      ? { ...item, name: name.trim() === '' ? item.name : name.trim() }
      : item
  ),
});

export const removeLineup = (squad: Squad, lineupId: string): Squad => ({
  ...squad,
  lineups: squad.lineups.filter((item) => item.id !== lineupId),
});

export const toggleMirrored = (squad: Squad): Squad => ({
  ...squad,
  mirrored: !squad.mirrored,
});
