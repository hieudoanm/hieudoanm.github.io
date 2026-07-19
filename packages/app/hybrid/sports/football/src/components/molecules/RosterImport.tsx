'use client';

import { importRosterText } from '@/lib/csv';
import { Player } from '@/types/football';
import { FC, useState } from 'react';
import { FiUpload } from 'react-icons/fi';

interface RosterImportProps {
  onImport: (players: Player[]) => void;
}

export const RosterImport: FC<RosterImportProps> = ({ onImport }) => {
  const [text, setText] = useState('');
  const [message, setMessage] = useState<string | null>(null);

  const handleImport = (): void => {
    const result = importRosterText(text);
    if (result.players.length > 0) {
      onImport(result.players);
      setMessage(
        `Imported ${result.players.length} player${result.players.length === 1 ? '' : 's'}${result.skipped > 0 ? `, skipped ${result.skipped}` : ''}.`
      );
      setText('');
    } else {
      setMessage('No valid roster lines found.');
    }
  };

  return (
    <div className="rounded-box flex flex-col gap-2 border border-white/10 p-2">
      <span className="text-base-content/50 text-xs font-bold uppercase">
        Paste roster
      </span>
      <textarea
        aria-label="Roster text"
        value={text}
        onChange={(event) => {
          setText(event.target.value);
          setMessage(null);
        }}
        placeholder={'Ada,10,MID\nBob,7,FWD\nCara,1,GK'}
        rows={4}
        className="border-base-300 textarea textarea-bordered textarea-sm w-full font-mono text-xs"
      />
      <div className="flex items-center justify-between gap-2">
        <p className="text-base-content/40 text-xs">
          One player per line: name, number, role.
        </p>
        <button
          type="button"
          aria-label="Import roster"
          onClick={handleImport}
          disabled={text.trim() === ''}
          className="btn btn-outline btn-xs">
          <FiUpload className="size-3" />
          Import roster
        </button>
      </div>
      {message && <p className="text-base-content/60 text-xs">{message}</p>}
    </div>
  );
};

RosterImport.displayName = 'RosterImport';
