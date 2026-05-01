// components/modals/EmojisModal.tsx
import { emojis } from '@hieudoanm/data/emojis';
import { FC, useMemo, useState } from 'react';

type EmojiMap = Record<string, string>;

const IMAGES_BASE =
  'https://raw.githubusercontent.com/hieudoanm/hieudoanm/refs/heads/master/packages/data/emojis/images';

export const EmojisModal: FC<{ onClose: () => void }> = ({ onClose }) => {
  const [query, setQuery] = useState('');
  const [copied, setCopied] = useState<string | null>(null);

  const filtered = useMemo(() => {
    const entries = Object.entries(emojis as EmojiMap);
    if (!query) return entries;
    return entries.filter(([key]) =>
      key.toLowerCase().includes(query.toLowerCase())
    );
  }, [query]);

  const handleCopy = async (value: string, key: string) => {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(key);
      setTimeout(() => setCopied(null), 1200);
    } catch {
      alert('Failed to copy');
    }
  };

  return (
    <dialog open className="modal modal-open">
      <div className="modal-box flex max-h-[90vh] w-full max-w-3xl flex-col gap-0 overflow-hidden p-0">
        {/* ── Header ── */}
        <div className="border-base-300 flex shrink-0 items-center justify-between border-b px-4 py-3">
          <div>
            <h3 className="text-sm font-bold">Emoji Explorer</h3>
            <p className="text-base-content/40 text-[11px]">
              {filtered.length} emoji{filtered.length !== 1 ? 's' : ''}
            </p>
          </div>
          <button className="btn btn-ghost btn-sm btn-circle" onClick={onClose}>
            ✕
          </button>
        </div>

        {/* ── Search ── */}
        <div className="border-base-300 shrink-0 border-b px-4 py-3">
          <input
            type="text"
            placeholder="Search emoji…"
            className="input input-bordered input-sm w-full"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            autoFocus
          />
        </div>

        {/* ── Grid ── */}
        <div className="overflow-y-auto p-3">
          {filtered.length === 0 ? (
            <p className="text-base-content/25 py-12 text-center text-sm">
              No emojis found.
            </p>
          ) : (
            <div
              className="grid gap-1"
              style={{
                gridTemplateColumns: 'repeat(auto-fill, minmax(56px, 1fr))',
              }}>
              {filtered.map(([key, value]) => {
                const isUnicode = !value.startsWith('http');
                const isCopied = copied === key;
                return (
                  <button
                    key={key}
                    title={`:${key}:`}
                    onClick={() => handleCopy(value, key)}
                    className={`hover:bg-base-300 flex flex-col items-center gap-1 rounded-lg p-2 text-center transition-colors ${
                      isCopied ? 'bg-success/10' : ''
                    }`}>
                    {/* Emoji */}
                    <span className="text-2xl leading-none">
                      {isUnicode ? (
                        value
                      ) : (
                        <img
                          src={`${IMAGES_BASE}/${key}.png`}
                          alt={key}
                          className="h-6 w-6"
                        />
                      )}
                    </span>
                    {/* Copied flash */}
                    {isCopied && (
                      <span className="text-success text-[9px] font-bold">
                        ✓
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          )}
        </div>
      </div>
      <div className="modal-backdrop" onClick={onClose} />
    </dialog>
  );
};
