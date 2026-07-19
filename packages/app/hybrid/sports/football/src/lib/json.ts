import { Squad } from '@/types/football';
import { isSquad, withFormation } from '@/lib/squad';
import { ExportScope, selectPlayers } from '@/lib/csv';

export const exportSquadJson = (
  squad: Squad,
  scope: ExportScope = 'all'
): string => {
  const selected = selectPlayers(squad.players, scope);
  const selectedIds = new Set(selected.map((player) => player.id));
  const assignments: Record<string, string[]> = {};
  for (const [slotId, ids] of Object.entries(squad.assignments)) {
    const kept = ids.filter((id) => selectedIds.has(id));
    if (kept.length > 0) assignments[slotId] = kept;
  }
  return JSON.stringify({ ...squad, players: selected, assignments }, null, 2);
};

export const downloadJson = (filename: string, content: string): void => {
  const blob = new Blob([content], { type: 'application/json;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement('a');
  anchor.href = url;
  anchor.download = filename;
  anchor.click();
  URL.revokeObjectURL(url);
};

export const importSquadJson = (content: string): Squad | null => {
  try {
    const parsed: unknown = JSON.parse(content);
    if (!isSquad(parsed)) return null;
    return withFormation(parsed);
  } catch {
    return null;
  }
};
