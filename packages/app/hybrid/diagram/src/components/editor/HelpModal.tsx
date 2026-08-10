'use client';

import { FC } from 'react';
import { FiX } from 'react-icons/fi';

interface HelpModalProps {
  open: boolean;
  onClose: () => void;
}

const Code: FC<{ children: string; className?: string }> = ({
  children,
  className = '',
}) => (
  <code
    className={`bg-base-300/50 block rounded-lg px-3 py-2 font-mono text-xs leading-6 whitespace-pre ${className}`}>
    {children}
  </code>
);

const HelpModal: FC<HelpModalProps> = ({ open, onClose }) => {
  if (!open) return null;
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm"
      onClick={onClose}>
      <div
        className="card bg-base-200 max-h-[90vh] w-full max-w-2xl overflow-y-auto shadow-2xl"
        onClick={(event) => event.stopPropagation()}>
        <div className="border-base-content/10 flex items-center justify-between border-b p-3">
          <h2 className="text-lg font-semibold">Diagram syntax</h2>
          <button
            className="btn btn-ghost btn-sm"
            onClick={onClose}
            aria-label="Close help">
            <FiX size={16} />
          </button>
        </div>
        <div className="space-y-4 p-4 text-sm">
          <p>
            A diagram is described in a plain text file (
            <span className="font-mono text-xs">.diagram</span>). The canvas
            re-renders live as you type. Lines starting with{' '}
            <span className="font-mono text-xs">#</span> are comments.
          </p>
          <div>
            <h3 className="mb-1 font-semibold">Title</h3>
            <Code>{`title: Web App Architecture`}</Code>
          </div>
          <div>
            <h3 className="mb-1 font-semibold">Nodes</h3>
            <Code>{`node <id>: <label> [shape, icon=<name>]`}</Code>
            <p className="text-base-content/60 mt-1 text-xs">
              Shape is optional and defaults to rect. Available shapes:{' '}
              <span className="font-mono">
                rect, round, ellipse, diamond, cylinder
              </span>
              . Icons are optional, e.g.{' '}
              <span className="font-mono">icon=database</span>. Available icons:{' '}
              <span className="font-mono">
                auth, browser, cache, cloud, compute, database, file, mail,
                message, queue, search, server, shield, sync, users, worker
              </span>
              .
            </p>
            <Code className="mt-2">{`node client: Web Browser [round, icon=browser]
node db: PostgreSQL [cylinder, icon=database]`}</Code>
          </div>
          <div>
            <h3 className="mb-1 font-semibold">Edges</h3>
            <Code>{`edge <from> -> <to>: <label>`}</Code>
            <Code className="mt-2">{`edge client -> api: HTTP
edge api -> db: read
edge db -> api: rows`}</Code>
          </div>
          <div>
            <h3 className="mb-1 font-semibold">Example</h3>
            <Code>{`title: Request Flow
node client: Browser [round, icon=browser]
node api: API Server [icon=server]
node db: Database [cylinder, icon=database]
edge client -> api: HTTP
edge api -> db: read
edge db -> api: rows`}</Code>{' '}
          </div>
          <p className="text-base-content/60 text-xs">
            Nodes referenced by an edge are created automatically if you have
            not declared them. Ids may contain letters, digits,{' '}
            <span className="font-mono">-</span> and{' '}
            <span className="font-mono">_</span>.
          </p>
        </div>
      </div>
    </div>
  );
};

export default HelpModal;
