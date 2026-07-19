import { useCallback, useRef, useState } from 'react';
import { useData } from '@/providers/DataProvider';
import {
  exportToCSV,
  exportTournamentToCSV,
  downloadFile,
  exportToJSON,
  importFromJSON,
} from '@/lib/export';
import { exportToSQLite } from '@/lib/sqlite';
import { importParticipantsFromCSV, readFileAsText } from '@/lib/import';
import { calculateStandings } from '@/lib/standings';

type ExportModalProps = {
  isOpen: boolean;
  onClose: () => void;
  tournamentId?: string;
};

type ExportStatus = 'idle' | 'exporting' | 'importing';

export const ExportModal = ({
  isOpen,
  onClose,
  tournamentId,
}: ExportModalProps) => {
  const data = useData();
  const [status, setStatus] = useState<ExportStatus>('idle');
  const [statusMessage, setStatusMessage] = useState('');
  const [importResult, setImportResult] = useState<string | null>(null);
  const jsonInputRef = useRef<HTMLInputElement>(null);
  const csvInputRef = useRef<HTMLInputElement>(null);

  const tournaments = tournamentId
    ? data.tournaments.filter((t) => t.id === tournamentId)
    : data.tournaments;

  const participants = tournamentId
    ? data.participants.filter((p) => p.tournamentId === tournamentId)
    : data.participants;

  const matches = tournamentId
    ? data.matches.filter((m) => m.tournamentId === tournamentId)
    : data.matches;

  const standings = tournamentId
    ? calculateStandings(
        matches.filter((m) => m.tournamentId === tournamentId),
        participants
          .filter((p) => p.tournamentId === tournamentId)
          .map((p) => p.id),
        tournamentId
      )
    : data.tournaments.flatMap((t) =>
        calculateStandings(
          data.matches.filter((m) => m.tournamentId === t.id),
          data.participants
            .filter((p) => p.tournamentId === t.id)
            .map((p) => p.id),
          t.id
        )
      );

  const handleExportCSV = useCallback(() => {
    setStatus('exporting');
    setStatusMessage('Generating CSV…');

    try {
      const csv = tournamentId
        ? exportTournamentToCSV(
            tournaments[0],
            participants,
            matches,
            standings
          )
        : exportToCSV({ tournaments, participants, matches, standings });

      const name = tournamentId
        ? `tourney-${tournamentId}.csv`
        : 'tourney-export.csv';
      downloadFile(csv, name, 'text/csv');
      setStatus('idle');
      setStatusMessage('');
    } catch {
      setStatusMessage('CSV export failed');
      setStatus('idle');
    }
  }, [tournamentId, tournaments, participants, matches, standings]);

  const handleExportJSON = useCallback(() => {
    setStatus('exporting');
    setStatusMessage('Generating JSON backup…');

    try {
      const json = exportToJSON({
        tournaments,
        participants,
        matches,
        groups: data.groups,
      });
      const name = tournamentId
        ? `tourney-${tournamentId}-backup.json`
        : 'tourney-backup.json';
      downloadFile(json, name, 'application/json');
      setStatus('idle');
      setStatusMessage('');
    } catch {
      setStatusMessage('JSON export failed');
      setStatus('idle');
    }
  }, [tournamentId, tournaments, participants, matches, data.groups]);

  const handleExportSQLite = useCallback(async () => {
    setStatus('exporting');
    setStatusMessage('Building SQLite database…');

    try {
      const blob = await exportToSQLite(tournaments, participants, matches);
      const name = tournamentId
        ? `tourney-${tournamentId}.db`
        : 'tourney-export.db';
      downloadFile(blob, name, 'application/x-sqlite3');
      setStatus('idle');
      setStatusMessage('');
    } catch {
      setStatusMessage('SQLite export failed');
      setStatus('idle');
    }
  }, [tournamentId, tournaments, participants, matches]);

  const handleImportJSON = useCallback(
    async (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (!file) return;

      setStatus('importing');
      setStatusMessage('Importing JSON backup…');
      setImportResult(null);

      try {
        const text = await readFileAsText(file);
        const imported = importFromJSON(text);
        if (!imported) {
          setStatusMessage('Invalid backup file format');
          setStatus('idle');
          return;
        }

        for (const t of imported.tournaments) {
          await data.createTournament({
            name: t.name,
            description: t.description,
            format: t.format,
            status: t.status,
            maxParticipants: t.maxParticipants,
            startDate: t.startDate,
            endDate: t.endDate,
          });
        }

        setImportResult(
          `Restored: ${imported.tournaments.length} tournament(s), ${imported.participants.length} participant(s), ${imported.matches.length} match(es)`
        );
        setStatus('idle');
        setStatusMessage('');
      } catch {
        setStatusMessage('Import failed');
        setStatus('idle');
      }

      if (jsonInputRef.current) jsonInputRef.current.value = '';
    },
    [data]
  );

  const handleImportCSV = useCallback(
    async (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (!file) return;

      setStatus('importing');
      setStatusMessage('Importing participants…');
      setImportResult(null);

      try {
        const text = await readFileAsText(file);
        const imported = importParticipantsFromCSV(text);
        if (imported.length === 0) {
          setStatusMessage('No participants found in CSV');
          setStatus('idle');
          return;
        }

        const targetTournamentId = tournamentId ?? data.tournaments[0]?.id;
        if (!targetTournamentId) {
          setStatusMessage('No tournament available');
          setStatus('idle');
          return;
        }

        await data.createParticipants(
          imported.map((p) => ({ ...p, tournamentId: targetTournamentId }))
        );
        setImportResult(`Imported ${imported.length} participant(s)`);
        setStatus('idle');
        setStatusMessage('');
      } catch {
        setStatusMessage('CSV import failed');
        setStatus('idle');
      }

      if (csvInputRef.current) csvInputRef.current.value = '';
    },
    [data, tournamentId]
  );

  if (!isOpen) return null;

  const isActive = status === 'exporting' || status === 'importing';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="mx-4 max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-xl bg-white shadow-xl">
        <div className="flex items-center justify-between border-b border-gray-100 px-6 py-4">
          <h2 className="text-lg font-semibold text-gray-900">
            {tournamentId ? 'Tournament Export' : 'Data Export & Import'}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 transition-colors hover:text-gray-600"
            disabled={isActive}>
            <svg
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        <div className="space-y-6 px-6 py-4">
          {tournamentId && (
            <p className="text-sm text-gray-500">
              Exporting tournament:{' '}
              <span className="font-medium text-gray-700">
                {tournaments[0]?.name ?? tournamentId}
              </span>
            </p>
          )}

          <section>
            <h3 className="mb-3 text-sm font-medium text-gray-700">Export</h3>
            <div className="space-y-2">
              <button
                onClick={handleExportCSV}
                disabled={isActive}
                className="flex w-full items-center justify-between rounded-lg bg-gray-50 px-4 py-3 transition-colors hover:bg-gray-100 disabled:opacity-50">
                <div className="text-left">
                  <div className="text-sm font-medium text-gray-900">
                    CSV Spreadsheet
                  </div>
                  <div className="text-xs text-gray-500">
                    Tabular format for Excel, Google Sheets
                  </div>
                </div>
                <span className="text-xs text-gray-400">.csv</span>
              </button>

              <button
                onClick={handleExportJSON}
                disabled={isActive}
                className="flex w-full items-center justify-between rounded-lg bg-gray-50 px-4 py-3 transition-colors hover:bg-gray-100 disabled:opacity-50">
                <div className="text-left">
                  <div className="text-sm font-medium text-gray-900">
                    JSON Backup
                  </div>
                  <div className="text-xs text-gray-500">
                    Full backup, importable later
                  </div>
                </div>
                <span className="text-xs text-gray-400">.json</span>
              </button>

              <button
                onClick={handleExportSQLite}
                disabled={isActive}
                className="flex w-full items-center justify-between rounded-lg bg-gray-50 px-4 py-3 transition-colors hover:bg-gray-100 disabled:opacity-50">
                <div className="text-left">
                  <div className="text-sm font-medium text-gray-900">
                    SQLite Database
                  </div>
                  <div className="text-xs text-gray-500">
                    Relational format with queries
                  </div>
                </div>
                <span className="text-xs text-gray-400">.db</span>
              </button>
            </div>
          </section>

          <div className="border-t border-gray-100" />

          <section>
            <h3 className="mb-3 text-sm font-medium text-gray-700">Import</h3>
            <div className="space-y-2">
              <div>
                <input
                  ref={jsonInputRef}
                  type="file"
                  accept=".json"
                  onChange={handleImportJSON}
                  className="hidden"
                  id="import-json"
                />
                <label
                  htmlFor="import-json"
                  className="flex w-full cursor-pointer items-center justify-between rounded-lg bg-gray-50 px-4 py-3 transition-colors hover:bg-gray-100">
                  <div className="text-left">
                    <div className="text-sm font-medium text-gray-900">
                      Restore JSON Backup
                    </div>
                    <div className="text-xs text-gray-500">
                      Replace all data with backup
                    </div>
                  </div>
                  <span className="text-xs text-gray-400">.json</span>
                </label>
              </div>

              <div>
                <input
                  ref={csvInputRef}
                  type="file"
                  accept=".csv"
                  onChange={handleImportCSV}
                  className="hidden"
                  id="import-csv"
                />
                <label
                  htmlFor="import-csv"
                  className="flex w-full cursor-pointer items-center justify-between rounded-lg bg-gray-50 px-4 py-3 transition-colors hover:bg-gray-100">
                  <div className="text-left">
                    <div className="text-sm font-medium text-gray-900">
                      Import Participants CSV
                    </div>
                    <div className="text-xs text-gray-500">
                      Add participants from spreadsheet
                    </div>
                  </div>
                  <span className="text-xs text-gray-400">.csv</span>
                </label>
              </div>
            </div>
          </section>

          {(isActive || statusMessage) && (
            <div className="flex items-center gap-3 rounded-lg bg-blue-50 px-4 py-3">
              {isActive && (
                <svg
                  className="h-4 w-4 animate-spin text-blue-500"
                  fill="none"
                  viewBox="0 0 24 24">
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                  />
                </svg>
              )}
              <span className="text-sm text-blue-700">{statusMessage}</span>
            </div>
          )}

          {importResult && (
            <div className="flex items-center gap-3 rounded-lg bg-green-50 px-4 py-3">
              <svg
                className="h-4 w-4 text-green-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
              <span className="text-sm text-green-700">{importResult}</span>
            </div>
          )}
        </div>

        <div className="flex justify-end border-t border-gray-100 px-6 py-4">
          <button
            onClick={onClose}
            disabled={isActive}
            className="rounded-lg bg-gray-100 px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-200 disabled:opacity-50">
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
