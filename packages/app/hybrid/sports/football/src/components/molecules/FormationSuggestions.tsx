'use client';

import { suggestFormations } from '@/lib/tactics';
import { Formation, Squad } from '@/types/football';
import { FC } from 'react';

interface FormationSuggestionsProps {
  squad: Squad;
  formation: Formation;
  onApply: (formationId: string) => void;
}

const pct = (filled: number, total: number): string =>
  total === 0 ? '0%' : `${Math.round((filled / total) * 100)}%`;

export const FormationSuggestions: FC<FormationSuggestionsProps> = ({
  squad,
  formation,
  onApply,
}) => {
  const suggestions = suggestFormations(squad, formation.size).filter(
    (fit) => fit.formation.id !== formation.id
  );

  if (squad.players.length === 0 || suggestions.length === 0) {
    return (
      <p className="text-base-content/40 text-[10px]">
        Add more players to see which formations fit your squad.
      </p>
    );
  }

  return (
    <div className="flex flex-col gap-2">
      <span className="text-base-content/50 text-xs font-bold uppercase">
        Formation suggestions
      </span>
      <p className="text-base-content/40 text-[10px]">
        Based on how many of your starters cover each formation.
      </p>
      <ul className="flex list-none flex-col gap-1">
        {suggestions.map((fit) => (
          <li
            key={fit.formation.id}
            className="border-base-300 flex items-center gap-2 rounded border p-1">
            <span className="w-14 truncate text-xs font-bold">
              {fit.formation.name}
            </span>
            <div className="bg-base-300 h-1.5 min-w-0 flex-1 overflow-hidden rounded-full">
              <div
                className="bg-primary h-full rounded-full"
                style={{ width: pct(fit.filled, fit.total) }}
              />
            </div>
            <span className="text-base-content/50 w-14 text-right text-[10px]">
              {fit.filled}/{fit.total}
            </span>
            <button
              type="button"
              aria-label={`Apply formation ${fit.formation.name}`}
              onClick={() => onApply(fit.formation.id)}
              className="btn btn-xs btn-primary">
              Apply
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

FormationSuggestions.displayName = 'FormationSuggestions';
