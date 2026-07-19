'use client';

import { slotPlayers } from '@/lib/squad';
import { Formation, Squad } from '@/types/football';
import { FC } from 'react';

interface TeamSheetPrintProps {
  squad: Squad;
  formation: Formation;
  opponent: string;
  date: string;
  className?: string;
}

interface SheetRow {
  number: number;
  name: string;
  position: string;
}

const starterRows = (squad: Squad, formation: Formation): SheetRow[] => {
  const rows: SheetRow[] = [];
  const seen = new Set<string>();
  for (const slot of formation.slots) {
    for (const player of slotPlayers(squad, slot.id)) {
      if (player.bench === true) continue;
      rows.push({
        number: player.number,
        name: player.name,
        position: slot.label,
      });
      seen.add(player.id);
    }
  }
  for (const player of squad.players) {
    if (player.bench === true || seen.has(player.id)) continue;
    rows.push({
      number: player.number,
      name: player.name,
      position: player.position ?? '—',
    });
  }
  return rows;
};

const benchRows = (squad: Squad): SheetRow[] =>
  squad.players
    .filter((player) => player.bench === true)
    .sort((a, b) => a.number - b.number)
    .map((player) => ({
      number: player.number,
      name: player.name,
      position: player.position ?? '—',
    }));

const SheetList: FC<{ rows: SheetRow[] }> = ({ rows }) => (
  <table className="w-full text-sm">
    <tbody>
      {rows.map((row) => (
        <tr
          key={`${row.number}-${row.name}`}
          className="border-t border-black/10">
          <td className="w-12 px-2 py-1 text-xs tabular-nums">{row.number}</td>
          <td className="px-2 py-1">{row.name}</td>
          <td className="w-20 px-2 py-1 text-right text-xs">{row.position}</td>
        </tr>
      ))}
    </tbody>
  </table>
);

export const TeamSheetPrint: FC<TeamSheetPrintProps> = ({
  squad,
  formation,
  opponent,
  date,
  className = 'hidden print:block',
}) => {
  const starters = starterRows(squad, formation);
  const bench = benchRows(squad);

  return (
    <div
      data-testid="team-sheet"
      className={`${className} rounded-box bg-base-100 p-4`}>
      <div className="flex items-end justify-between gap-4 border-b-4 border-black/80 pb-2">
        <div>
          <p className="text-xs font-bold tracking-widest uppercase">
            Team sheet
          </p>
          <h3 className="text-2xl font-bold">{squad.name}</h3>
        </div>
        <div className="text-right text-xs">
          <p>{opponent ? `vs ${opponent}` : 'Opponent: —'}</p>
          <p>{date || 'Date: —'}</p>
          <p>{formation.name}</p>
        </div>
      </div>

      <div className="mt-3">
        <p className="mb-1 text-xs font-bold tracking-widest uppercase">
          Starters · {starters.length}
        </p>
        <SheetList rows={starters} />
      </div>

      <div className="mt-4">
        <p className="mb-1 text-xs font-bold tracking-widest uppercase">
          Bench · {bench.length}
        </p>
        {bench.length === 0 ? (
          <p className="text-xs text-black/50">No substitutes selected.</p>
        ) : (
          <SheetList rows={bench} />
        )}
      </div>
    </div>
  );
};

TeamSheetPrint.displayName = 'TeamSheetPrint';
