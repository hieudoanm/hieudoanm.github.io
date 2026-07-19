'use client';

import { downloadCsv, exportSquadCsv, importSquadCsv } from '@/lib/csv';
import { ExportScope } from '@/lib/csv';
import { isDesktop, openSquadFile, saveSquadFile } from '@/lib/desktop';
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

  const handleExportCsv = (scope: ExportScope = 'all'): void => {
    const base = squadName.toLowerCase().replace(/[^a-z0-9]+/g, '-');
    const suffix = scope === 'all' ? '' : `-${scope}`;
    downloadCsv(
      `${base || 'squad'}${suffix}.csv`,
      exportSquadCsv(players, scope)
    );
  };

  const handleExportJson = (scope: ExportScope = 'all'): void => {
    const base = squadName.toLowerCase().replace(/[^a-z0-9]+/g, '-');
    const suffix = scope === 'all' ? '' : `-${scope}`;
    downloadJson(
      `${base || 'squad'}${suffix}.json`,
      exportSquadJson(squad, scope)
    );
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

  const handleOpenSquadFile = async (): Promise<void> => {
    const opened = await openSquadFile();
    if (opened === null) return;
    const imported = importSquadJson(opened.content);
    if (imported) {
      onImportSquad(imported);
      setMessage(`Imported ${imported.name}.`);
    } else {
      setMessage('Could not import the squad file.');
    }
  };

  const handleSaveSquadFile = async (): Promise<void> => {
    const base = squadName.toLowerCase().replace(/[^a-z0-9]+/g, '-');
    const saved = await saveSquadFile(
      `${base || 'squad'}.squad.json`,
      exportSquadJson(squad)
    );
    if (saved) setMessage('Saved the squad file.');
  };

  return (
    <div className="flex flex-col gap-2">
      <div className="flex gap-2">
        <button
          type="button"
          aria-label="Export squad as CSV"
          onClick={() => handleExportCsv('all')}
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
          onClick={() => handleExportJson('all')}
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
      <div className="flex gap-2">
        <button
          type="button"
          aria-label="Export starters as CSV"
          onClick={() => handleExportCsv('starters')}
          disabled={players.length === 0}
          className="btn btn-ghost btn-xs flex-1">
          <FiDownload className="size-3" />
          Starters CSV
        </button>
        <button
          type="button"
          aria-label="Export bench as CSV"
          onClick={() => handleExportCsv('bench')}
          disabled={players.length === 0}
          className="btn btn-ghost btn-xs flex-1">
          <FiDownload className="size-3" />
          Bench CSV
        </button>
      </div>
      <div className="flex gap-2">
        <button
          type="button"
          aria-label="Export starters as JSON"
          onClick={() => handleExportJson('starters')}
          disabled={players.length === 0}
          className="btn btn-ghost btn-xs flex-1">
          <FiDownload className="size-3" />
          Starters JSON
        </button>
        <button
          type="button"
          aria-label="Export bench as JSON"
          onClick={() => handleExportJson('bench')}
          disabled={players.length === 0}
          className="btn btn-ghost btn-xs flex-1">
          <FiDownload className="size-3" />
          Bench JSON
        </button>
      </div>
      {isDesktop() && (
        <div className="flex gap-2">
          <button
            type="button"
            aria-label="Open squad file"
            onClick={handleOpenSquadFile}
            className="btn btn-ghost btn-xs flex-1">
            <FiUpload className="size-3" />
            Open squad file
          </button>
          <button
            type="button"
            aria-label="Save squad file"
            onClick={handleSaveSquadFile}
            disabled={players.length === 0}
            className="btn btn-ghost btn-xs flex-1">
            <FiDownload className="size-3" />
            Save squad file
          </button>
        </div>
      )}
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
