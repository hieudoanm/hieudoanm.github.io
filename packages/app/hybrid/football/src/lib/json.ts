import { Squad } from '@/types/football';
import { isSquad, withFormation } from '@/lib/squad';

export const exportSquadJson = (squad: Squad): string =>
  JSON.stringify(squad, null, 2);

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
