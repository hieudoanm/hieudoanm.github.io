import { createClipboard, createStorage } from '@hieudoanm/browser';
import { FC, useEffect, useState } from 'react';

type ClipItem = {
  id: string;
  content: string;
  createdAt: number;
};

type ClipboardSchema = {
  clips: ClipItem[];
};

const clipboard = createClipboard();

const storage = createStorage<ClipboardSchema>('local', {
  namespace: 'clipboard',
});

export const ClipboardModal: FC<{ onClose: () => void }> = ({ onClose }) => {
  const [clips, setClips] = useState<ClipItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [tab, setTab] = useState<'history' | 'preview'>('history');
  const [selected, setSelected] = useState<ClipItem | null>(null);
  const [error, setError] = useState<string | null>(null);

  // ── Load from storage (SYNC now) ────────────────────────────
  const loadClips = () => {
    const saved = storage.get('clips');
    setClips(saved ?? []);
  };

  // ── Save helper (SYNC) ─────────────────────────────────────
  const saveClips = (next: ClipItem[]) => {
    setClips(next);
    storage.set('clips', next);
  };

  // ── Add clip ───────────────────────────────────────────────
  const addClip = (text: string) => {
    if (!text.trim()) return;

    const next = [
      { id: crypto.randomUUID(), content: text, createdAt: Date.now() },
      ...clips.filter((c) => c.content !== text), // dedupe
    ].slice(0, 50);

    saveClips(next);
  };

  // ── Capture clipboard ──────────────────────────────────────
  const capture = async () => {
    try {
      setLoading(true);
      setError(null);

      if (!clipboard.isSupported()) {
        setError('Clipboard API not supported');
        return;
      }

      const text = await clipboard.paste();
      addClip(text);
    } catch {
      setError('Clipboard read blocked (requires user interaction)');
    } finally {
      setLoading(false);
    }
  };

  // ── Copy ──────────────────────────────────────────────────
  const copy = async (text: string) => {
    try {
      await clipboard.copy(text);
    } catch {
      setError('Clipboard write failed');
    }
  };

  // ── Remove ────────────────────────────────────────────────
  const remove = (id: string) => {
    const next = clips.filter((c) => c.id !== id);
    saveClips(next);

    if (selected?.id === id) {
      setSelected(null);
      setTab('history');
    }
  };

  // ── Clear ─────────────────────────────────────────────────
  const clearAll = () => {
    storage.remove('clips'); // important: scoped removal
    setClips([]);
    setSelected(null);
  };

  useEffect(() => {
    loadClips();
    capture(); // smart: attempt read on open
  }, []);

  return (
    <dialog
      open
      className="modal modal-open"
      style={{ background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(4px)' }}>
      <div className="modal-box flex w-full max-w-2xl flex-col gap-4">
        {/* Header */}
        <div className="flex items-start justify-between">
          <div>
            <h3 className="text-lg font-bold">Clipboard Manager</h3>
            <p className="text-base-content/50 text-sm">
              Local history · Sync storage · navigator.clipboard
            </p>
          </div>
          <button className="btn btn-ghost btn-sm btn-circle" onClick={onClose}>
            ✕
          </button>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2">
          <button
            className="btn btn-xs btn-primary"
            onClick={capture}
            disabled={loading}>
            {loading ? (
              <span className="loading loading-spinner loading-xs" />
            ) : (
              'Capture'
            )}
          </button>

          <button
            className="btn btn-xs btn-ghost"
            onClick={clearAll}
            disabled={!clips.length}>
            Clear
          </button>

          <span className="ml-auto text-xs opacity-50">
            {clips.length} items
          </span>
        </div>

        {error && <div className="alert alert-error py-2 text-sm">{error}</div>}

        {/* Tabs */}
        <div className="tabs tabs-bordered">
          {(['history', 'preview'] as const).map((t) => (
            <button
              key={t}
              className={`tab tab-bordered capitalize ${tab === t ? 'tab-active' : ''}`}
              onClick={() => setTab(t)}>
              {t}
            </button>
          ))}
        </div>

        {/* HISTORY */}
        {tab === 'history' && (
          <div className="flex max-h-80 flex-col gap-2 overflow-auto">
            {clips.map((c) => (
              <div
                key={c.id}
                className="bg-base-200 flex items-center gap-2 rounded-lg p-2">
                <button
                  className="flex-1 truncate text-left text-sm"
                  onClick={() => {
                    setSelected(c);
                    setTab('preview');
                  }}>
                  {c.content}
                </button>

                <button className="btn btn-xs" onClick={() => copy(c.content)}>
                  Copy
                </button>

                <button
                  className="btn btn-xs btn-ghost"
                  onClick={() => remove(c.id)}>
                  ✕
                </button>
              </div>
            ))}

            {!clips.length && (
              <p className="text-base-content/30 py-8 text-center text-sm">
                Clipboard is empty
              </p>
            )}
          </div>
        )}

        {/* PREVIEW */}
        {tab === 'preview' && (
          <div className="flex flex-col gap-3">
            {selected ? (
              <>
                <pre className="bg-base-200 max-h-64 overflow-auto rounded-lg p-3 text-xs">
                  {selected.content}
                </pre>

                <div className="flex gap-2">
                  <button
                    className="btn btn-sm btn-primary"
                    onClick={() => copy(selected.content)}>
                    Copy
                  </button>

                  <button
                    className="btn btn-sm btn-ghost"
                    onClick={() => setTab('history')}>
                    Back
                  </button>
                </div>
              </>
            ) : (
              <p className="text-base-content/30 py-8 text-center text-sm">
                Select an item to preview
              </p>
            )}
          </div>
        )}
      </div>

      <div className="modal-backdrop" onClick={onClose} />
    </dialog>
  );
};
