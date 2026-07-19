'use client';

import { downloadLineupPng } from '@/lib/canvas';
import {
  addShareHistory,
  buildShareUrl,
  clearShareHistory,
  loadShareHistory,
  ShareMode,
} from '@/lib/share';
import { Squad } from '@/types/football';
import { FC, RefObject, useState } from 'react';
import { FiCopy, FiImage, FiPrinter, FiTrash2 } from 'react-icons/fi';

interface PresentationProps {
  squad: Squad;
  pitchRef: RefObject<HTMLDivElement | null>;
}

const filenameBase = (name: string): string =>
  name.toLowerCase().replace(/[^a-z0-9]+/g, '-') || 'squad';

export const Presentation: FC<PresentationProps> = ({ squad, pitchRef }) => {
  const [message, setMessage] = useState<string | null>(null);
  const [history, setHistory] = useState(() => loadShareHistory());

  const handleExportPng = async (): Promise<void> => {
    await downloadLineupPng(pitchRef, filenameBase(squad.name));
  };

  const handleCopyLink = async (mode: ShareMode): Promise<void> => {
    const url = buildShareUrl(squad, mode);
    setHistory(addShareHistory({ mode, name: squad.name, url }));
    try {
      await navigator.clipboard.writeText(url);
      setMessage('Link copied to clipboard.');
    } catch {
      setMessage('Could not copy the link.');
    }
  };

  const handleClearHistory = (): void => {
    clearShareHistory();
    setHistory([]);
  };

  return (
    <div className="flex flex-col gap-2">
      <div className="flex gap-2">
        <button
          type="button"
          aria-label="Export lineup as PNG"
          onClick={() => void handleExportPng()}
          disabled={squad.players.length === 0}
          className="btn btn-outline btn-xs flex-1">
          <FiImage className="size-3" />
          Export PNG
        </button>
        <button
          type="button"
          aria-label="Print lineup"
          onClick={() => window.print()}
          className="btn btn-outline btn-xs flex-1">
          <FiPrinter className="size-3" />
          Print
        </button>
      </div>
      <button
        type="button"
        aria-label="Copy link"
        onClick={() => void handleCopyLink('squad')}
        disabled={squad.players.length === 0}
        className="btn btn-outline btn-xs w-full">
        <FiCopy className="size-3" />
        Copy link
      </button>
      <button
        type="button"
        aria-label="Copy lineup link"
        onClick={() => void handleCopyLink('lineup')}
        disabled={squad.players.length === 0}
        className="btn btn-outline btn-xs w-full">
        <FiCopy className="size-3" />
        Copy lineup link
      </button>
      {message && <p className="text-base-content/60 text-xs">{message}</p>}
      {history.length > 0 && (
        <div className="flex flex-col gap-1">
          <div className="flex items-center justify-between">
            <p className="text-xs font-semibold">Recent links</p>
            <button
              type="button"
              aria-label="Clear share history"
              onClick={handleClearHistory}
              className="btn btn-ghost btn-xs text-error">
              <FiTrash2 className="size-3" />
              Clear
            </button>
          </div>
          <ul className="flex flex-col gap-1">
            {history.map((entry) => (
              <li key={entry.id}>
                <a
                  href={entry.url}
                  aria-label={`Reopen ${entry.name}`}
                  className="btn btn-ghost btn-xs w-full justify-between">
                  <span className="truncate">{entry.name}</span>
                  <span className="text-base-content/50">
                    {entry.mode === 'lineup' ? 'Lineup' : 'Full squad'}
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

Presentation.displayName = 'Presentation';
