'use client';

import { type FC, useState } from 'react';
import { FiUsers, FiX } from 'react-icons/fi';
import { useData } from '@/providers/DataProvider';
import { useToast } from '@/providers/ToastProvider';
import { getBoardRole, CURRENT_USER_ID } from '@/utils/collab';
import type { BoardRole } from '@/types';

const ROLES: BoardRole[] = ['admin', 'member', 'viewer'];

interface MembersMenuProps {
  boardId: string;
}

const MembersMenu: FC<MembersMenuProps> = ({ boardId }) => {
  const { boards, members, updateBoard } = useData();
  const { addToast } = useToast();
  const [open, setOpen] = useState(false);
  const board = boards.find((b) => b.id === boardId);

  const setRole = (memberId: string, role: BoardRole) => {
    if (!board) return;
    const roles = { ...(board.roles ?? {}), [memberId]: role };
    updateBoard(boardId, { roles });
    addToast('Role updated', 'success');
  };

  return (
    <div className="relative">
      <button
        type="button"
        aria-label="Board members"
        onClick={() => setOpen((o) => !o)}
        className="btn btn-ghost btn-sm btn-circle">
        <FiUsers className="size-5" />
      </button>
      {open && (
        <div className="bg-base-100 absolute top-10 right-0 z-40 w-72 rounded-lg border p-2 shadow-lg">
          <div className="flex items-center justify-between px-2 py-1">
            <p className="text-xs font-bold">Members &amp; roles</p>
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="btn btn-ghost btn-xs btn-circle">
              <FiX className="size-4" />
            </button>
          </div>
          <div className="max-h-72 space-y-1 overflow-auto">
            {members.map((m) => {
              const role = getBoardRole(board, m.id);
              const isSelf = m.id === CURRENT_USER_ID;
              return (
                <div
                  key={m.id}
                  className="flex items-center gap-2 rounded p-2 text-xs">
                  <div className="bg-base-300 flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full font-bold">
                    {m.avatar}
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="truncate font-medium">{m.name}</p>
                    <p className="truncate text-[10px] opacity-40">{m.email}</p>
                  </div>
                  <select
                    aria-label={`Role for ${m.name}`}
                    value={role}
                    onChange={(e) => setRole(m.id, e.target.value as BoardRole)}
                    disabled={isSelf}
                    className="select select-bordered select-xs">
                    {ROLES.map((r) => (
                      <option key={r} value={r}>
                        {r}
                      </option>
                    ))}
                  </select>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default MembersMenu;
