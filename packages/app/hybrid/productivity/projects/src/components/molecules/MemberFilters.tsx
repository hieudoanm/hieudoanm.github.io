'use client';

import type { FC } from 'react';
import type { Member } from '@/types';

interface MemberFiltersProps {
  members: Member[];
  activeMember: string | null;
  onChange: (id: string | null) => void;
}

export const MemberFilters: FC<MemberFiltersProps> = ({
  members,
  activeMember,
  onChange,
}) => {
  if (members.length === 0) return null;

  return (
    <div className="flex flex-wrap items-center gap-1.5">
      <span className="text-[10px] font-bold uppercase opacity-50">
        Members
      </span>
      {members.map((m) => (
        <button
          key={m.id}
          type="button"
          aria-pressed={activeMember === m.id}
          title={m.name}
          onClick={() => onChange(activeMember === m.id ? null : m.id)}
          className={`bg-base-300 flex h-6 w-6 items-center justify-center rounded-full text-[10px] font-bold ${
            activeMember === m.id ? 'ring-primary ring-2' : 'opacity-40'
          }`}>
          {m.avatar}
        </button>
      ))}
    </div>
  );
};
