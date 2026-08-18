'use client';

import { TeamSheetPrint } from '@/components/molecules/TeamSheetPrint';
import { Formation, Squad } from '@/types/football';
import { FC } from 'react';
import { FiPrinter } from 'react-icons/fi';

interface TeamSheetProps {
  squad: Squad;
  formation: Formation;
  opponent: string;
  date: string;
  onOpponentChange: (value: string) => void;
  onDateChange: (value: string) => void;
  onPrint: () => void;
}

export const TeamSheet: FC<TeamSheetProps> = ({
  squad,
  formation,
  opponent,
  date,
  onOpponentChange,
  onDateChange,
  onPrint,
}) => (
  <div className="flex flex-col gap-2">
    <div className="rounded-box flex flex-col gap-2 border border-white/10 p-2">
      <span className="text-base-content/50 text-xs font-bold uppercase">
        Team sheet
      </span>
      <div className="grid grid-cols-2 gap-2">
        <label className="flex flex-col gap-1">
          <span className="text-base-content/60 text-xs">Opponent</span>
          <input
            type="text"
            aria-label="Opponent"
            value={opponent}
            onChange={(event) => onOpponentChange(event.target.value)}
            placeholder="e.g. Rovers FC"
            className="border-base-300 input input-bordered input-sm w-full"
          />
        </label>
        <label className="flex flex-col gap-1">
          <span className="text-base-content/60 text-xs">Match date</span>
          <input
            type="date"
            aria-label="Match date"
            value={date}
            onChange={(event) => onDateChange(event.target.value)}
            className="border-base-300 input input-bordered input-sm w-full"
          />
        </label>
      </div>
      <button
        type="button"
        aria-label="Print team sheet"
        onClick={onPrint}
        disabled={squad.players.length === 0}
        className="btn btn-outline btn-xs w-full">
        <FiPrinter className="size-3" />
        Print team sheet
      </button>
    </div>
    <TeamSheetPrint
      squad={squad}
      formation={formation}
      opponent={opponent}
      date={date}
      className="rounded-box border border-white/10"
    />
  </div>
);

TeamSheet.displayName = 'TeamSheet';
