import { FC, useState } from 'react';
import { v1, v4, v7 } from 'uuid';

type UUIDVersion = 'v1' | 'v4' | 'v7';

const generate = (version: UUIDVersion): string =>
  version === 'v1' ? v1() : version === 'v4' ? v4() : v7();

const UUID_ITEMS: { key: UUIDVersion; label: string; description: string }[] = [
  { key: 'v1', label: 'UUID v1', description: 'Timestamp + MAC address' },
  { key: 'v4', label: 'UUID v4', description: 'Cryptographically random' },
  { key: 'v7', label: 'UUID v7', description: 'Unix timestamp + random' },
];

export const UUIDModal: FC<{ onClose: () => void }> = ({ onClose }) => {
  const [uuids, setUuids] = useState({ v1: v1(), v4: v4(), v7: v7() });
  const [copied, setCopied] = useState<string | null>(null);

  const regenerate = (version: UUIDVersion) =>
    setUuids((prev) => ({ ...prev, [version]: generate(version) }));

  const regenerateAll = () => setUuids({ v1: v1(), v4: v4(), v7: v7() });

  const copy = (value: string, key: string) => {
    navigator.clipboard.writeText(value);
    setCopied(key);
    setTimeout(() => setCopied(null), 1500);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(4px)' }}
      onClick={onClose}>
      <div
        className="card bg-base-100 border-base-300 w-full max-w-lg border shadow-2xl"
        onClick={(e) => e.stopPropagation()}>
        <div className="card-body gap-5 p-6">
          <div className="flex items-start justify-between">
            <div>
              <h2 className="text-lg font-black tracking-tight">
                UUID Generator
              </h2>
              <p className="text-base-content/40 mt-0.5 font-mono text-[10px] tracking-widest uppercase">
                v1 · v4 · v7
              </p>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={regenerateAll}
                className="btn btn-outline btn-xs font-mono tracking-widest">
                ↺ All
              </button>
              <button
                onClick={onClose}
                className="btn btn-ghost btn-xs btn-square text-base">
                ✕
              </button>
            </div>
          </div>

          <div className="flex flex-col gap-3">
            {UUID_ITEMS.map(({ key, label, description }) => (
              <div
                key={key}
                className="bg-base-200 border-base-300 rounded-xl border p-3">
                <div className="mb-2 flex items-center justify-between">
                  <div>
                    <span className="text-xs font-bold tracking-widest uppercase">
                      {label}
                    </span>
                    <span className="text-base-content/30 ml-2 font-mono text-[10px]">
                      {description}
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <input
                    readOnly
                    value={uuids[key]}
                    className="input input-bordered input-xs flex-1 font-mono text-xs tracking-wider"
                  />
                  <button
                    onClick={() => regenerate(key)}
                    className="btn btn-ghost btn-xs btn-square"
                    title="Regenerate">
                    ↺
                  </button>
                  <button
                    onClick={() => copy(uuids[key], key)}
                    className={`btn btn-xs font-mono ${copied === key ? 'btn-success' : 'btn-primary'}`}>
                    {copied === key ? '✓' : 'Copy'}
                  </button>
                </div>
              </div>
            ))}
          </div>

          <p className="text-base-content/20 text-center font-mono text-[10px] tracking-widest uppercase">
            Click outside to close · Regenerate any version independently
          </p>
        </div>
      </div>
    </div>
  );
};
