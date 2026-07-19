import { FC, useState } from 'react';
import type { StoredGame } from '../types';
import {
  deleteGame,
  encodeShare,
  filterGames,
  importGames,
  loadGames,
  persistGames,
} from '../utils/library';
import { fetchChessComPgn, fetchLichessPgn } from '../utils/fetchers';
import { StudyView } from './StudyView';

type Source = 'lichess' | 'chesscom';

const rowLabel = (game: StoredGame): string =>
  `${game.white} vs ${game.black} · ${game.result}`;

export const LibraryTab: FC = () => {
  const [games, setGames] = useState<StoredGame[]>(loadGames);
  const [query, setQuery] = useState('');
  const [pgnText, setPgnText] = useState('');
  const [username, setUsername] = useState('');
  const [source, setSource] = useState<Source>('lichess');
  const [open, setOpen] = useState<StoredGame | null>(null);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const commit = (next: StoredGame[]) => {
    setGames(next);
    persistGames(next);
  };

  const onImport = () => {
    const { games: imported, skipped } = importGames(pgnText);
    if (imported.length) {
      commit([...imported, ...games]);
      setPgnText('');
      setError(
        skipped ? `${skipped} chunk${skipped === 1 ? '' : 's'} skipped` : null
      );
    } else {
      setError('No games found — paste a valid PGN.');
    }
  };

  const onFetch = async () => {
    if (!username.trim()) return;
    setBusy(true);
    setError(null);
    try {
      const pgn =
        source === 'lichess'
          ? await fetchLichessPgn(username.trim())
          : await fetchChessComPgn(username.trim());
      const { games: imported } = importGames(pgn);
      if (!imported.length) setError('No importable games returned.');
      else {
        commit([...imported, ...games]);
        setUsername('');
      }
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Import failed');
    } finally {
      setBusy(false);
    }
  };

  const onShare = async (game: StoredGame) => {
    try {
      await navigator.clipboard.writeText(
        `${window.location.origin}${window.location.pathname}?g=${encodeShare(game.pgn)}`
      );
    } catch {
      // clipboard unavailable — share link still shown in the study view
    }
  };

  if (open) {
    return (
      <StudyView
        game={open}
        onBack={() => setOpen(null)}
        onDelete={() => {
          commit(deleteGame(games, open.id));
          setOpen(null);
        }}
        onShare={onShare}
      />
    );
  }

  const visible = filterGames(games, query);

  return (
    <div className="mx-auto flex w-full max-w-3xl flex-col gap-4 p-4">
      <div className="card bg-base-200 p-3">
        <textarea
          value={pgnText}
          onChange={(e) => setPgnText(e.target.value)}
          rows={5}
          placeholder="Paste a PGN (or several) to import…"
          className="textarea textarea-bordered w-full font-mono text-xs"
        />
        <div className="mt-2 flex flex-wrap items-center gap-2">
          <button onClick={onImport} className="btn btn-primary btn-sm">
            Import
          </button>
          <select
            value={source}
            onChange={(e) => setSource(e.target.value as Source)}
            className="select select-bordered select-sm w-36"
            aria-label="Import source">
            <option value="lichess">Lichess</option>
            <option value="chesscom">Chess.com</option>
          </select>
          <input
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Username"
            className="input input-bordered input-sm w-40"
          />
          <button
            onClick={onFetch}
            disabled={busy || !username.trim()}
            className="btn btn-sm">
            {busy && <span className="loading loading-spinner loading-xs" />}
            Fetch games
          </button>
        </div>
        {error && <p className="text-error mt-2 text-sm">{error}</p>}
      </div>

      <div className="card bg-base-200 p-3">
        <div className="mb-2 flex items-center justify-between gap-2">
          <h2 className="text-sm font-semibold">Library ({games.length})</h2>
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search player, event or ECO…"
            className="input input-bordered input-sm w-56"
          />
        </div>
        {visible.length === 0 && (
          <p className="py-4 text-center text-sm opacity-60">
            No games yet — import a PGN or fetch your recent games.
          </p>
        )}
        <ul className="space-y-2">
          {visible.map((game) => (
            <li
              key={game.id}
              className="border-base-300 bg-base-100 flex flex-wrap items-center justify-between gap-2 rounded border p-2">
              <button
                onClick={() => setOpen(game)}
                className="min-w-0 flex-1 text-left">
                <span className="block truncate text-sm font-semibold">
                  {game.name}
                </span>
                <span className="block text-xs opacity-70">
                  {rowLabel(game)}
                  {game.eco ? ` · ${game.eco}` : ''} ·{' '}
                  {new Date(game.savedAt).toLocaleDateString()}
                </span>
              </button>
              <div className="flex shrink-0 gap-1">
                <button onClick={() => setOpen(game)} className="btn btn-xs">
                  Open
                </button>
                <button
                  onClick={() => onShare(game)}
                  className="btn btn-ghost btn-xs"
                  aria-label={`Share ${game.name}`}>
                  Link
                </button>
                <button
                  onClick={() => commit(deleteGame(games, game.id))}
                  className="btn btn-error btn-ghost btn-xs"
                  aria-label={`Delete ${game.name}`}>
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
LibraryTab.displayName = 'LibraryTab';
