import { useState, type FC } from 'react';
import type { DatabaseConnection } from '@/types';

interface ConnectionModalProps {
  editing: DatabaseConnection | null;
  onClose: () => void;
  onCreate: (name: string, filePath: string, readOnly: boolean) => void;
  onUpdate: (
    id: string,
    patch: Partial<Pick<DatabaseConnection, 'name' | 'filePath' | 'readOnly'>>
  ) => void;
}

export const ConnectionModal: FC<ConnectionModalProps> = ({
  editing,
  onClose,
  onCreate,
  onUpdate,
}) => {
  const [name, setName] = useState(editing?.name ?? '');
  const [filePath, setFilePath] = useState(editing?.filePath ?? '');
  const [readOnly, setReadOnly] = useState(editing?.readOnly ?? false);
  const isEdit = editing !== null;

  const handleSubmit = () => {
    if (!name.trim() || !filePath.trim()) return;
    if (isEdit)
      onUpdate(editing.id, {
        name: name.trim(),
        filePath: filePath.trim(),
        readOnly,
      });
    else onCreate(name.trim(), filePath.trim(), readOnly);
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
      onClick={onClose}>
      <div
        className="bg-base-100 card w-full max-w-md shadow-xl"
        onClick={(e) => e.stopPropagation()}>
        <div className="card-body">
          <h2 className="card-title">
            {isEdit ? 'Edit Connection' : 'New Connection'}
          </h2>
          <input
            type="text"
            placeholder="Connection name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="input input-bordered w-full"
          />
          <input
            type="text"
            placeholder="File path (e.g., /data/mydb.db)"
            value={filePath}
            onChange={(e) => setFilePath(e.target.value)}
            className="input input-bordered w-full"
          />
          <label className="label cursor-pointer">
            <input
              type="checkbox"
              className="checkbox checkbox-sm"
              checked={readOnly}
              onChange={(e) => setReadOnly(e.target.checked)}
            />
            <span className="label-text">Read Only</span>
          </label>
          <div className="card-actions justify-end">
            <button type="button" className="btn btn-ghost" onClick={onClose}>
              Cancel
            </button>
            <button
              type="button"
              className="btn btn-primary"
              disabled={!name.trim() || !filePath.trim()}
              onClick={handleSubmit}>
              {isEdit ? 'Save' : 'Create'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
ConnectionModal.displayName = 'ConnectionModal';
