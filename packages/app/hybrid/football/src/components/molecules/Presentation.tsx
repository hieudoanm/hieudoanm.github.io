'use client';

import { downloadLineupPng } from '@/lib/canvas';
import { buildShareUrl } from '@/lib/share';
import { Squad } from '@/types/football';
import { FC, RefObject, useState } from 'react';
import { FiCopy, FiImage, FiPrinter } from 'react-icons/fi';

interface PresentationProps {
  squad: Squad;
  pitchRef: RefObject<HTMLDivElement | null>;
}

const filenameBase = (name: string): string =>
  name.toLowerCase().replace(/[^a-z0-9]+/g, '-') || 'squad';

export const Presentation: FC<PresentationProps> = ({ squad, pitchRef }) => {
  const [message, setMessage] = useState<string | null>(null);

  const handleExportPng = async (): Promise<void> => {
    await downloadLineupPng(pitchRef, filenameBase(squad.name));
  };

  const handleCopyLink = async (): Promise<void> => {
    const url = buildShareUrl(squad);
    try {
      await navigator.clipboard.writeText(url);
      setMessage('Link copied to clipboard.');
    } catch {
      setMessage('Could not copy the link.');
    }
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
        aria-label="Copy lineup link"
        onClick={() => void handleCopyLink()}
        disabled={squad.players.length === 0}
        className="btn btn-outline btn-xs w-full">
        <FiCopy className="size-3" />
        Copy link
      </button>
      {message && <p className="text-base-content/60 text-xs">{message}</p>}
    </div>
  );
};

Presentation.displayName = 'Presentation';
