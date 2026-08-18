import type { FC } from 'react';

interface DbBookmarkDialogProps {
  open: boolean;
  name: string;
  folder: string;
  newFolder: string;
  folders: string[];
  onNameChange: (v: string) => void;
  onFolderChange: (v: string) => void;
  onNewFolderChange: (v: string) => void;
  onSave: () => void;
  onClose: () => void;
}

export const DbBookmarkDialog: FC<DbBookmarkDialogProps> = ({
  open,
  name,
  folder,
  newFolder,
  folders,
  onNameChange,
  onFolderChange,
  onNewFolderChange,
  onSave,
  onClose,
}) => {
  if (!open) return null;
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
      onClick={onClose}>
      <div
        className="bg-base-100 card w-full max-w-sm shadow-xl"
        onClick={(e) => e.stopPropagation()}>
        <div className="card-body">
          <h2 className="card-title text-base">Save bookmark</h2>
          <input
            type="text"
            placeholder="Bookmark name"
            value={name}
            onChange={(e) => onNameChange(e.target.value)}
            className="input input-bordered input-sm w-full"
          />
          <select
            value={folder}
            onChange={(e) => onFolderChange(e.target.value)}
            className="select select-bordered select-sm w-full">
            <option value="">No folder</option>
            {folders.map((f) => (
              <option key={f} value={f}>
                {f}
              </option>
            ))}
          </select>
          <input
            type="text"
            placeholder="New folder (optional)"
            value={newFolder}
            onChange={(e) => onNewFolderChange(e.target.value)}
            className="input input-bordered input-sm w-full"
          />
          <div className="card-actions justify-end">
            <button className="btn btn-ghost btn-sm" onClick={onClose}>
              Cancel
            </button>
            <button className="btn btn-primary btn-sm" onClick={onSave}>
              Save bookmark
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
