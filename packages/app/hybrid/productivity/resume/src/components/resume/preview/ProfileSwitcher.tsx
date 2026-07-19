'use client';

import type { FC } from 'react';
import { LuPencil, LuPlus, LuTrash2 } from 'react-icons/lu';
import type { ResumeProfile } from '../../../hooks/useResumeProfiles';

interface ProfileSwitcherProps {
  profiles: ResumeProfile[];
  activeId: string;
  onSelect: (id: string) => void;
  onCreate: () => void;
  onRename: (id: string, name: string) => void;
  onDelete: (id: string) => void;
}

export const ProfileSwitcher: FC<ProfileSwitcherProps> = ({
  profiles,
  activeId,
  onSelect,
  onCreate,
  onRename,
  onDelete,
}) => {
  const activeName =
    profiles.find((profile) => profile.id === activeId)?.name ?? '';

  const handleRename = () => {
    const name = window.prompt('Profile name', activeName);
    if (name && name.trim() && name.trim() !== activeName) {
      onRename(activeId, name);
    }
  };

  const handleDelete = () => {
    if (window.confirm(`Delete the "${activeName}" profile?`)) {
      onDelete(activeId);
    }
  };

  return (
    <div className="border-base-300 flex items-center gap-1 border-b px-2 py-2">
      <select
        className="select select-sm select-bordered min-w-0 flex-1"
        aria-label="Resume profile"
        value={activeId}
        onChange={(event) => onSelect(event.target.value)}>
        {profiles.map((profile) => (
          <option key={profile.id} value={profile.id}>
            {profile.name}
          </option>
        ))}
      </select>
      <button
        type="button"
        className="btn btn-ghost btn-sm px-2"
        aria-label="New profile"
        onClick={onCreate}>
        <LuPlus className="h-4 w-4" />
      </button>
      <button
        type="button"
        className="btn btn-ghost btn-sm px-2"
        aria-label="Rename profile"
        onClick={handleRename}>
        <LuPencil className="h-4 w-4" />
      </button>
      <button
        type="button"
        className="btn btn-ghost btn-sm px-2"
        aria-label="Delete profile"
        onClick={handleDelete}>
        <LuTrash2 className="h-4 w-4" />
      </button>
    </div>
  );
};

ProfileSwitcher.displayName = 'ProfileSwitcher';
