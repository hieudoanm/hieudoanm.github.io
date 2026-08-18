'use client';

import { type FC, useState } from 'react';
import { FiCopy, FiShare2 } from 'react-icons/fi';
import { useData } from '@/providers/DataProvider';
import { useToast } from '@/providers/ToastProvider';
import { copyToClipboard } from '@/utils/format';

interface ShareMenuProps {
  boardId: string;
}

const ShareMenu: FC<ShareMenuProps> = ({ boardId }) => {
  const { boards, updateBoard } = useData();
  const { addToast } = useToast();
  const [open, setOpen] = useState(false);
  const board = boards.find((b) => b.id === boardId);
  const shareLink = `https://projects.example.com/board/${boardId}`;

  const handleCopy = async () => {
    const ok = await copyToClipboard(shareLink);
    addToast(
      ok ? 'Link copied' : 'Could not copy link',
      ok ? 'success' : 'error'
    );
  };

  return (
    <div className="relative">
      <button
        type="button"
        aria-label="Share board"
        onClick={() => setOpen((o) => !o)}
        className="btn btn-ghost btn-sm btn-circle">
        <FiShare2 className="size-5" />
      </button>
      {open && (
        <div className="bg-base-100 absolute top-10 right-0 z-40 w-80 rounded-lg border p-3 shadow-lg">
          <p className="text-xs font-bold">Share board</p>
          <p className="mt-1 text-xs opacity-50">
            Anyone with the link can join this board (mock).
          </p>
          <div className="mt-2 flex gap-1">
            <input
              readOnly
              value={shareLink}
              aria-label="Share link"
              className="input input-bordered input-sm flex-1"
            />
            <button type="button" onClick={handleCopy} className="btn btn-sm">
              <FiCopy className="size-3" /> Copy
            </button>
          </div>
          <label className="label cursor-pointer justify-start gap-2">
            <input
              type="checkbox"
              className="toggle toggle-xs"
              checked={Boolean(board?.shareEnabled)}
              onChange={(e) => {
                updateBoard(boardId, { shareEnabled: e.target.checked });
                addToast(
                  e.target.checked ? 'Sharing enabled' : 'Sharing disabled',
                  'info'
                );
              }}
            />
            <span className="text-xs">Anyone with the link can edit</span>
          </label>
        </div>
      )}
    </div>
  );
};

export default ShareMenu;
