import { FC, useEffect, useState } from 'react';
import { ExplorerTab } from './components/ExplorerTab';
import { LibraryTab } from './components/LibraryTab';
import { StudyView } from './components/StudyView';
import type { StoredGame } from './types';
import {
  decodeShare,
  gameFromPgn,
  loadGames,
  persistGames,
  uid,
} from './utils/library';

type Tab = 'library' | 'explorer';

const TABS: { id: Tab; label: string }[] = [
  { id: 'library', label: 'Library' },
  { id: 'explorer', label: 'Explorer' },
];

export const ChessLibrary: FC<{ onClose: () => void }> = ({ onClose }) => {
  const [tab, setTab] = useState<Tab>('library');
  const [shared, setShared] = useState<StoredGame | null>(null);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    const raw = new URLSearchParams(window.location.search).get('g');
    if (!raw) return;
    const pgn = decodeShare(raw);
    if (!pgn) return;
    setShared(gameFromPgn(pgn));
  }, []);

  const saveShared = () => {
    if (!shared) return;
    const games = loadGames();
    if (!games.some((g) => g.pgn === shared.pgn)) {
      persistGames([{ ...shared, id: uid() }, ...games]);
    }
    setSaved(true);
  };

  return (
    <div className="flex flex-col">
      <div className="border-base-300 bg-base-200 flex items-center gap-1 border-b px-4 py-2">
        {TABS.map((t) => (
          <button
            key={t.id}
            onClick={() => setTab(t.id)}
            className={`btn btn-sm ${tab === t.id ? 'btn-primary' : 'btn-ghost'}`}>
            {t.label}
          </button>
        ))}
      </div>
      <div className="min-h-0 flex-1">
        {tab === 'library' ? (
          shared ? (
            <>
              <div className="mx-auto mt-4 flex w-full max-w-3xl flex-wrap items-center justify-between gap-2 rounded border border-primary/40 bg-primary/10 p-3">
                <p className="text-sm">
                  A shared game is open. {saved ? 'Saved to your library.' : ''}
                </p>
                <div className="flex gap-2">
                  <button onClick={saveShared} disabled={saved} className="btn btn-sm">
                    Save to library
                  </button>
                  <button
                    onClick={() => setShared(null)}
                    className="btn btn-ghost btn-sm">
                    Dismiss
                  </button>
                </div>
              </div>
              <StudyView
                game={shared}
                onBack={() => setShared(null)}
                onDelete={() => setShared(null)}
                onShare={() => undefined}
              />
            </>
          ) : (
            <LibraryTab />
          )
        ) : (
          <ExplorerTab />
        )}
      </div>
    </div>
  );
};
ChessLibrary.displayName = 'ChessLibrary';
