'use client';

import { downloadCsv, exportSquadCsv, importSquadCsv } from '@/lib/csv';
import { downloadJson, exportSquadJson, importSquadJson } from '@/lib/json';
import { Player, Squad } from '@/types/football';
import { ChangeEvent, FC, useRef, useState } from 'react';
import { FiDownload, FiUpload } from 'react-icons/fi';

interface ImportExportProps {
  players: Player[];
  squadName: string;
  squad: Squad;
  onImport: (players: Player[]) => void;
  onImportSquad: (squad: Squad) => void;
}

export const ImportExport: FC<ImportExportProps> = ({
  players,
  squadName,
  squad,
  onImport,
  onImportSquad,
}) => {
  const csvInputRef = useRef<HTMLInputElement>(null);
  const jsonInputRef = useRef<HTMLInputElement>(null);
  const [message, setMessage] = useState<string | null>(null);

  const handleExportCsv = (): void => {
    const base = squadName.toLowerCase().replace(/[^a-z0-9]+/g, '-');
    downloadCsv(`${base || 'squad'}.csv`, exportSquadCsv(players));
  };

  const handleExportJson = (): void => {
    const base = squadName.toLowerCase().replace(/[^a-z0-9]+/g, '-');
    downloadJson(`${base || 'squad'}.json`, exportSquadJson(squad));
  };

  const handleCsvFile = (event: ChangeEvent<HTMLInputElement>): void => {
    const file = event.target.files?.[0];
    event.target.value = '';
    if (!file) return;
    void file.text().then((content) => {
      const result = importSquadCsv(content);
      if (result.players.length > 0) {
        onImport(result.players);
        setMessage(
          `Imported ${result.players.length} player${result.players.length === 1 ? '' : 's'}${result.skipped > 0 ? `, skipped ${result.skipped}` : ''}.`
        );
      } else {
        setMessage('No valid players found in the file.');
      }
    });
  };

  const handleJsonFile = (event: ChangeEvent<HTMLInputElement>): void => {
    const file = event.target.files?.[0];
    event.target.value = '';
    if (!file) return;
    void file.text().then((content) => {
      const imported = importSquadJson(content);
      if (imported) {
        onImportSquad(imported);
        setMessage('Imported squad.');
      } else {
        setMessage('Could not import the squad file.');
      }
    });
  };

  return (
    <div className="flex flex-col gap-2">
      <div className="flex gap-2">
        <button
          type="button"
          aria-label="Export squad as CSV"
          onClick={handleExportCsv}
          disabled={players.length === 0}
          className="btn btn-outline btn-xs flex-1">
          <FiDownload className="size-3" />
          Export CSV
        </button>
        <button
          type="button"
          aria-label="Import squad from CSV"
          onClick={() => csvInputRef.current?.click()}
          className="btn btn-outline btn-xs flex-1">
          <FiUpload className="size-3" />
          Import CSV
        </button>
      </div>
      <div className="flex gap-2">
        <button
          type="button"
          aria-label="Export squad as JSON"
          onClick={handleExportJson}
          disabled={players.length === 0}
          className="btn btn-outline btn-xs flex-1">
          <FiDownload className="size-3" />
          Export JSON
        </button>
        <button
          type="button"
          aria-label="Import squad from JSON"
          onClick={() => jsonInputRef.current?.click()}
          className="btn btn-outline btn-xs flex-1">
          <FiUpload className="size-3" />
          Import JSON
        </button>
      </div>
      <input
        ref={csvInputRef}
        type="file"
        accept=".csv,text/csv"
        onChange={handleCsvFile}
        className="hidden"
      />
      <input
        ref={jsonInputRef}
        type="file"
        accept=".json,application/json"
        onChange={handleJsonFile}
        className="hidden"
      />
      {message && <p className="text-base-content/60 text-xs">{message}</p>}
    </div>
  );
};

ImportExport.displayName = 'ImportExport';
