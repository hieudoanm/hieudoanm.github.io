import { useEffect, useRef, useState } from 'react';
import type { FC } from 'react';
import type { ComparisonTab, ComparisonTabKey } from '../types';

const FORMAT_LABEL: Record<string, string> = {
  bullet: '\u26A1 Bullet',
  blitz: '\u26A1 Blitz',
  rapid: '\u26A1 Rapid',
};

export const Percentile: FC<{
  username: string;
  tabs: ComparisonTab[];
  onClose: () => void;
}> = ({ username, tabs, onClose }) => {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [activeTab, setActiveTab] = useState<ComparisonTabKey>('all');

  useEffect(() => {
    dialogRef.current?.showModal();
  }, []);

  useEffect(() => {
    setActiveTab('all');
  }, [tabs]);

  const activeComparison =
    tabs.find((tab) => tab.key === activeTab) ?? tabs[0] ?? null;

  return (
    <dialog ref={dialogRef} className="modal" onClose={onClose}>
      <div className="modal-box bg-base-200 border-base-300 max-w-lg border">
        <button
          className="btn btn-sm btn-circle btn-ghost absolute top-3 right-3"
          onClick={() => dialogRef.current?.close()}>
          ✕
        </button>

        <h3 className="mb-1 font-serif text-xl font-bold">{username}</h3>
        <p className="text-base-content/50 mb-6 text-xs">
          {activeComparison?.description ?? 'Compared against titled players'}
        </p>

        <div className="mb-6 flex flex-col gap-y-2">
          <div
            role="tablist"
            aria-label="Comparison groups"
            className="flex flex-wrap gap-2">
            {tabs
              .filter((tab) => tab.key === 'all')
              .map((tab) => (
                <button
                  key={tab.key}
                  type="button"
                  role="tab"
                  aria-selected={activeTab === tab.key}
                  className={`btn btn-xs ${
                    activeTab === tab.key ? 'btn-primary' : 'btn-ghost'
                  }`}
                  onClick={() => setActiveTab(tab.key)}>
                  {tab.label}
                </button>
              ))}
          </div>

          <div
            role="tablist"
            aria-label="Open title groups"
            className="flex flex-wrap gap-2">
            {tabs
              .filter((tab) => !tab.key.includes('w') && tab.key !== 'all')
              .map((tab) => (
                <button
                  key={tab.key}
                  type="button"
                  role="tab"
                  aria-selected={activeTab === tab.key}
                  className={`btn btn-xs ${
                    activeTab === tab.key ? 'btn-primary' : 'btn-ghost'
                  }`}
                  onClick={() => setActiveTab(tab.key)}>
                  {tab.label}
                </button>
              ))}
          </div>

          <div
            role="tablist"
            aria-label="Women title groups"
            className="mb-6 flex flex-wrap gap-2">
            {tabs
              .filter((tab) => tab.key.includes('w') && tab.key !== 'all')
              .map((tab) => (
                <button
                  key={tab.key}
                  type="button"
                  role="tab"
                  aria-selected={activeTab === tab.key}
                  className={`btn btn-xs ${
                    activeTab === tab.key ? 'btn-primary' : 'btn-ghost'
                  }`}
                  onClick={() => setActiveTab(tab.key)}>
                  {tab.label}
                </button>
              ))}
          </div>
        </div>

        <div className="space-y-4">
          {activeComparison?.results.map((r) => (
            <div key={r.format} className="card bg-base-300 p-4">
              <div className="mb-3 flex items-center justify-between">
                <span className="text-sm font-semibold">
                  {FORMAT_LABEL[r.format]}
                </span>
                <span className="text-primary font-mono text-lg font-bold">
                  {r.rating > 0 ? r.rating : '\u2014'}
                </span>
              </div>

              {r.rating > 0 ? (
                <>
                  <div className="bg-base-100 mb-2 h-3 w-full overflow-hidden rounded-full">
                    <div
                      className="bg-primary h-full rounded-full transition-all duration-700"
                      style={{ width: `${r.percentile}%` }}
                    />
                  </div>
                  <div className="flex justify-between text-xs">
                    <span className="text-base-content/60">
                      Better than {r.percentile}% of titled players
                    </span>
                    <span className="text-base-content/40">
                      {r.betterThan.toLocaleString()} /{' '}
                      {r.total.toLocaleString()}
                    </span>
                  </div>
                </>
              ) : (
                <p className="text-base-content/40 text-xs">No rating data</p>
              )}
            </div>
          ))}
        </div>

        <div className="modal-action mt-6">
          <button
            className="btn btn-primary btn-sm"
            onClick={() => dialogRef.current?.close()}>
            Close
          </button>
        </div>
      </div>
      <form method="dialog" className="modal-backdrop">
        <button onClick={onClose}>close</button>
      </form>
    </dialog>
  );
};
