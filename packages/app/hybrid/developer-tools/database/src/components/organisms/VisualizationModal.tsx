'use client';

import { useState, type FC } from 'react';
import { FiX } from 'react-icons/fi';

import { ErDiagramView } from '@/components/molecules/ErDiagramView';
import { StatsView } from '@/components/molecules/StatsView';
import type { SqliteDatabase } from '@/types/sqlite';

interface VisualizationModalProps {
  dbInstance: SqliteDatabase;
  dbFileName?: string | null;
  onClose: () => void;
}

type VizTab = 'er' | 'stats';

const TABS: { id: VizTab; label: string }[] = [
  { id: 'er', label: 'ER diagram' },
  { id: 'stats', label: 'Statistics' },
];

export const VisualizationModal: FC<VisualizationModalProps> = ({
  dbInstance,
  dbFileName,
  onClose,
}) => {
  const [tab, setTab] = useState<VizTab>('er');

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm"
      onClick={onClose}>
      <div
        className="bg-base-100 border-base-300 flex h-[85vh] w-full max-w-6xl flex-col overflow-hidden rounded-2xl border shadow-2xl"
        onClick={(e) => e.stopPropagation()}>
        <div className="border-base-300 flex flex-shrink-0 flex-wrap items-center justify-between gap-2 border-b px-5 py-4">
          <div className="flex flex-wrap items-center gap-3">
            <span className="text-base-content font-normal tracking-tight">
              Visualize
            </span>
            {dbFileName && (
              <span className="text-base-content/30 font-mono text-xs">
                {dbFileName}
              </span>
            )}
          </div>
          <div className="flex items-center gap-2">
            <div className="flex gap-1">
              {TABS.map((t) => (
                <button
                  key={t.id}
                  onClick={() => setTab(t.id)}
                  className={`btn btn-sm rounded-lg transition-all ${tab === t.id ? 'btn-primary' : 'btn-ghost text-base-content/50 hover:text-base-content'}`}>
                  {t.label}
                </button>
              ))}
            </div>
            <button
              className="btn btn-ghost btn-sm btn-circle"
              aria-label="Close visualization"
              onClick={onClose}>
              <FiX className="size-4" />
            </button>
          </div>
        </div>
        <div className="min-h-0 flex-1">
          {tab === 'er' ? (
            <ErDiagramView dbInstance={dbInstance} fileName={dbFileName} />
          ) : (
            <StatsView dbInstance={dbInstance} />
          )}
        </div>
      </div>
    </div>
  );
};
VisualizationModal.displayName = 'VisualizationModal';
